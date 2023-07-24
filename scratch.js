import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL: "https://add-tocard-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
console.log(app);

const $ = document.querySelector.bind(document);

$("#add-botton").addEventListener("click", () => {
  if ($("#input-field").value !== "") {
    let value = $("#input-field").value;
    push(shoppingListInDB, value);
    let li = document.createElement("li");
    li.innerText = value;
    $("#shopping-list").appendChild(li);
    $("#input-field").value = "";
  }
});
