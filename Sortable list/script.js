const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

//store list items
const listItems = [];

let dragStartIndex;

createList();

//insert list items into DOM
function createList() {
  [...richestPeople]
    .map((person) => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      //console.log(person);

      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable=true>
    <p class="person-name">${person}</p>
    <i class="fa-solid fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  //console.log(dragStartIndex);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  //console.log(dragEndIndex);
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((drggable) => {
    drggable.addEventListener("dragstart", dragStart);
  });
  dragListItem.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
