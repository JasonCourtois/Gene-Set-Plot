function updateContent() {
  var contentDiv = document.getElementById("content");
  let selecteditems = localStorage.getItem("selected");

  if (selecteditems !== null) {
    selecteditems = JSON.parse(selecteditems);
  } else {
    cleartable(1, 2);
    return;
  }

  if (selecteditems.length === 0) {
    cleartable(1, 2);
    return;
  } else if (selecteditems.length === 1) {
    cleartable(2, 2);
  }

  for (let i = 0; i < selecteditems.length; i++) {
    let qvalue = document.getElementById("qvalue-" + (i + 1));
    qvalue.innerHTML = selecteditems[i]["qvalue"];
    let set_name = document.getElementById("set-name-" + (i + 1));
    set_name.innerHTML = selecteditems[i]["setname"];
    let molecules = document.getElementById("molecules-" + (i + 1));
    molecules.innerHTML = selecteditems[i]["molecules"];
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

function cleartable(start, stop) {
  for (let i = start; i <= stop; i++) {
    let qvalue = document.getElementById("qvalue-" + i);
    qvalue.innerHTML = "";
    let set_name = document.getElementById("set-name-" + i);
    set_name.innerHTML = "";
    let molecules = document.getElementById("molecules-" + i);
    molecules.innerHTML = "";
  }
}
