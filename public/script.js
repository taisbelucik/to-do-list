const closeMessage = document.querySelector("#close-message");
const message = documet.querySelector(".message");

closeMessage.addEventListener("click", () => {
  message.style.display = "none";
});

setTimeout(() => {
  message.style.display = "none";
}, 5000);

alert("oi");
