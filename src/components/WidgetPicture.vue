<template>
  <div>
    <!-- Hidden Activation Trigger (Double Tap Logo) -->
    <img 
      src="/assets/blank.png" 
      alt="Hidden Trigger" 
      @dblclick="startKonamiListener" 
      @touchstart="handleTouch"
      style="width: 100px; cursor: pointer;"
    />

    <!-- Secret Input Box for Mobile -->
    <input 
      v-if="isInputVisible"
      v-model="inputCode"
      type="text"
      placeholder="Enter Code..."
      @keydown.enter="checkKonamiCode"
      ref="codeInput"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      padding: 10px; font-size: 18px; border: 2px solid black; display: block;"
    />

    <!-- Secret Media Player (Hidden until activated) -->
    <div v-if="isEasterEggActive">
      <video 
        v-if="isVideo" 
        :src="absolutePath" 
        :width="data.width || '240'" 
        :height="data.height || '360'" 
        controls 
        ref="videoPlayer"
        @ended="nextVideo"
      >
        Your browser does not support the video tag.
      </video>

      <img 
        v-else 
        :src="absolutePath" 
        :alt="`Could not load file ${data.file}`" 
        :width="data.width || 'auto'" 
        :height="data.height || 'auto'" 
      />

      <div class="controls">
        <button @click="prevVideo" :disabled="currentIndex === 0">Previous</button>
        <button @click="nextVideo" :disabled="currentIndex === videoFiles.length - 1">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { Widget, WidgetPicture } from "@/config";

const props = defineProps<{
  data: Widget & WidgetPicture & { files?: string[] },
  currentId: string
}>();

const currentIndex = ref(props.data.files?.indexOf(props.data.file) || 0);
const videoPlayer = ref<HTMLVideoElement | null>(null);
const isEasterEggActive = ref(false);
const isInputVisible = ref(false);
const inputCode = ref("");
const codeInput = ref<HTMLInputElement | null>(null);

const videoFiles = computed(() => props.data.files || [props.data.file]);
const absolutePath = computed(() => `/assets/${videoFiles.value[currentIndex.value]}`);
const isVideo = computed(() => videoFiles.value[currentIndex.value].endsWith('.mp4'));

// (Keyboard Key Codes)
const konamiCodeKeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; 
let konamiIndex = 0;

//for Mobile
const konamiString = "↑↑↓↓←→←→BA";

//(Desktop)
const konamiListener = (event: KeyboardEvent) => {
  if (event.keyCode === konamiCodeKeys[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCodeKeys.length) {
      activateEasterEgg();
      window.removeEventListener("keydown", konamiListener);
    }
  } else {
    konamiIndex = 0;
  }
};

// (Triggers Input on Mobile)
let lastTouch = 0;
const handleTouch = () => {
  const now = Date.now();
  if (now - lastTouch < 300) {
    // Double-tap detected: Show input field
    isInputVisible.value = true;
    nextTick(() => {
      codeInput.value?.focus();
    });
  }
  lastTouch = now;
};

// Validate Mobile Konami Code
const checkKonamiCode = () => {
  if (inputCode.value.toUpperCase() === konamiString) {
    activateEasterEgg();
  } else {
    alert(":/");
  }
  isInputVisible.value = false;
  inputCode.value = "";
};

// Start listening for Konami Code on Desktop
const startKonamiListener = () => {
  konamiIndex = 0;
  window.addEventListener("keydown", konamiListener);
  alert("Error: Code 69420");
};

// Activate Easter Egg
const activateEasterEgg = () => {
  isEasterEggActive.value = true;
  alert("Good Boy");
};

// Watch for changes and reload the video
watch(currentIndex, async () => {
  props.data.file = videoFiles.value[currentIndex.value];
  if (videoPlayer.value && isVideo.value) {
    await nextTick();
    videoPlayer.value.load();
    videoPlayer.value.play().catch(() => {});
  }
});

// Go to the next video
const nextVideo = () => {
  if (currentIndex.value < videoFiles.value.length - 1) {
    currentIndex.value++;
  }
};

// Go to the previous video
const prevVideo = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Cleanup when the component unmounts
onUnmounted(() => {
  window.removeEventListener("keydown", konamiListener);
});
</script>

<style scoped>
.controls {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
button {
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}
</style>
