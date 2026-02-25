<template>
  <div>
    <!-- Hidden Activation Trigger (Double Click or Double Tap) -->
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
      <iframe 
        v-if="isDriveVideo" 
        :src="absolutePath"
        width="240" 
        height="360"
        allow="autoplay"
      ></iframe>

      <video 
        v-else 
        :src="absolutePath" 
        width="240" 
        height="360" 
        controls 
        ref="videoPlayer"
        @ended="nextVideo"
      ></video>

      <div class="controls">
        <button @click="prevVideo" :disabled="currentIndex === 0">Previous</button>
        <button @click="nextVideo" :disabled="currentIndex === videoFiles.length - 1">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from "vue";
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
const currentFile = computed(() => videoFiles.value[currentIndex.value]);

const isDriveVideo = computed(() => currentFile.value.includes("drive.google.com"));
const absolutePath = computed(() => isDriveVideo.value ? currentFile.value : `/assets/${currentFile.value}`);
const isVideo = computed(() => isDriveVideo.value || currentFile.value.endsWith('.mp4'));

// Debugging Helper
const log = (message: string) => console.log(`[DEBUG]: ${message}`);

// Konami Code (Desktop)
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

// Listen for Konami Code Input
const konamiListener = (event: KeyboardEvent) => {
  log(`Key Pressed: ${event.keyCode}`);
  if (event.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      window.removeEventListener("keydown", konamiListener);
    }
  } else {
    konamiIndex = 0;
  }
};

// Mobile Double Tap Input Handling
let lastTouch = 0;
const handleTouch = () => {
  const now = Date.now();
  if (now - lastTouch < 300) {
    isInputVisible.value = true;
    nextTick(() => {
      codeInput.value?.focus();
    });
  }
  lastTouch = now;
};

// Konami Code (Mobile)
const konamiString = "K2U2D2LRBA";
const checkKonamiCode = () => {
  if (inputCode.value.toUpperCase() === konamiString) {
    activateEasterEgg();
  } else {
    alert(":/");
  }
  isInputVisible.value = false;
  inputCode.value = "";
};

// Start Konami Code Listener on Double Click
const startKonamiListener = () => {
  log("Double Click Detected. Listening for Konami Code.");
  konamiIndex = 0;
  window.addEventListener("keydown", konamiListener);
  alert("Error");
};

// Activate Easter Egg
const activateEasterEgg = () => {
  isEasterEggActive.value = true;
  alert("Good Boy");
};

// Video Navigation
const nextVideo = () => {
  if (currentIndex.value < videoFiles.value.length - 1) {
    currentIndex.value++;
  }
};
const prevVideo = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Cleanup
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
