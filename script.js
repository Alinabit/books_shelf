let count = 0

let books = [
  {
    id: count++,
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
    year: '1994',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
  },
  {
    id: count++,
    title: 'JavaScript: The Good Parts',
    authors: 'Douglas Crockford',
    year: '2008',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
  },
  {
    id: count++,
    title:
    'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
    authors: 'Stoyan Stefanov',
    year: 2008,
    image:
    'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
  },
  {
    id: count++,
    title:
    'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
    authors: 'David Flanagan',
    year: 2011,
    image:
    'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg'
  },
]

const booksID = document.getElementById("container")
const addModalWindow = document.getElementById('add-modal')
const addBookbutton = document.getElementById('add-book')
const buttonSave = document.getElementById('button-close-save')
const buttonClose = document.getElementById('icon-close')
const buttonClose2 = document.getElementById('icon-close2')
const addModalChanges = document.getElementById('add-modal-update')


function renderBooks() {
  booksID.innerHTML = ""
  books.forEach((book) => {
    booksID.innerHTML += `         
      <div class="books" id="books">
          <div class="top-books">
            <div class="book">
              <img class="book-img" id="book-img" src="${book.image}" alt=""/>
            </div>
            <div class="title">
              <p>${book.title}</p>
            </div>
            <div class="years">
              <p>${book.year}</p>
            </div>
            <div class="authors">
              <p>${book.authors}</p>
            </div>
          </div>    
          <div class="buttons">
              <button id="update-book-button-${book.id}" class="button">Изменить</button>
              <button id="delete-book-button-${book.id}" class="button">Удалить</button>
          </div>
      </div>`
  })

  books.forEach((book) => {
    const deleteBtn = document.getElementById(`delete-book-button-${book.id}`)

    const makeDelete = () => {
      deleteBook(book.id)
    }

    deleteBtn.addEventListener('click', makeDelete)
  })

  books.forEach((book) => {
    const btnChange = document.getElementById(`update-book-button-${book.id}`) 
  
    btnChange.addEventListener('click', addModalUpdate)

    function addModalUpdate() {     
      addModalChanges.style.display = "flex"
      document.getElementById('name_book_change').value = book.title
      document.getElementById('author_book_change').value = book.authors
      document.getElementById('year_book_change').value = book.year
      document.getElementById('img_book_change').value = book.image

      const updateBtn = document.getElementById('btn-save-update')
      const makeUpdate = () => {
      updateBook(book.id, makeUpdate)
    }
      updateBtn.addEventListener('click', makeUpdate)
    }
  })
}

function deleteBook(id) {
  const book = books.find((b) => {
    return b.id === id
  })
  const indexBook = books.indexOf(book)
  books.splice(indexBook, 1)
  renderBooks()
  storageSave()
}

function clearForm() {
  document.getElementById('name_book').value = ""
  document.getElementById('author_book').value = ""
  document.getElementById('year_book').value = ""
  document.getElementById('img_book').value = ""
}

let isOpen = false
function addForm() {
  if (isOpen) {
    addModalWindow.style.display = "none"
    isOpen = true
  } else {        
    addModalWindow.style.display = "flex"
    isOpen = false
  }
}

addBookbutton.addEventListener('click', addForm)
buttonSave.addEventListener('click', addBook)
buttonClose.addEventListener('click', closeModal)
buttonClose2.addEventListener('click', closeModal)

function closeModal() {
  addModalWindow.style.display = "none"
  addModalChanges.style.display = "none"
}

function addBook() {
  const titleValue = document.getElementById('name_book').value
  const authorsValue = document.getElementById('author_book').value
  const yearValue = document.getElementById('year_book').value
  const imageValue = document.getElementById('img_book').value


  if (titleValue.length === 0) {
      alert('Как называется книга?')
      addModalWindow.style.display = "flex"
      return
  }
  if (authorsValue.length === 0) {
      alert('Как зовут её автора?')
      addModalWindow.style.display = "flex"
      return
  }
  if (yearValue.length === 0) {
      alert('Год издания книги тоже нужно заполнить')
      addModalWindow.style.display = "flex"
      return
  }
  if (imageValue.length === 0) {
    alert('И снова обязательное поле - добавьте обложку книги')
    addModalWindow.style.display = "flex"
    return
  }
  const newBook = {
    id: count++,
    title: titleValue,
    authors: authorsValue,
    year: yearValue,
    image: imageValue
  }
  books.push(newBook)

  renderBooks()
  clearForm()
  closeModal()
  storageSave()
}

function updateBook(id, makeUpdate) {

  const updateBtn = document.getElementById('btn-save-update')
  updateBtn.removeEventListener('click', makeUpdate)

  const book = books.find((b) => {
    return b.id === id
  })
  const indexBook = books.indexOf(book)

  const titleValueChange = document.getElementById('name_book_change').value
  const authorsValueChange = document.getElementById('author_book_change').value
  const yearValueChange = document.getElementById('year_book_change').value
  const imageValueChange = document.getElementById('img_book_change').value

  const newBook = {
    id,
    title: titleValueChange,
    authors: authorsValueChange,
    year: yearValueChange,
    image: imageValueChange
  }
    books.splice(indexBook, 1, newBook)

  renderBooks()
  clearForm()
  closeModal()
  storageSave()

}

function storageSave() {
  const booksJSON = JSON.stringify(books)
  localStorage.setItem('books', booksJSON)
}

const booksJson = localStorage.getItem('books')

if (booksJson){
  books = JSON.parse(booksJson)
}

renderBooks()