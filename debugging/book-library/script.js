let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    myLibrary.push(
      new Book("Robinson Crusoe", "Daniel Defoe", 252, true),
      new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
    );
  }
  render();
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

function addBook() {
  if (!title.value || !author.value || !pages.value) {
    alert("Please fill all fields!");
    return;
  }

  myLibrary.push(
    new Book(title.value, author.value, pages.value, check.checked)
  );

  title.value = "";
  author.value = "";
  pages.value = "";
  check.checked = false;

  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;


  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow(-1);

    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    wasReadCell.appendChild(changeBut);

    let delBut = document.createElement("button");
    delBut.className = "btn btn-warning";
    delBut.innerText = "Delete";

    delBut.addEventListener("click", function () {
      myLibrary.splice(i, 1);
      render();
    });

    deleteCell.appendChild(delBut);
  }
}