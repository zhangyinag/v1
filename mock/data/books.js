const routes = [{
  name: 'getBooks',
  url: '/books',
  method: 'get'
},{
  name: 'addBook',
  url: '/books',
  method: 'post'
},{
  name: 'deleteBooks',
  url: '/books',
  method: 'delete'
},{
  name: 'getBook',
  url: '/books/:bookId',
  method: 'get'
},{
  name: 'updateBook',
  url: '/books/:bookId',
  method: 'put'
},{
  name: 'patchBook',
  url: '/books/:bookId',
  method: 'patch'
},{
  name: 'deleteBook',
  url: '/books/:bookId',
  method: 'delete'
},{
  name: 'queryBooks',
  url: '/books/queries',
  method: 'post'
},{
  name: 'batchUpdateBooks',
  url: '/books/batchUpdate',
  method: 'post'
},{
  name: 'batchDeleteBooks',
  url: '/books/batchDelete',
  method: 'post'
}]

const collection = [{
  "bookId": 1,
  "name": "Angular Cookbook",
  "author": "Alison",
  "publishDate": new Date(2016,3,5).getTime()
},{
  "bookId": 2,
  "name": "How to Manage your garden",
  "author": "Lilith",
  "publishDate": new Date(2015,2,5).getTime()
},{
  "bookId": 3,
  "name": "Vue Book",
  "author": "Lilith",
  "publishDate": new Date(2014,4,9).getTime()
},{
  "bookId": 4,
  "name": "Axure",
  "author": "Spencer",
  "publishDate": new Date(2012,5,9).getTime()
}]


const handler = function (route,req) {
  var h = handler[route.name]
  if(typeof h === "function"){
    return h(route,req);
  }
  throw new Error(`${route.url} not handled`);
}

module.exports = {
  routes: routes,
  key: 'books',
  handler: handler
}



//---//
function generateSeq(){
  var seq = -1;
  collection.forEach(function (v) {
    seq = seq < v.bookId ? v.bookId : seq;
  })
  return ++seq;
}


handler.getBooks = function (route,req) {
  var bookName = req.query.name;
  if(bookName){
    return collection.filter(function (v) {
      return v.name.indexOf(bookName) !== -1;
    })
  }
  return collection;
}

handler.getBook = function (route,req) {
  let bookId = req.params.bookId;
  return collection.filter(function (v) {
    return v.bookId === +bookId
  })
}

handler.addBook = function (route,req) {
  let book = req.body;
  book.bookId = generateSeq();
  collection.push(book);
  return book;
}

handler.deleteBooks = function (route,req) {
  collection.length = 0;
  return [];
}

handler.updateBook = function (route,req) {
  let newBook = req.body;
  let oldBookIndex = -1;
  collection.every(function (v,i) {
    if(v.bookId === +newBook.bookId){
      oldBookIndex = i;
      return false;
    }
    return true;
  });
  if(oldBookIndex !== -1){
    collection[oldBookIndex] = newBook;
    return newBook;
  }
  throw new Error(`not found book ${newBook.bookId}`);
}

handler.patchBook = function (route,req) {
  let newBook = req.body;
  let oldBook = null;
  collection.every(function (v) {
    if (v.bookId === +newBook.bookId) {
      oldBook = v;
      return false;
    }
    return true;
  });
  if (oldBook) {
    Object.assign(oldBook, newBook);
    return oldBook;
  }
  throw new Error(`not found book ${newBook.bookId}`);
}


