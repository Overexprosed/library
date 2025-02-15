const books = []

function Book(title, author, pageTotal) {
    this.title = title
    this.author = author
    this.pageTotal = pageTotal
}

// test book
books.push(new Book("Title-f", "Author-f", 100500))
