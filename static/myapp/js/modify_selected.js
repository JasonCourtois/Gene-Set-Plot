function updateContent() {
  let selecteditems = localStorage.getItem("selected");

  if (selecteditems !== null) {
    selecteditems = JSON.parse(selecteditems);
  } else {
    clearTable(1, 2);
    return;
  }

  let shared = new Set();
  let set1 = "";
  let set2 = "";

  if (selecteditems.length === 0) {
    clearTable(1, 2);
    return;
  } else if (selecteditems.length === 1) {
    set1 = selecteditems[0]["molecules"];
    clearTable(2, 2);
  } else {
    set1 = new Set(selecteditems[0]["molecules"].split(" "));
    set2 = new Set(selecteditems[1]["molecules"].split(" "));

    let result = findIntersectionAndDifference(set1, set2);
    shared = result[0]
    set1 = [...result[1]].join(" ");
    set2 = [...result[2]].join(" ");
  }
  
  for (let i = 0; i < selecteditems.length; i++) {
    let qvalue = document.getElementById("qvalue-" + (i + 1));
    let set_name = document.getElementById("set-name-" + (i + 1));
    let molecules = document.getElementById("molecules-" + (i + 1));
    qvalue.innerHTML = selecteditems[i]["qValue"];
    set_name.innerHTML = "Name: " + selecteditems[i]["setName"];
    let moleculeString = selecteditems[i]["molecules"].split(" ");
    for (let j = 0; j < moleculeString.length; j++) {
      if (shared.has(moleculeString[j])) {
        moleculeString[j] = "<b>" + moleculeString[j] + "</b>"
      }
    }
    molecules.innerHTML = moleculeString.join(" ");
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

function clearTable(start, stop) {
  for (let i = start; i <= stop; i++) {
    let qvalue = document.getElementById("qvalue-" + i);
    qvalue.innerHTML = "";
    let set_name = document.getElementById("set-name-" + i);
    set_name.innerHTML = "Name";
    let molecules = document.getElementById("molecules-" + i);
    molecules.innerHTML = "";
  }
}

function findIntersectionAndDifference(set1, set2) {
  const intersection = new Set();
  const difference1 = new Set();
  const difference2 = set2;
  for (let i of set1) {
    if (set2.has(i)) {
      intersection.add(i);
      difference2.delete(i);
    } else {
      difference1.add(i);
    }
  }

  return [intersection, difference1, difference2];
}

let iframe = document.getElementById("graph").contentWindow;

function clearSelected() {
  iframe.clearSelected();
}

function toggleLabels() {
  iframe.toggleLabels();
}
