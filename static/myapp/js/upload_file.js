// Get needed refrences to document objects
const settingsButton = document.querySelector(".settings-button");  // Gear icon in top right
const settingsWrapper = document.querySelector(".settings-container");  // Wrapper for settings area
const graphContainer = document.getElementById("graph-container");  // Container for Graph and Settings area
const uploadWrapper = document.getElementById("upload-container");  // Container for the upload file button
const selectedPoints = document.getElementById("selected-section"); // Wrapper for selected points below graph
const graph = document.getElementById("graph");
const importNavButton = document.getElementById("nav-import");

let frame;

graph.onload = () => {
  frame = graph.contentWindow;
  main();
};

async function main() {
  if (
    localStorage.getItem("data") !== null &&
    localStorage.getItem("rawFile") !== null
  ) {
    await frame.main();
 
    hideUpload();
    showGraph();
  } else {
    showUpload();
  }
}

function importFile() {
  if (
    localStorage.getItem("data") === null ||
    confirm("Do you want to import new data?\nThis erases current saved data.")
  ) {
    frame.clearSelected();
    localStorage.removeItem("rawFile");
    localStorage.removeItem("camera");
    localStorage.removeItem("data");
    localStorage.removeItem("annotations");
    hideGraph();
    showUpload();
  }
}

function redirectToHelp() {
  window.location.href = "/help";
}

settingsButton.addEventListener("click", function () {
  settingsWrapper.classList.toggle("visible");
  graph.classList.toggle("settings-open");
});

document
  .getElementById("initial-file-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = e.target.result;
      localStorage.setItem("rawFile", fileData);
    };
    reader.readAsDataURL(file);
  });

document
  .getElementById("initial-upload-button")
  .addEventListener("click", async function () {
    if (!localStorage.getItem("rawFile")) {
      return;
    }
    try {
      await frame.main();
    } catch (error) {
      alert(`Check that file was formatted correctly, error: ${error}`);
      return;
    }
    document.getElementById("initial-file-input").value = "";
    hideUpload();
    showGraph();
  });

function showGraph() {
  graphContainer.style.display = "flex";
  selectedPoints.style.display = "block";
}

function hideGraph() {
  graphContainer.style.display = "none";
  selectedPoints.style.display = "none";
}

function showUpload() {
  uploadWrapper.style.display = "flex";
}

function hideUpload() {
  uploadWrapper.style.display = "none";
}
