let tableContainer = document.getElementById("selected-points-container");

function updateContent() {
  let selecteditems = localStorage.getItem("selected");

  if (selecteditems !== null) {
    selecteditems = JSON.parse(selecteditems);
  } else {
    selecteditems = [];
    localStorage.setItem("selected", JSON.stringify(selecteditems));
  }

  let instersection = new Set();

  tableContainer.innerHTML = "";

  // Compare all sets in selected items and find the shared molecules
  for (let i = 0; i < selecteditems.length; i++) {
    for (let j = 1 + 1; j < selecteditems.length; j++) {
      let set1 = new Set(selecteditems[i]["molecules"].split(" "));
      let set2 = new Set(selecteditems[j]["molecules"].split(" "));
      instersection = findIntersection(set1, set2, intersection);
    }
  }

  for (let i = 0; i < selecteditems.length; i++) {
    tableCreator(selecteditems[i], instersection);
  }
}

// Call the function initially to load any existing data from local storage
updateContent();

// Listen for changes in local storage and update content accordingly
window.addEventListener("storage", function (e) {
  if (e.key === "selected") {
    updateContent();
  }
});

function tableCreator(selectedPoint, intersection) {
  const table = document.createElement("table");

  // Create header for whole table - creates that first row that has the name of gene set
  const tableHeader = document.createElement("thead");
  const firstRow = document.createElement("tr");
  const setName = document.createElement("th");
  setName.colSpan = 2;
  setName.textContent = selectedPoint["setName"];
  firstRow.appendChild(setName);
  tableHeader.appendChild(firstRow);
  table.appendChild(tableHeader);

  // tableBody had rows of the data
  const tableBody = document.createElement("tbody");
  // Create second row in table
  const secondRow = document.createElement("tr");
  const qValueHeader = document.createElement("th");
  qValueHeader.textContent = "Q-Value";
  const qValue = document.createElement("td");
  qValue.textContent = selectedPoint["qValue"];
  secondRow.appendChild(qValueHeader);
  secondRow.appendChild(qValue);
  tableBody.appendChild(secondRow);

  const thirdRow = document.createElement("tr");
  const moleculesHeader = document.createElement("th");
  moleculesHeader.textContent = "Molecules";
  const molecules = document.createElement("td");
  molecules.textContent = boldSharedGenes(
    selectedPoint["molecules"],
    intersection
  );
  thirdRow.appendChild(moleculesHeader);
  thirdRow.appendChild(molecules);
  tableBody.appendChild(thirdRow);

  table.appendChild(tableBody);
  tableContainer.appendChild(table);
}

function boldSharedGenes(molecules, intersection) {
  let moleculeList = molecules.split(" ");

  for (let i = 0; i < moleculeList.length; i++) {
    if (intersection.has(moleculeList[i])) {
      moleculeList[i] = "<b>" + moleculeList[j] + "</b>";
    }
  }
  return moleculeList.join(" ");
}

function findIntersection(set1, set2, intersection) {
  for (let i of set1) {
    if (set2.has(i)) {
      intersection.add(i);
    }
  }

  return intersection;
}

let iframe = document.getElementById("graph").contentWindow;

function clearSelected() {
  iframe.clearSelected();
}

function toggleLabels() {
  iframe.toggleLabels();
}
