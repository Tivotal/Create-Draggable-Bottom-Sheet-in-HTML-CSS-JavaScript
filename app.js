/* Created by Tivotal */

let btn = document.querySelector(".show-btn");
let bottomSheet = document.querySelector(".bottom-sheet");
let overlay = document.querySelector(".overlay");
let content = document.querySelector(".content");
let dragIcon = document.querySelector(".drag-icon");

let isDragging = false,
  startY,
  startHeight;

let updateHeight = (height) => {
  //updating sheet height
  content.style.height = `${height}vh`;

  // if the sheet height is equal to 100 then toggling fullsceen class to bottom sheet
  bottomSheet.classList.toggle("fullscreen", height === 100);
};

let showSheet = () => {
  bottomSheet.classList.add("show");

  //updating sheet height with default height 50
  updateHeight(50);

  document.body.style.overflow = "hidden";
};

let hideSheet = () => {
  bottomSheet.classList.remove("show");
  document.body.style.overflow = "auto";
};

let dragStart = (e) => {
  isDragging = true;
  bottomSheet.classList.add("dragging");
  //recording intitial y position and sheet height
  startY = e.pageY || e.touches?.[0].pageY;
  startHeight = parseInt(content.style.height);
};

let dragging = (e) => {
  //return if isDragging is false
  if (!isDragging) return;

  //calculating new height of sheet by using starty and start height
  //calling updateHeight function with new height as argument

  let delta = startY - (e.pageY || e.touches?.[0].pageY);
  let newHeight = startHeight + (delta / window.innerHeight) * 100;

  updateHeight(newHeight);
};

let dragStop = () => {
  isDragging = false;
  bottomSheet.classList.remove("dragging");

  //setting sheet height based on the sheet current height or position
  let sheetHeight = parseInt(content.style.height);

  sheetHeight < 25
    ? hideSheet()
    : sheetHeight > 75
    ? updateHeight(100)
    : updateHeight(50);

  //if height is greater than 75 making sheet full screen else making it to 50vh
};

dragIcon.addEventListener("mousedown", dragStart);
dragIcon.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

dragIcon.addEventListener("touchstart", dragStart);
dragIcon.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

btn.addEventListener("click", showSheet);
overlay.addEventListener("click", hideSheet);
