// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</td>
    `;

    list.appendChild(row);
}

//Show alert
UI.prototype.ShowAlert = function (message, className) {
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);
    //Time out after 3 seconds
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    //Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if (title === '' || author === '' || isbn === '') {
        //Error alert
        ui.ShowAlert('Please fill in all fields', 'error');
    } else {
        //Add book to list
        ui.addBookToList(book);

        //Show success
        ui.ShowAlert('Book Added!', 'success');

        //Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

//Event listener for delete book
document.getElementById('book-list').addEventListener('click', function (e) {
    //Instantiate UI
    const ui = new UI();

    //Delete book
    ui.deleteBook(e.target);

    //Show message
    ui.ShowAlert('Book removed!', 'success');

    e.preventDefault();
});