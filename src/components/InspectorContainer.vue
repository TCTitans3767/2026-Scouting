<template>
  <div id="controls-container">
    <RouterLink :to="{ name: 'home' }" style="margin-right: 40px;">Home</RouterLink>
    <span v-if="entries.length === 0">&lt;No Entries&gt;</span>
    <template v-else>
      <label for="entry-select">Entry</label>
      <select id="entry-select" v-model.number="selectedIdx">
        <option v-for="(name, i) in entries" :key="i" :value="i">{{ name }}</option>
      </select>
      <button @click="deleteData">Delete</button>
      <button @click="downloadData">Download</button>
      <button @click="clearData">Clear All</button>
    </template>
  </div>

  <!-- Newest Data (Appears at the Top) -->
  <div>
    <h3>Data</h3>
    <span v-if="selectedEntry === undefined">No Data</span>
    <InspectorTable v-else v-model="selectedRecords" :data="selectedEntry" />
  </div>

  <!-- Per-Entry Download History -->
  <h3>Download History for {{ currentEntryName }}</h3>
  <table v-if="currentEntryHistory.length">
    <thead>
      <tr>
        <th>No.</th>
        <th>File Name</th>
        <th>Download</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in currentEntryHistory" :key="entry.name">
        <td>{{ currentEntryHistory.length - index }}</td> <!-- New numbering column -->
        <td>{{ entry.name }}</td>
        <td>
          <button @click="downloadAgain(entry)">Download</button>
        </td>
      </tr>
    </tbody>
  </table>
  <span v-else>No downloaded data for this entry yet.</span>

  <a ref="downloadLink" style="display: none"></a>
</template>

<script setup lang="ts">
import InspectorTable from "./InspectorTable.vue";
import { useWidgetsStore } from "@/common/stores";
import { useStorage } from "@vueuse/core";
import { ref, computed, watch } from "vue";

const widgets = useWidgetsStore();
const selectedIdx = ref(0);
const downloadLink = ref<HTMLAnchorElement | null>(null);

// All stored entries in widgets.savedData
const entries = computed(() => [...widgets.savedData.keys()]);
const selectedEntry = computed(() => widgets.savedData.get(entries.value[selectedIdx.value]));
const currentEntryName = computed(() => entries.value[selectedIdx.value] || "Unknown");

//Download Histories (per entry)
const entryHistories = useStorage<Record<string, { name: string; data: any }[]>>("entryHistories", {});
const currentEntryHistory = computed(() => entryHistories.value[currentEntryName.value] || []);

// Watch for entry changes and initialize history if needed
watch(currentEntryName, (newEntry) => {
  if (!entryHistories.value[newEntry]) {
    entryHistories.value[newEntry] = [];
  }
});

function computeTeam(team){
  if(team===-1) return "undefined";
  if(team===0) return "Red1";
  if(team===1) return "Red2";
  if(team===2) return "Red3";
  if(team===3) return "Blue1";
  if(team===4) return "Blue2";
  if(team===5) return "Blue3";
}

function deleteData() {
  if (!selectedEntry.value) return;
  if (!confirm("Delete this entry permanently?")) return;

  
  const entry = widgets.savedData.get(entries.value[selectedIdx.value]);

  if (entry) {
    const entryIndex = widgets.savedData.get(entries.value[selectedIdx.value])?.values.findIndex(record => record === selectedEntry.value.values[0]);

    // Ensure the record exists and remove it
    if (entryIndex !== undefined && entryIndex >= 0) {
      entry.values.splice(entryIndex, 1);
      
      // If there are no records left in the entry, delete the entire entry
      if (entry.values.length === 0) {
        widgets.savedData.delete(entries.value[selectedIdx.value]);
      }
    }
  }
}

function downloadData() {
  if (!downloadLink.value || !selectedEntry.value) return;
  let Team = computeTeam(parseInt(localStorage.getItem("selectedTeam") || "-1"));
  let entryName = currentEntryName.value;
  let fileName="";
  if (entryName==="pits"){
    fileName = `${entryName}.csv`;
  }
  else{
    fileName = `${Team}-${entryName}.csv`;
  }
  
  let downloadData = { header: selectedEntry.value.header, values: selectedEntry.value.values };

  // Generate and trigger download
  const downloadUrl = widgets.makeDownloadLink(downloadData);
  downloadLink.value.href = downloadUrl;
  downloadLink.value.download = fileName;
  downloadLink.value.click();

  // Store new entry in history
  if (!entryHistories.value[entryName]) {
    entryHistories.value[entryName] = [];
  }
  entryHistories.value[entryName].unshift({ name: fileName, data: downloadData });
  selectedEntry.value.values = [];
}


function downloadAgain(entry: { name: string; data: any }) {
  if (!downloadLink.value) return;
  const downloadUrl = widgets.makeDownloadLink(entry.data);
  downloadLink.value.href = downloadUrl;
  downloadLink.value.download = entry.name;
  downloadLink.value.click();
}


function clearData() {
  if (!confirm("Clear all saved entries permanently?")) return;
  widgets.savedData.clear();
  entryHistories.value = {}; // Clear all history
}
</script>

<style>
.table-container {
  overflow: auto;
}

#controls-container > * {
  margin: 4px;
}
</style>
