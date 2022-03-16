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
        // Store initial books in an Array. 
        const StoredBooks = [
            {
                title: 'Theres Always Another Album', 
                author: 'Engelbert Humperdink', 
                isbn: '34344564'
            }, 
            {
                title: 'My Mothers Favourite Home Made Recipes', 
                author: 'The Boston Strangler', 
                isbn: '25315289'
            }, 
            {
                title: 'Gilligans Island: my Thoughts on my favourite Documentary Series', 
                author: 'Vladimir Putin', 
                isbn: '34344564'
            }
        ];
        // Read in initial books.
        const books = StoredBooks;
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
}
    // Store Class: Handles Storage.
    
    // Event: display books.
    document.addEventListener('DOMContentLoaded', UI.displayBooks);
    // Event: add a book.
    
    // Event: remove a book.

    // YouTube video position 18:24.
