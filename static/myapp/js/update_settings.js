const pointSize = document.getElementById("point-size");
const pointStartColor = document.getElementById("point-start-color");
const pointEndColor = document.getElementById("point-end-color");
const selectedColor = document.getElementById("selected-color");

const defaultSettings = {
  pointSize: "6",
  pointStartColor: "#EBC4FF",
  pointEndColor: "#a703ff",
  selectedColor: "#6bfc03",
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
  pointStartColor.value = settings["pointStartColor"]
  pointEndColor.value = settings["pointEndColor"];
  selectedColor.value = settings["selectedColor"];
}

function updateSettings() {
  let settings = {
    pointSize: pointSize.value,
    pointStartColor: pointStartColor.value,
    pointEndColor: pointEndColor.value,
    selectedColor: selectedColor.value,
  };
  localStorage.setItem("settings", JSON.stringify(settings));
}
