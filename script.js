let books = [
  {
    id: 0,
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
    year: '1994',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
  },
  {
    id: 1,
    title: 'JavaScript: The Good Parts',
    authors: 'Douglas Crockford',
    year: '2008',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
  },
  {
    id: 2,
    title:
    'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
    authors: 'Stoyan Stefanov',
    year: 2008,
    image:
    'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
  },
  {
    id: 3,
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
              <button class="button">Изменить</button>
              <button id="delete-book-button" onclick="deleteBook(${book.id})" class="button">Удалить</button>
          </div>
      </div>`
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

function closeModal() {
  addModalWindow.style.display = "none"
}

function addBook() {
  const titleValue = document.getElementById('name_book').value
  const authorsValue = document.getElementById('author_book').value
  const yearValue = document.getElementById('year_book').value
  const imageValue = document.getElementById('img_book').value


  if (titleValue == 0) {
      alert('Как называется книга?')
      addModalWindow.style.display = "flex"
      return
  }
  if (authorsValue == 0) {
      alert('Как зовут её автора?')
      addModalWindow.style.display = "flex"
      return
  }
  if (yearValue == 0) {
      alert('Год издания книги тоже нужно заполнить')
      addModalWindow.style.display = "flex"
      return
  }
  if (imageValue == 0) {
    alert('И снова обязательное поле - добавьте обложку книги')
    addModalWindow.style.display = "flex"
    return
  }
  const newBook = {
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

function storageSave() {
  const booksJSON = JSON.stringify(books)
  localStorage.setItem('books', booksJSON)
}

const booksJson = localStorage.getItem('books')

if (booksJson){
  books = JSON.parse(booksJson)
}

renderBooks()