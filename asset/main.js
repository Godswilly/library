class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

class UI {
  static displayBooks() {

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td>${book.pages}</td>
      <td><button class= 'btn btn-info'>${book.read}</button></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(elem) {
    if(elem.classList.contains('delete')) {
      elem.parentElement.parentElement.remove();
    } 
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.col-md-8');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#author').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').value = '';
  }
}

// store
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Display the Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').value;

  //validate
  if(author === '' || title === '' || pages === '') {
    UI.showAlert('please fill in all fields', 'danger');    
  } else {
    const book = new Book(author, title, pages, read);

  UI.addBookToList(book);

  Store.addBook(book);

  UI.showAlert('Book Added', 'success');

  // Clear Fields
  UI.clearFields();
  }
});
  
// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', e => {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

  UI.showAlert('Book Removed', 'danger');
});