class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}


function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

function addBookToList(book) {
  const list = document.querySelector('#book-list');

  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>${book.pages}</td>
    <td>
    <a href="#"><button class='btn btn-info readStatus' onclick="change(this)" >
      ${book.read}</button></a>
    </td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
  `;

  list.appendChild(row);
}

function displayBooks() {
  const books = getBooks();

  books.forEach((book) => addBookToList(book));
}

function deleteBook(elem) {
  if (elem.classList.contains('delete')) {
    elem.parentElement.parentElement.remove();
  }
}

function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.col-md-8');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function clearFields() {
  document.querySelector('#author').value = '';
  document.querySelector('#title').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#read').value = '';
}


// Save to Local Storage

function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  clearFields();
}

function removeBook(title) {
  const books = getBooks();

  books.forEach((book, index) => {
    if (book.title === title) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}


// Change status
function change(el) { // eslint-disable-line no-unused-vars
  const parent = el.parentElement;
  const status = parent.querySelector('.readStatus');
  const index = el.parentElement.parentElement.rowIndex;

  const books = JSON.parse(localStorage.getItem('books'));

  if (status.innerHTML !== 'Read') {
    status.innerHTML = 'Read';
    books[index - 1].read = 'Read';
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    status.innerHTML = 'Not read';
    books[index - 1].read = 'Not read';
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Display the Books
document.addEventListener('DOMContentLoaded', displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').value;

  // validate
  if (author === '' || title === '' || pages === '') {
    showAlert('please fill in all fields', 'danger');
  } else {
    const book = new Book(author, title, pages, read);

    addBookToList(book);

    addBook(book);

    showAlert('Book Added', 'success');

    // Clear Fields
    clearFields();
  }
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', e => {
  deleteBook(e.target);
  const a = e.target.parentElement.previousElementSibling.previousElementSibling;
  removeBook(a.previousElementSibling.textContent);

  showAlert('Book Removed', 'danger');
});

// Hide form on page load
const bookForm = document.getElementById('book-form');
const createBook = document.getElementById('createBook');

function reload() {
  bookForm.style.display = 'none';
}
window.onload = reload();

function showDiv() {
  bookForm.style.display = 'block';
  createBook.style.display = 'none';
}
createBook.onclick = showDiv;