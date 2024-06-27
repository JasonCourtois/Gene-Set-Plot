const settingsButton = document.querySelector(".settings-button");
const settingsWrapper = document.querySelector(".settings-wrapper");
const graph = document.getElementById("graph");
const graphContainer = document.getElementById("graph-container");
const uploadWrapper = document.getElementById("upload-wrapper");
const selectedPoints = document.getElementById("selected-points-container");

const importNavButton = document.getElementById("nav-import");

importNavButton.addEventListener("click", function () {
  if (localStorage.getItem("data") === null || confirm("Do you want to import new data?\nThis erases current saved data.")) {
    localStorage.removeItem("rawFile");
    localStorage.removeItem("camera");
    localStorage.setItem("selected", "[]")
    hideGraph();
    showUpload();
  }
});

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
    frame.main();

    hideUpload();
    showGraph();
  } else {
    showUpload();
  }
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
    hideUpload();
    showGraph();
  });

function showGraph() {
  graphContainer.style.display = "flex";
  selectedPoints.style.display = "flex";
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
