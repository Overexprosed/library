const library = []

function Book(title, author, pageTotal) {
    this.title = title
    this.author = author
    this.pageTotal = pageTotal
}

const bookContainer = document.querySelector(".book-container")
const addBookBtn = document.querySelector(".add-btn")
const submitBtn = document.querySelector(".add-book-submit-btn")
const addBookDialog = document.querySelector(".add-book-dialog")
const addBookDialogForm = document.querySelector(".add-book-dialog-form")

addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal()
})

// Закрытие модального окна
addBookDialog.addEventListener("click", event => {
    const dialogDimensions = addBookDialog.getBoundingClientRect()

    // Закрытие модального окна при клике во вне
    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {
        closeModal()
    }
})

// Добавление книги
submitBtn.addEventListener("click", (event) => {
    const title = event.currentTarget.form.title.value
    const author = event.currentTarget.form.author.value
    const pageTotal = event.currentTarget.form.pageTotal.value

    library.push(new Book(title, author, pageTotal))
    closeModal()
    renderLibrary()
})

function closeModal() {
    addBookDialogForm.reset()
    addBookDialog.close();
}

function renderLibrary() {
    document
        .querySelectorAll(".book")
        .forEach((book) => {book.remove()})

    library.forEach((book, index) => {
        const [bookDiv, removeBtn] = createBook(book)
        // Добавляем индекс элемента в массиве для последующего удаления по нему
        removeBtn.setAttribute("data-index", index.toString())
        bookContainer.appendChild(bookDiv)
    })
}

function createBook(book) {
    const bookDiv = document.createElement("div")
    bookDiv.classList.add("book")

    const bookContentDiv = document.createElement("div");
    bookContentDiv.classList.add("book-content")

    // Создаем и добавляем заголовок
    const titleDiv = document.createElement("div");
    titleDiv.textContent = book.title;
    bookContentDiv.appendChild(titleDiv);

    // Создаем и добавляем автора
    const authorDiv = document.createElement("div");
    authorDiv.textContent = book.author;
    bookContentDiv.appendChild(authorDiv);

    // Создаем и добавляем количество страниц
    const pagesDiv = document.createElement("div");
    pagesDiv.textContent = book.pageTotal;
    bookContentDiv.appendChild(pagesDiv);

    // Добавляем содержимое книги в основной элемент
    bookDiv.appendChild(bookContentDiv);

    // Создаем панель кнопок
    const bookBtnBarDiv = document.createElement("div");
    bookBtnBarDiv.classList.add("book-btn-bar");

    // Создаем кнопку "Read"
    const statusButton = document.createElement("button");
    statusButton.classList.add("book-btn-read");
    statusButton.textContent = "Read";
    statusButton.onclick = changeBookStatus
    bookBtnBarDiv.appendChild(statusButton);

    // Создаем кнопку "Remove"
    const removeButton = document.createElement("button");
    removeButton.classList.add("book-btn-remove");
    removeButton.textContent = "Remove";
    removeButton.onclick = removeBook
    bookBtnBarDiv.appendChild(removeButton);

    // Добавляем панель кнопок в основной элемент
    bookDiv.appendChild(bookBtnBarDiv);

    return [bookDiv, removeButton]
}

function removeBook(event) {
    const index = Number(event.target.getAttribute("data-index"))
    library.splice(index, 1)
    renderLibrary()
}

function changeBookStatus(event) {
    const button = event.target

    if (button.textContent === "Read") {
        button.textContent = "Not read"
        button.classList.remove("book-btn-read");
        button.classList.add("book-btn-not-read");
    } else {
        button.textContent = "Read"
        button.classList.remove("book-btn-not-read");
        button.classList.add("book-btn-read");
    }
}
