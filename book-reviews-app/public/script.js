// Function to add a book
function addBook() {
    const bookTitle = document.getElementById('bookTitle').value;

    if (!bookTitle) {
        alert("Please enter a book title.");
        return;
    }

    fetch('/api/add_book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: bookTitle })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('bookTitle').value = ''; // Clear input
        showAllBooks(); // Refresh book list
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch and display books
function showAllBooks() {
    fetch('/api/books')
    .then(response => response.json())
    .then(books => {
        const bookList = document.getElementById('allbooks');
        bookList.innerHTML = books.map(book => `<p>${book.title}</p>`).join('');
    })
    .catch(error => console.error('Error:', error));
}
