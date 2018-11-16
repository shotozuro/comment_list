const { getComments, onSearch, onSelectSort } = require('./script')

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("search").addEventListener("click", onSearch)
  document.getElementById("sorting").addEventListener("change", onSelectSort)
  getComments()
})