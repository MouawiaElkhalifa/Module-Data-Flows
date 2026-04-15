const myLibrary = [];

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

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function addBook() {
  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = parseInt(pagesInput.value);

  /* MODIFIED: Added (pagesValue <= 0) to ensure only positive whole numbers are valid */
  if (!titleValue || !authorValue || isNaN(pagesValue) || pagesValue <= 0) {
    alert("Please fill all fields with valid information (Pages must be greater than 0)!");
    return;
  }

  myLibrary.push(
    new Book(titleValue, authorValue, pagesValue, checkInput.checked)
  );

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkInput.checked = false;

  render();
}

function render() {
  const tableBody = document.querySelector("#display tbody");
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = tableBody.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const actionCell = row.insertCell(4);

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;

    const changeBtn = document.createElement("button");
    changeBtn.className = "btn btn-success";
    changeBtn.textContent = book.check ? "Yes" : "No";
    changeBtn.setAttribute("aria-label", `Change read status for ${book.title}`);
    changeBtn.addEventListener("click", () => {
      book.check = !book.check;
      render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", `Delete ${book.title}`);
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      render();
      setTimeout(() => alert(`Deleted: ${book.title}`), 100);
    });

    wasReadCell.appendChild(changeBtn);
    actionCell.appendChild(deleteBtn);
  });
}