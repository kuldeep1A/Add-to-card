import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://add-tocard-default-rtdb.firebaseio.com/",
};
const $ = document.querySelector.bind(document);
const $_ = document.createElement.bind(document);
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

onValue(shoppingListInDB, function (snapshot) {
  clearShoppingList();
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      appnedItem(currentItem);
    }
  } else {
    $("#shopping-list").innerHTML = "No items here... yet";
  }
});
$("#add-botton").addEventListener("click", () => {
  if ($("#input-field").value !== "") {
    let value = $("#input-field").value;
    push(shoppingListInDB, value);
    clearInput();
  }
});
function clearShoppingList() {
  $("#shopping-list").innerHTML = "";
}
function clearInput() {
  $("#input-field").value = "";
}
function appnedItem(item) {
  let newEl = $_("li");
  newEl.textContent = item[1];
  newEl.addEventListener("dblclick", function () {
    let excatLocationItem = ref(database, `shoppingList/${item[0]}`);
    remove(excatLocationItem);
  });
  $("#shopping-list").append(newEl);
}
