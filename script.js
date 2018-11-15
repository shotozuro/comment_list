let defComments = []
let comments = []
let commentLimit = 15

function onSelectPage (e) {
  const page = e.target.id.split("-")
  renderPage(Number(page[1]))
}

function onSelectSort (e) {
  const selectedSort = e.target.value.split("-")
  const query = document.getElementById("searchText").value
  const selectedList = query.length > 1 ? comments : defComments

  const key = selectedSort[0]
  const order = selectedSort[1]
  
  comments = getSortedComments(selectedList, key, order)
  renderPage()
}

function onSearch () {
  const query = document.getElementById("searchText").value
  document.getElementById("sorting").value = "id-asc"
  comments = filterData(defComments, "body", query)
  renderPage()
}

function getComments() {
  let statusCode = 0
  let statusText = ""
  fetch('http://jsonplaceholder.typicode.com/comments')
  .then(res => {
    statusCode = res.status
    statusText = res.statusText
    return res.json()
  })
  .then(data => {
    if (statusCode === 200) {
      defComments = data
      comments = data
      renderPage()
    } else {
      renderErrorMessage(statusText)
    }

  })
  .catch(e => renderErrorMessage("Failed to get data."))
}

function compareValues(key, order = 'asc') {
  return function (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key]
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    )
  }
}

function getSortedComments(data, key, order) {
  return [...data].sort(compareValues(key, order))
}

function filterData(data, field, query) {
  return [...data].filter((comment) => {
    const cleanQuery = query.replace(/\s/g, '')
    const cleanComment = comment[field].replace(/\s/g, '')
    const stringPosition = cleanComment.indexOf(cleanQuery)

    return stringPosition > -1
  })
}

function getCommentsPerPage(page) {
  if (typeof page !== "number" || page < 1) {
    return []
  }
  const start = (page - 1) * commentLimit
  const end = page * commentLimit

  return comments.slice(start, end)
}

function renderPage(page = 1) {
  renderList(page)
  renderPagination(page)
}

function renderPagination(selectedPage) {
  const paginationEl = document.getElementById("pagination")
  paginationEl.innerHTML = ""
  const pages = Math.ceil(comments.length / commentLimit) 
  Array(pages).fill(0).forEach((el, index) => {
    const pageNumber = index + 1
    const pageEl = document.createElement("button")

    pageEl.addEventListener("click", onSelectPage)
    pageEl.classList.add("page-number")
    pageEl.setAttribute("id", "page-" + pageNumber)
    if (pageNumber === selectedPage) {
      pageEl.disabled = true
    }
    pageEl.appendChild(document.createTextNode(pageNumber))

    paginationEl.appendChild(pageEl)
  })
}

function renderHeaderList () {
  const headerRow = document.createElement("tr")
  const colId = document.createElement("td")
  const colName = document.createElement("td")
  const colEmail = document.createElement("td")
  const colBody = document.createElement("td")

  colId.appendChild(document.createTextNode("ID"))
  colName.appendChild(document.createTextNode("Name"))
  colEmail.appendChild(document.createTextNode("Email"))
  colBody.appendChild(document.createTextNode("Body"))
  
  headerRow.appendChild(colId)
  headerRow.appendChild(colName)
  headerRow.appendChild(colEmail)
  headerRow.appendChild(colBody)
  headerRow.classList.add("header")
  
  const listEl = document.getElementById("list")
  listEl.appendChild(headerRow)
}

function renderList (page) {
  const listEl = document.getElementById("list")
  listEl.innerHTML = ""
  const selectedComments = getCommentsPerPage(page)
  if (selectedComments.length > 0) {
    for (let i = 0; i < selectedComments.length; i++) {
      if (i === 0) {
        renderHeaderList()
      }
      const row = document.createElement("tr")
      const id = document.createElement("td")
      id.appendChild(document.createTextNode(selectedComments[i].id))
      
      const name = document.createElement("td")
      name.appendChild(document.createTextNode(selectedComments[i].name))
      
      const email = document.createElement("td")
      email.appendChild(document.createTextNode(selectedComments[i].email))
      
      const body = document.createElement("td")
      body.appendChild(document.createTextNode(selectedComments[i].body))
      
      row.appendChild(id)
      row.appendChild(name)
      row.appendChild(email)
      row.appendChild(body)
  
      listEl.appendChild(row)
    }
  } else {
    renderErrorMessage("No comments found")
  }
}

function renderErrorMessage (message) {
  const listEl = document.getElementById("list")
  listEl.innerText = message
}
