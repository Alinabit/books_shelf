const books = [
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

    function renderBooks() {
      booksID.innerHTML = ""
      books.forEach((book) => {
        booksID.innerHTML += `         
                <div class="books" id="books">
                    <div class="top-books">
                        <div class="book">
                            <img src="${book.image}"/>
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
                        <button onclick="deleteBook(${book.id})" class="button">Удалить</button>
                    </div>
                </div>`
    })
    }

function clearForm() {
  document.getElementById('name_book').value = ""
  document.getElementById('author_book').value = ""
  document.getElementById('year_book').value = ""
  document.getElementById('img_book').value = ""
}
    

function addBook() {
  const titleValue = document.getElementById('name_book').value
  const authorsValue = document.getElementById('author_book').value
  const yearValue = document.getElementById('year_book').value
  const imageValue = document.getElementById('img_book').value

  const newBook = {
    title: titleValue,
    authors: authorsValue,
    year: yearValue,
    image: imageValue
  }

  let myInput = document.querySelector(".input_error")
  let valueInput = myInput.value

  if (valueInput.length < 1) {
    document.getElementById("fail").innerHTML = "Книга не добавлена! Заполните все поля формы"
  } else {
    document.getElementById("fail").innerHTML = ""
    books.push(newBook)
    renderBooks()
    clearForm()
  }

  
}

function deleteBook(id) {
  const book = books.find((b) => {
    return b.id === id
  })

  const indexBook = books.indexOf(book)
  console.log(indexBook)

  books.splice(indexBook, 1)

  renderBooks()
}

const formHere = document.getElementById("openForm")

    function addForm() {
      formHere.innerHTML = `
        <form class="add_newbook">
          <div class="input_newbook">
              <p>название книги</p>
              <input id="name_book" class="input_error"/>
          </div>
          <div class="input_newbook">
              <p>автор книги</p>
              <input id="author_book" class="input_error"/>
          </div>
          <div class="input_newbook">
              <p>год издания книги</p>
              <input id="year_book" class="input_error"/>
          </div>
          <div class="input_newbook">
              <p>ссылка на изображение</p>
              <input id="img_book" class="input_error"/>
          </div>
        </form>
        <div class="save_newbook">
        <button class="button" onclick="addBook(); closeForm();">Сохранить</button>
          </div>
      `
    }

    const close = document.getElementById("openForm")

    function closeForm() {
      formHere.innerHTML = ""
    }

  
renderBooks()
