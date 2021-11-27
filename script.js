let myLibrary = [];

let list = document.querySelectorAll('[data-index-number]');
const bookList = document.getElementById('bookList');
const input = document.getElementById('inputModal');

// Input fields
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('hasRead');

// Buttons
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', openInput);

const span = document.getElementsByClassName('close')[0];
span.addEventListener('click', closeInput);

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', addBookToLibrary);


function openInput() {
    input.style.display = 'block';
}

function closeInput() {
    input.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == input) {
      input.style.display = "none";
    }
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let info = `${title} by ${author}, ${pages} pages, `;
        if (read) {
            (info += 'has been read.')
        } else {
            (info += 'has not been read.');
        }
        return info;
    }
}

function addBookToLibrary() {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.checked;

    if (title === '' || author === '' || pages < 0) {
        alert('There was an error!\nMake sure you are inputting valid information in all fields.');
        return false;
    }

    // Clear input fields and close modal
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = 0;
    readInput.checked = false;
    closeInput();

    // Create book object and add to library array
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    updateBooks();
}

function makeBook(book) {
    // Start with the book div
    let div = document.createElement('div');
    div.classList.toggle('book');
    // Add p tags for title, author, pages
    let title = document.createElement('p');
    title.classList.toggle('bookTitle');
    title.textContent = book.title;
    
    let author = document.createElement('p');
    author.classList.toggle('bookAuthor');
    author.textContent = book.author;

    let pages = document.createElement('p');
    pages.classList.toggle('bookPages');
    pages.textContent = book.pages;

    let button = document.createElement('button');
    button.classList.toggle('deleteButton');
    button.textContent = 'X';

    // We need something special for the read attribute
    // Append elements to the book div
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(button);

    return div;
}

// Loop through library and make all books. Add to page.
function updateBooks() {
    
    for (let i = 0; i < myLibrary.length; i++) {
        if (list[i] === undefined) {
            let book = makeBook(myLibrary[i]);
            book.dataset.indexNumber = i;
            bookList.appendChild(book);
        }
    }
    // Update delete buttons
    list = document.querySelectorAll('[data-index-number]');
    let deleteList = document.querySelectorAll('.deleteButton');
    if (deleteList !== undefined){
        for (let i = 0; i < deleteList.length; i++) {
            deleteList[i].addEventListener('click', function(e) {
                e.stopImmediatePropagation();
                deleteBook(deleteList[i].parentNode.dataset.indexNumber);
                
            });
        }
    }
}

function deleteBook(indexNumber) {
    myLibrary.splice(indexNumber, 1);
    if(list[indexNumber] !== undefined){
        list[indexNumber].remove();
        console.log('delete' + indexNumber)
    }
    list = document.querySelectorAll('[data-index-number]');
    
    // Re-index book divs
    for (let i = 0; i < list.length; i++) {
        list[i].dataset.indexNumber = i;
    }
    
    updateBooks();
}
