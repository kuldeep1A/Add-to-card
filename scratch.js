const $ = document.querySelector.bind(document);

$("#add-botton").addEventListener("click", () => {
  console.log($("#input-field").value);
});
