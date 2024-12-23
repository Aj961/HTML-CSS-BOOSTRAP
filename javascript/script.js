const books = [
    { title: "The Magic of the Load", author: "Sudha Murty", category: "fiction", image: "img/the magic of the load.jfif" },
    { title: "How to Mango", author: "John Doe", category: "non-fiction", image: "img/how to mango.jfif" },
    { title: "Illustrating Ideas", author: "Jane Smith", category: "fiction", image: "img/illustrating.jfif" },
    { title: "The Magic of the Load", author: "Sudha Murty", category: "fiction", image: "img/the magic of the load.jfif" },
    { title: "How to Mango", author: "John Doe", category: "non-fiction", image: "img/how to mango.jfif" },
    { title: "Illustrating Ideas", author: "Jane Smith", category: "fiction", image: "img/illustrating.jfif" },
    { title: "The Magic of the Load", author: "Sudha Murty", category: "fiction", image: "img/the magic of the load.jfif" },
    { title: "How to Mango", author: "John Doe", category: "non-fiction", image: "img/how to mango.jfif" },
    { title: "Illustrating Ideas", author: "Jane Smith", category: "fiction", image: "img/illustrating.jfif" },
    { title: "The Magic of the Load", author: "Sudha Murty", category: "fiction", image: "img/the magic of the load.jfif" },
    { title: "How to Mango", author: "John Doe", category: "non-fiction", image: "img/how to mango.jfif" },
    { title: "Illustrating Ideas", author: "Jane Smith", category: "fiction", image: "img/illustrating.jfif" },
];

function renderBooks(filteredBooks = books) {
    const bookList = $("#book-list");
    bookList.empty();
    if (filteredBooks.length === 0) {
        bookList.append("<p>No books found.</p>");
        return;
    }
    filteredBooks.forEach((book, index) => {
        const bookHtml = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${book.image}" class="card-img-top book-image" alt="${book.title}" data-index="${index}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <button class="btn btn-primary add-to-cart" data-index="${index}">Add to Cart</button>
                        <button class="btn btn-outline-danger like-button" data-index="${index}">Like</button>
                    </div>
                </div>
            </div>
        `;
        bookList.append(bookHtml);
    });
}

function handleSearchFilterSort() {
    const searchTerm = $("#searchBar").val().toLowerCase();
    const selectedCategory = $("#filterCategory").val();
    const sortOption = $("#sortOption").val();

    // Filter books
    let filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);
        const matchesCategory =
            selectedCategory === "all" || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sort books
    filteredBooks.sort((a, b) => {
        if (sortOption === "title") {
            return a.title.localeCompare(b.title);
        } else if (sortOption === "author") {
            return a.author.localeCompare(b.author);
        }
    });

    renderBooks(filteredBooks);
}

function handleImageClick(event) {
    const index = $(event.target).data("index");
    const book = books[index];
    $("#modalContent").html(`
        <h5>${book.title}</h5>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <img src="${book.image}" class="img-fluid" alt="${book.title}">
    `);
    $("#bookModal").modal("show");
}

function handleAddToCart(event) {
    const index = $(event.target).data("index");
    const book = books[index];
    $("#cart").append(`<li class="list-group-item">${book.title} by ${book.author}</li>`);
}

function handleLike(event) {
    const index = $(event.target).data("index");
    alert(`You liked "${books[index].title}"!`);
}

$(document).ready(function () {
    renderBooks();

    $("#book-list").on("click", ".book-image", handleImageClick);
    $("#book-list").on("click", ".add-to-cart", handleAddToCart);
    $("#book-list").on("click", ".like-button", handleLike);

    $("#searchBar, #filterCategory, #sortOption").on("input change", handleSearchFilterSort);
});