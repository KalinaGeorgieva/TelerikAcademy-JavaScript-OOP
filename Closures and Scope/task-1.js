/* Task Description */
/* 
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */
function solve() {
    var library = (function() {
        var books = [];
        var categories = [];

        var getNextId = (function() {
            var lastId = 0;
            return function() {
                return lastId += 1;
            };
        }());

        function sort(arr) {
            var isNotSorted = true;
            while (isNotSorted) {
                isNotSorted = false;
                for (var i = 0, len = arr.length - 1; i < len; i += 1) {
                    if (arr[i].ID > arr[i + 1].ID) {
                        var tmp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = tmp;
                        isNotSorted = true;
                    }
                }
            }
        }

        function getAllBooksOfCategory(cat) {
            var allCat = [];
            for (var i = 0, len = books.length; i < len; i += 1) {
                if (books[i].category === cat) {
                    allCat.push(books[i]);
                }
            }
            return allCat;
        }

        function getAllBooksByAuthor(aut) {
            var allAuthors = [];
            for (var i = 0, len = books.length; i < len; i += 1) {
                if (books[i].author === aut) {
                    allAuthors.push(books[i]);
                }
            }
            return allAuthors;
        }

        function listBooks() {
            sort(books);
            if (!arguments[0]) {
                return books;
            } else if (arguments[0].category) {
                return getAllBooksOfCategory(arguments[0].category);
            } else {
                return getAllBooksByAuthor(arguments[0].author);
            }
        }

        function isUnique(bookTitle, bookIsbn) {
            for (var i = 0, len = books.length; i < len; i += 1) {
                if (books[i].title === bookTitle || books[i].isbn === bookIsbn) {
                    return false;
                }
            }
            return true;
        }

        function checksBookParams(book) {
            if (!book) {
                throw new Error('book');
            }
            if (book.title.length < 2 || book.title.length > 100) {
                throw new Error('title');
            }
            if (!book.category) {
                book.category = "Book category";
            }
            if (book.category.length < 2 || book.category.length > 100) {
                throw new Error('categories');
            }
            if (book.author === '') {
                throw new Error('author');
            }
            if (book.isbn.length !== 10 && book.isbn.length !== 13) {
                throw new Error('isbn');
            }
            if (!isUnique(book.title, book.isbn)) {
                throw new Error('unique');
            }
        }

        function thisBookCategoryExist(cat) {
            for (var i = 0, len = categories.length; i < len; i += 1) {
                if (categories[i] === cat) {
                    return true;
                }
            }
            return false;
        }

        function addBook(book) {
            checksBookParams(book);
            book.ID = getNextId();
            books.push(book);
            if (!thisBookCategoryExist(book.category)) {
                categories.push(book.category);
            }
            return book;
        }

        function listCategories() {
            sort(books);
            return categories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());
    return library;
}
// CONSTS = {
//     VALID: {
//         BOOK_TITLE: 'BOOK #',
//         BOOK_ISBN: {
//             TEN_DIGITS: '1234567890',
//             THIRTEEN_DIGITS: '1234567890123',
//         },
//         AUTHOR: 'John Doe',
//         CATEGORY: 'Book Category'
//     },
//     INVALID: {
//         BOOK_TITLE: {
//             SHORT: 'B',
//             LONG: new Array(102).join('A')
//         },
//         AUTHOR: '',
//         BOOK_ISBN: '1234'
//     }
// };
// book = {
//     title: CONSTS.VALID.BOOK_TITLE + 1,
//     isbn: CONSTS.VALID.BOOK_ISBN.TEN_DIGITS,
//     author: CONSTS.VALID.AUTHOR,
//     category: CONSTS.VALID.CATEGORY
// };
// book2 = {
//     title: CONSTS.VALID.BOOK_TITLE + 2,
//     isbn: CONSTS.VALID.BOOK_ISBN.THIRTEEN_DIGITS,
//     author: CONSTS.VALID.AUTHOR,
//     category: CONSTS.VALID.CATEGORY
// };
// var lib = solve();
// lib.books.add(book);
// lib.books.add(book2);
// var res = lib.categories.list();
// console.log(res);
module.exports = solve;