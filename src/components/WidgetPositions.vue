<template>
  <canvas ref="canvas" @click="click">No canvas support</canvas>
  <button style="margin-left: 6px;" @click="selections.pop">Undo Last</button>
</template>

<script setup lang="ts">
import { get } from "lodash";
import { useWidgetsStore } from "@/common/stores";
import { watch } from "vue";
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

const numberMap: Record<string, Point[]> = {
  "1": [{ x: 209, y: 118 }, { x: 356, y: 114 }],
  "2": [{ x: 196, y: 76 }, { x: 373, y: 76 }],
  "3": [{ x: 145, y: 80 }, { x: 421, y: 78 }],
  "4": [{ x: 132, y: 114 }, { x: 436, y: 114 }],
  "5": [{ x: 147, y: 150 }, { x: 424, y: 147 }],
  "6": [{ x: 190, y: 147 }, { x: 370, y: 148 }]
};

const margin = 5;

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
  draw();
});

// Redraw the canvas when the selections change
watch(selections, draw);

// Redraws the canvas.
function draw() {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear the canvas, then draw the image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Draw a silly transparent puple marker at each selected point 
  ctx.fillStyle = "rgba(153, 0, 255, 0.75)";
  for (const { x, y } of selections) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    ctx.fill();
  }
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
function click(event: MouseEvent) {
  const point = { x: event.offsetX, y: event.offsetY };
  if (!props.data.allowMultiple) selections.pop(); // Only allow one value in the array if specified
  selections.push(point);
}
</script>
