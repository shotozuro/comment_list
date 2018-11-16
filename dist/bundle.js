/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getComments, onSearch, onSelectSort } = __webpack_require__(/*! ./script */ \"./script.js\")\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  document.getElementById(\"search\").addEventListener(\"click\", onSearch)\n  document.getElementById(\"sorting\").addEventListener(\"change\", onSelectSort)\n  getComments()\n})\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let defComments = []\nlet comments = []\nlet commentLimit = 15\n\nfunction onSelectPage (e) {\n  const page = e.target.id.split(\"-\")\n  renderPage(Number(page[1]))\n}\n\nfunction onSelectSort (e) {\n  const selectedSort = e.target.value.split(\"-\")\n  const query = document.getElementById(\"searchText\").value\n  const selectedList = query.length > 1 ? comments : defComments\n\n  const key = selectedSort[0]\n  const order = selectedSort[1]\n  \n  comments = getSortedComments(selectedList, key, order)\n  renderPage()\n}\n\nfunction onSearch () {\n  const query = document.getElementById(\"searchText\").value\n  document.getElementById(\"sorting\").value = \"id-asc\"\n  comments = filterData(defComments, \"body\", query)\n  renderPage()\n}\n\nfunction getComments() {\n  let statusCode = 0\n  let statusText = \"\"\n  fetch('http://jsonplaceholder.typicode.com/comments')\n  .then(res => {\n    statusCode = res.status\n    statusText = res.statusText\n    return res.json()\n  })\n  .then(data => {\n    if (statusCode === 200) {\n      defComments = data\n      comments = data\n      renderPage()\n    } else {\n      renderErrorMessage(statusText)\n    }\n\n  })\n  .catch(e => renderErrorMessage(\"Failed to get data.\"))\n}\n\nfunction compareValues(key, order = 'asc') {\n  return function (a, b) {\n    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {\n      return 0\n    }\n\n    const varA = (typeof a[key] === 'string') ?\n      a[key].toUpperCase() : a[key]\n    const varB = (typeof b[key] === 'string') ?\n      b[key].toUpperCase() : b[key]\n\n    let comparison = 0\n    if (varA > varB) {\n      comparison = 1\n    } else if (varA < varB) {\n      comparison = -1\n    }\n    return (\n      (order == 'desc') ? (comparison * -1) : comparison\n    )\n  }\n}\n\nfunction getSortedComments(data, key, order) {\n  return [...data].sort(compareValues(key, order))\n}\n\nfunction filterData(data, field, query) {\n  return [...data].filter((comment) => {\n    const cleanQuery = query.replace(/\\s/g, '')\n    const cleanComment = comment[field].replace(/\\s/g, '')\n    const stringPosition = cleanComment.indexOf(cleanQuery)\n\n    return stringPosition > -1\n  })\n}\n\nfunction getCommentsPerPage(page) {\n  if (typeof page !== \"number\" || page < 1) {\n    return []\n  }\n  const start = (page - 1) * commentLimit\n  const end = page * commentLimit\n\n  return comments.slice(start, end)\n}\n\nfunction renderPage(page = 1) {\n  renderList(page)\n  renderPagination(page)\n}\n\nfunction renderPagination(selectedPage) {\n  const paginationEl = document.getElementById(\"pagination\")\n  paginationEl.innerHTML = \"\"\n  const pages = Math.ceil(comments.length / commentLimit) \n  Array(pages).fill(0).forEach((el, index) => {\n    const pageNumber = index + 1\n    const pageEl = document.createElement(\"button\")\n\n    pageEl.addEventListener(\"click\", onSelectPage)\n    pageEl.classList.add(\"page-number\")\n    pageEl.setAttribute(\"id\", \"page-\" + pageNumber)\n    if (pageNumber === selectedPage) {\n      pageEl.disabled = true\n    }\n    pageEl.appendChild(document.createTextNode(pageNumber))\n\n    paginationEl.appendChild(pageEl)\n  })\n}\n\nfunction renderHeaderList () {\n  const headerRow = document.createElement(\"tr\")\n  const colId = document.createElement(\"td\")\n  const colName = document.createElement(\"td\")\n  const colEmail = document.createElement(\"td\")\n  const colBody = document.createElement(\"td\")\n\n  colId.appendChild(document.createTextNode(\"ID\"))\n  colName.appendChild(document.createTextNode(\"Name\"))\n  colEmail.appendChild(document.createTextNode(\"Email\"))\n  colBody.appendChild(document.createTextNode(\"Body\"))\n  \n  headerRow.appendChild(colId)\n  headerRow.appendChild(colName)\n  headerRow.appendChild(colEmail)\n  headerRow.appendChild(colBody)\n  headerRow.classList.add(\"header\")\n  \n  const listEl = document.getElementById(\"list\")\n  listEl.appendChild(headerRow)\n}\n\nfunction renderList (page) {\n  const listEl = document.getElementById(\"list\")\n  listEl.innerHTML = \"\"\n  const selectedComments = getCommentsPerPage(page)\n  if (selectedComments.length > 0) {\n    for (let i = 0; i < selectedComments.length; i++) {\n      if (i === 0) {\n        renderHeaderList()\n      }\n      const row = document.createElement(\"tr\")\n      const id = document.createElement(\"td\")\n      id.appendChild(document.createTextNode(selectedComments[i].id))\n      \n      const name = document.createElement(\"td\")\n      name.appendChild(document.createTextNode(selectedComments[i].name))\n      \n      const email = document.createElement(\"td\")\n      email.appendChild(document.createTextNode(selectedComments[i].email))\n      \n      const body = document.createElement(\"td\")\n      body.appendChild(document.createTextNode(selectedComments[i].body))\n      \n      row.appendChild(id)\n      row.appendChild(name)\n      row.appendChild(email)\n      row.appendChild(body)\n  \n      listEl.appendChild(row)\n    }\n  } else {\n    renderErrorMessage(\"No comments found\")\n  }\n}\n\nfunction renderErrorMessage (message) {\n  const listEl = document.getElementById(\"list\")\n  listEl.innerText = message\n}\n\nconst mod = {\n  getSortedComments,\n  filterData,\n  onSelectSort,\n  onSearch,\n  getComments\n}\n\nmodule.exports = mod\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });