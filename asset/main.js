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
    const StoredBooks = [
      {
        author: 'John Doe',
        title: 'Johns Book',
        pages: '10',
        read: false
      },
      {
        author: 'Jane Doe',
        title: 'Janes First Book',
        pages: '20',
        read: true
      }
    ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book))
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(elem) {
    if(elem.classList.contains('delete')) {
      elem.parentElement.parentElement.remove();
    } 
  }

  static clearFields() {
    document.querySelector('#author').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').value = '';
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

  const book = new Book(author, title, pages, read);

  UI.addBookToList(book);

  // Clear Fields
  UI.clearFields();
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', e => {
  UI.deleteBook(e.target);
})