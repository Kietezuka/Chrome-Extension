const inputEl = document.getElementById("input-el");
const saveInputBtn = document.getElementById("save-input-btn");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const ulEl = document.getElementById("ul-el");
const dataFromLocalStorage = JSON.parse(localStorage.getItem("myData"));
let myData = [];

if (dataFromLocalStorage) {
  myData = dataFromLocalStorage;
  renderList(myData);
}

function renderList(myData) {
  //without ulEl.innerHTML = ""; render same <li> everytime the function called
  ulEl.innerHTML = "";
  for (let i = 0; i < myData.length; i++) {
    ulEl.innerHTML += `<li><a href="${myData[i]}" target="_blank">${myData[i]}</a></li>`;
  }
}

saveInputBtn.addEventListener("click", function () {
  myData.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myData", JSON.stringify(myData));
  renderList(myData);
});

saveTabBtn.addEventListener("click", function () {
  //chrome api(get url of the current tab)
  //https://developer.chrome.com/docs/extensions/reference/api/tabs
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //get tab which active tab also the top window)
    myData.push(tabs[0].url);
    localStorage.setItem("myData", JSON.stringify(myData));
    renderList(myData);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myData = [];
  renderList(myData);
});
