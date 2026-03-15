<template>
  <canvas ref="canvas"
    @mousedown="startDrawing" 
    @mouseup="stopDrawing" 
    @mouseleave="stopDrawing" 
    @mousemove="draw"
    @touchstart="startDrawingTouch"
    @touchmove="drawTouch"
    @touchend="stopDrawing"
    @touchcancel="stopDrawing" 
    @click="click">No canvas support</canvas>
  <button style="margin-left: 6px;" @click="clearCanvas">Clear</button>
  <button style="margin-left: 6px;" @click="downloadCanvas">Save Auto Path</button>
</template>

<script setup lang="ts">
import { get } from "lodash";
import { useWidgetsStore } from "@/common/stores";
import { watch, ref,  onMounted } from "vue";
import { Widget, WidgetPositions } from "@/config";
interface Point {
  readonly x: number;
  readonly y: number;
}

type DimensionName = "width" | "height";

const props = defineProps<{
  data: Widget & WidgetPositions,
  currentId: string
}>();

const selections = $ref(new Array<Point>());
const canvas = $ref<HTMLCanvasElement>();
const isDrawing = ref(false);
//const ctx = $ref<CanvasRenderingContext2D>();

const numberMap: Record<string, Point[]> = {
  "1": [{ x: 209, y: 118 }, { x: 356, y: 114 }],
  "2": [{ x: 196, y: 76 }, { x: 373, y: 76 }],
  "3": [{ x: 145, y: 80 }, { x: 421, y: 78 }],
  "4": [{ x: 132, y: 114 }, { x: 436, y: 114 }],
  "5": [{ x: 147, y: 150 }, { x: 424, y: 147 }],
  "6": [{ x: 190, y: 147 }, { x: 370, y: 148 }]
};

const margin = 5;
const widgets = useWidgetsStore();
// The exported value
// const value = $computed(() => selections.map(({ x, y }) => getNumberAtPoint({ x, y }) ?? `(${x},${y})`));
const value = $computed(() => selections.map(({ x, y }) => `(${x},${y})`));
defineExpose({ index: useWidgetsStore().addWidgetValue(props.data, $$(value)) });

// Load the image file
const image = new Image();
image.src = `${import.meta.env.BASE_URL}assets/${props.data.file}`;
image.addEventListener("load", () => {
  setDimensions("width", "height");
  setDimensions("height", "width");
  drawField();
});

// Redraw the canvas when the selections change
//watch(selections, draw);


/* onMounted(() => {
  if (canvas) {
    drawField();
  }
}) */
// Redraws the canvas.
 function drawField() {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  //ctxOutside = ctx;
  // Clear the canvas, then draw the image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
} 

function startDrawing(event: MouseEvent) {
  //if (!ctx.value || !canvas.value) return;
  const ctx = canvas.getContext("2d");
  isDrawing.value = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}


function draw(event: MouseEvent) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear the canvas, then draw the image
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  if (!isDrawing.value || !ctx.value) return;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing.value = false;
}

function clearCanvas() {
  //if (!ctx.value || !canvas.value) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawField();
}

// Touch event handlers
function getTouchPos(event: TouchEvent) {
  //if (!canvas.value) return null;
  const rect = canvas.getBoundingClientRect();
  const touch = event.touches[0]; // Get first touch point
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
}

function startDrawingTouch(event: TouchEvent) {
  //if (!ctx.value || !canvas.value) return;
  const ctx = canvas.getContext("2d");
  const pos = getTouchPos(event);
  if (!pos) return;

  isDrawing.value = true;
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  event.preventDefault(); // Prevent scrolling while drawing
}

function drawTouch(event: TouchEvent) {
  if (!isDrawing.value) return;
  const ctx = canvas.getContext("2d");
  const pos = getTouchPos(event);
  if (!pos) return;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  event.preventDefault(); // Prevent scrolling while drawing
}


// Sets the dimensions of the canvas based on the image dimensions and configuration data.
function setDimensions(a: DimensionName, b: DimensionName) {
  if (!canvas) return;

  const dims = { width: props.data.width ?? 0, height: props.data.height ?? 0 };

  if (dims[a] > 0) canvas[a] = dims[a];
  else if (dims[b] > 0) canvas[a] = (image[a] * dims[b]) / image[b];
  else canvas[a] = image[a];
}

// //Correspondencia numérica con margen de error
// function getNumberAtPoint(point: Point): string | null {
//   for (const [num, points] of Object.entries(numberMap)) {
//     if (points.some(p => Math.abs(p.x - point.x) <= margin && Math.abs(p.y - point.y) <= margin)) {
//       return num;
//     }
//   }
//   return null;
// }

// Adds a new selection to the array.
/* function click(event: MouseEvent) {
  const point = { x: event.offsetX, y: event.offsetY };
  if (!props.data.allowMultiple) selections.pop(); // Only allow one value in the array if specified
  selections.push(point);
}*/ 
// Function to handle the download
const downloadCanvas = () => {
  if (!canvas) return;

  // Convert the canvas content to a data URL (PNG by default)
  const dataURL = canvas.toDataURL('image/png');
  const teamDesc = $computed(() => widgets.values.find(i => i.name == "Team")?.value.replaceAll(",","."));
  const teamDescNoName = teamDesc.substring(0,teamDesc.lastIndexOf(".")+1);
  const matchNum = $computed(() => widgets.values.find(i => i.name == "MatchNumber")?.value);

  // Create a temporary anchor element to trigger the download
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = teamDescNoName + matchNum + '.png'; // Set the default file name

  // Append link to body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>
