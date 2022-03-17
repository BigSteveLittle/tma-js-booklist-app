// MY BOOK LIST APP.
// Invoke 'strict mode'.
"use strict";
// Book Class: represents a book.
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class: handles UI tasks.
class UI {
    static displayBooks() {
        // Grab the books from storage.
        const books = StoredBooks.getBooks();
        // Store initial books in an Array. 
        // const StoredBooks = [
        //     {
        //         title: `There's Always Another Album`, 
        //         author: 'Engelbert Humperdink', 
        //         isbn: '34344564'
        //     }, 
        //     {
        //         title: `My Mother's Favourite Home Made Recipes`, 
        //         author: 'The Boston Strangler', 
        //         isbn: '25315289'
        //     }, 
        //     {
        //         title: `Gilligan's Island: my Thoughts on my favourite Documentary Series`, 
        //         author: 'Vladimir Putin', 
        //         isbn: '34344564'
        //     }
        // ];
        // Read in the books.
        // const books = StoredBooks;
        books.forEach((book) => UI.addBookToList(book));
    }
    // Format the books in HTML table.
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    // Method to delete a book when the delete button is pressed.
    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    // Method to display alerts.
    static showAlert(alertMessage, className) {
        // Create a 'div' for the alert.
        const alertDiv = document.createElement('div');
        // Instantiate an alert class.
        alertDiv.className = `alert alert-${className}`;
        // Append the alert message.
        alertDiv.appendChild(document.createTextNode(alertMessage));
        // Instantiate were the message will appear.
        const container = document.querySelector('.container');
        // Instantiate the form element.
        const bookForm = document.querySelector('#book-form');
        // Insert the form.
        container.insertBefore(alertDiv, bookForm);
        // Vanish the message.
        setTimeout(() => document.querySelector('.alert').remove(), 4000);
    }
    // Method to clear fields.
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn ').value = '';
    }
}
// Store Class: Handles Storage.
class StoredBooks {
    // Method to get books.
    static getBooks() {
        // Define a variable 'books' for storage.
        let books;
        // local storage is 'null' then assign an empty array.
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        // Else grab the books convert from a string.
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        // hold value of 'books'.
        return books;
    }
    // Method to add books.
    static addBooks(book) {
        // Get the books from storage.
        const books = StoredBooks.getBooks();
        // add a book to the array.
        books.push(book);
        // Stringify the array and send to storage.
        localStorage.setItem('books', JSON.stringify(books));
    }
    // Method to delete books.
    static deleteBooks(isbn) {
        // Get the books from storage.
        const books = StoredBooks.getBooks();
        // Loop though all books in the array and compare to the requested 'isbn'.
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        // Stringify the array and send to storage.
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Event: display books.
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: add a book.
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent Default Action.
    e.preventDefault();
    // Grab form values.
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    // Validation.
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Dude. Need ALL fields filled in.', 'danger');
    }
    else {
        // Instantiate () new book.
        const book = new Book(title, author, isbn);
        // Add book to list.
        UI.addBookToList(book);
        // Add book to storage.
        StoredBooks.addBooks(book);
        // Show success message.
        UI.showAlert(`Success Bro! You've added a book.`, 'success');
        // Clear entered values.
        UI.clearFields();
    }
});
// Event: remove a book.
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    // Delete book from storage.
    StoredBooks.deleteBooks(e.target.parentElement.previousElementSibling.textContent);  
    // Show delete success message.
    UI.showAlert(`It's done my dude. The book is off the list!`, 'info');
});
// YouTube video position 18:24.
