const pointSize = document.getElementById("point-size");
const pointStartColor = document.getElementById("point-start-color");
const pointEndColor = document.getElementById("point-end-color");
const selectedColor = document.getElementById("selected-color");
const cutoff = document.getElementById("cutoff");
const seed = document.getElementById("seed");
const neighbors = document.getElementById("neighbors");

const defaultSettings = {
  pointSize: "6",
  pointStartColor: "#EBC4FF",
  pointEndColor: "#a703ff",
  selectedColor: "#6bfc03",
  cutoff: "0.45",
  seed: "0",
  neighbors: "15",
  umapChange: false,
};

if (localStorage.getItem("settings") !== null) {
  const currentSettings = JSON.parse(localStorage.getItem("settings"));
  displayValues(currentSettings);
} else {
  displayValues(defaultSettings);
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

function displayValues(settings) {
  pointSize.value = settings["pointSize"];
  pointStartColor.value = settings["pointStartColor"];
  pointEndColor.value = settings["pointEndColor"];
  selectedColor.value = settings["selectedColor"];
  cutoff.value = settings["cutoff"];
  seed.value = settings["seed"];
  neighbors.value = settings["neighbors"];
}

function updateSettings() {
  let settings = {
    pointSize: pointSize.value,
    pointStartColor: pointStartColor.value,
    pointEndColor: pointEndColor.value,
    selectedColor: selectedColor.value,
    cutoff: cutoff.value,
    seed: seed.value,
    neighbors: neighbors.value,
    umapChange: false,
  };

  let oldSettings = JSON.parse(localStorage.getItem("settings"));

  if (
    settings.seed !== oldSettings["seed"] ||
    settings.neighbors !== oldSettings["neighbors"]
  ) {
    settings.umapChange = true;
    settings.umap = settings.neighbors + "-" + settings.seed;
  }

  localStorage.setItem("settings", JSON.stringify(settings));
}
