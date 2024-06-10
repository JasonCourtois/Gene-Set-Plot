function updateContent() {
  var contentDiv = document.getElementById("content");
  var localStorageContent = localStorage.getItem("selected");

  if (localStorageContent) {
    contentDiv.innerHTML = localStorageContent;
  }
}

// Call the function initially to load any existing data from local storage
updateContent();

// Listen for changes in local storage and update content accordingly
window.addEventListener("storage", function () {
  updateContent();
});
