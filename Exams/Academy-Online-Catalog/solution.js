function solve() {
    let Item, Book, Media, Catalog, BookCatalog, MediaCatalog;

    let validator = {
        isUndefined: function(value, msg) {
            if (typeof value === 'undefined') {
                throw `${msg} is undefined`;
            }
        },
        isString: function(value, msg) {
            if (typeof value !== 'string') {
                throw `${msg} is not a string`;
            }
        },
        isEmpty: function(value, msg) {
            if (value.length === 0) {
                throw `${msg} can not be an empty`;
            }
        },
        isStringInBounds: function(min, max, value, msg) {
            if (value.length < min || value.length > max) {
                throw `${msg} must be between ${min} and ${max} characters`;
            }
        },
        isStringExactlyCharactes: function(str, first, second, msg) {
            let len = str.length;
            if (len !== first && len !== second) {
                throw `${msg} must be ${first} or ${second} characters`;
            }
        },
        isNumber: function(value, msg) {
            if (typeof value !== 'number' || isNaN(value)) {
                throw `${msg} is not a number`;
            }
        },
        isDigit: function isDigit(symbol) {
            return symbol >= 0 && symbol <= 9;
        },
        isContainingOnlyDigits: function(value, msg) {
            let numberLength = value.length;

            for (let i = 0; i < numberLength; i += 1) {
                if (!this.isDigit(value[i])) {
                    throw `${msg} must contains only digits`;
                }
            }
        },
        isPositiveNumber: function(value, msg) {
            if (value <= 0) {
                throw `${msg} must be positive number`;
            }
        },
        isNumberInBounds: function(value, min, max, msg) {
            if (value < min || value > max) {
                throw `${msg} must be between ${min} and ${max}`;
            }
        },
        isItemLikeObject: function(value) {
            return (value instanceof Item) ||
                (typeof value.id === "number" &&
                    typeof value.name === "string" &&
                    typeof value.description === "string");
        },
        isBookLikeObject: function(value) {
            return this.isItemLikeObject(value) &&
                ((value instanceof Book) ||
                    (typeof value.isbn === "string" &&
                        typeof value.genre === "string"));
        },
        isMediaLikeObject: function(value) {
            return this.isItemLikeObject(value) &&
                ((value instanceof Media) ||
                    (typeof value.rating === "number" &&
                        typeof value.duration === "number"));
        },
        arrayToReturn: function(arr) {
            if (Array.isArray(arr[0])) {
                arr = arr[0];
            }
            return arr;
        }
    };

    Item = (function() {
        let idItem = 0;
        class Item {
            constructor(name, description) {
                this.name = name;
                this.description = description;
                this._id = idItem += 1;
            }

            get description() {
                return this._description;
            }
            set description(description) {
                validator.isUndefined(description, 'item description');
                validator.isString(description, 'item description');
                validator.isEmpty(description, 'item description');

                this._description = description;
            }

            get name() {
                return this._name;
            }
            set name(name) {
                validator.isUndefined(name, 'item name');
                validator.isString(name, 'item name');
                validator.isStringInBounds(2, 40, name, 'item name');

                this._name = name;
            }

            get id() {
                return this._id;
            }
        }

        return Item;
    }());


    Book = (function() {
        class Book extends Item {
            constructor(name, isbn, genre, description) {
                super(name, description);

                this.isbn = isbn;
                this.genre = genre;
            }

            get isbn() {
                return this._isbn;
            }

            set isbn(number) {
                validator.isUndefined(number, 'book isbn');
                validator.isString(number, 'book isbn');
                validator.isStringExactlyCharactes(number, 10, 13, 'book isbn');
                validator.isContainingOnlyDigits(number, 'book isbn');

                this._isbn = number;
            }

            get genre() {
                return this._genre;
            }

            set genre(genre) {
                validator.isUndefined(genre, 'book genre');
                validator.isString(genre, 'book genre');
                validator.isStringInBounds(2, 20, genre, 'book genre');

                this._genre = genre;
            }
        }

        return Book;
    }());

    Media = (function() {
        class Media extends Item {
            constructor(name, rating, duration, description) {
                super(name, description);

                this.duration = duration;
                this.rating = rating;
            }

            get duration() {
                return this._duration;
            }

            set duration(duration) {
                validator.isUndefined(duration, 'media duration');
                validator.isNumber(duration, 'media duration');
                validator.isPositiveNumber(duration, 'media duration');

                this._duration = duration;
            }
            get rating() {
                return this._rating;
            }

            set rating(rating) {
                validator.isUndefined(rating, 'media rating');
                validator.isNumber(rating, 'media rating');
                validator.isNumberInBounds(rating, 1, 5, 'media rating');

                this._rating = rating;
            }
        }

        return Media;
    }());

    Catalog = (function() {
        let idCatalg = 0;

        class Catalog {
            constructor(name) {
                this.id = idCatalg += 1;
                this.name = name;
                this.items = [];
            }


            get name() {
                return this._name;
            }

            set name(name) {
                validator.isUndefined(name, 'catalog name');
                validator.isString(name, 'catalog name');
                validator.isStringInBounds(2, 40, name, 'catalog name');

                this._name = name;
            }

            add(...itemsArray) {
                validator.isUndefined(itemsArray, 'items to add in catalog');
                itemsArray = validator.arrayToReturn(itemsArray);
                validator.isEmpty(itemsArray);

                for (let item of itemsArray) {
                    if (!validator.isItemLikeObject(item)) {
                        throw 'item is not item instance or item-like object';
                    }
                }

                for (let item of itemsArray) {
                    this.items.push(item);
                }
                return this;
            }

            find(options) {
                validator.isUndefined(options, 'catalong options');
                if (typeof options === 'number') {
                    for (let item of this.items) {
                        if (options === item.id) {
                            return item;
                        }
                    }
                    return null;
                }
                if (options !== null && typeof options === 'object') {
                    return this.items
                        .filter(function(item) {
                            return Object.keys(options)
                                .every(function(prop) {
                                    return options[prop] === item[prop];
                                });
                        });
                }
                throw 'options must be number or object';

            }

            search(pattern) {
                validator.isUndefined(pattern, 'catalog pattern');
                validator.isString(pattern, 'catalog pattern');
                validator.isEmpty(pattern, 'catalog pattern');


                let itemstToReturn = [];
                let itemsArr = this.items;

                for (let item of itemsArr) {
                    let isPatternFoundInName = item.name.indexOf(pattern) >= 0;
                    let isPatternFoundInDescription = item.description.indexOf(pattern) >= 0;

                    if (isPatternFoundInName || isPatternFoundInDescription) {
                        itemstToReturn.push(item);
                    }
                }

                return itemstToReturn;
            }

        }

        return Catalog;
    }());

    BookCatalog = (function() {
        class BookCatalog extends Catalog {
            constructor(name) {
                super(name);
            }

            add(...booksArray) {
                validator.isUndefined(booksArray, 'items to add in catalog');
                booksArray = validator.arrayToReturn(booksArray);
                validator.isEmpty(booksArray);

                for (let book of booksArray) {
                    if (!validator.isBookLikeObject(book)) {
                        throw 'items is not an Book instance or not an Book-like object';
                    }
                }

                return super.add(...booksArray);
            }

            getGenres() {
                let unique = [];
                this.items.forEach(function(item) {
                    if (!unique.includes(item.genre)) {
                        unique.push(item.genre);
                    }
                });

                return unique;
            }

            find(options) {
                return super.find(options);
            }

        }

        return BookCatalog;
    }());

    MediaCatalog = (function() {
        class MediaCatalog extends Catalog {
            constructor(name) {
                super(name);
            }

            add(...mediaArray) {
                validator.isUndefined(mediaArray, 'items to add in catalog');
                mediaArray = validator.arrayToReturn(mediaArray);
                validator.isEmpty(mediaArray);

                for (let media of mediaArray) {
                    if (!validator.isMediaLikeObject(media)) {
                        throw 'items is not an Media instance or not an Media-like object';
                    }
                }

                return super.add(...mediaArray);
            }

            getTop(count) {
                validator.isUndefined(count, 'MediaCatalog getTop count');
                validator.isNumber(count, 'MediaCatalog getTop count');
                if (count < 1) {
                    throw 'MediaCatalog getTop count must be more than 1';
                }
                this.items = this.items.sort(function(a, b) {
                    return a.rating - b.rating;
                });
                if (count > this.items.length) {
                    count = this.items.length;
                }

                let arrayToReturn = [];
                for (let i = 0; i < count; i += 1) {
                    arrayToReturn.push({
                        id: this.items[i].id,
                        name: this.items[i].name,
                    });
                }
                return arrayToReturn;

            }
            getSortedByDuration() {
                return this.items
                    .sort((a, b) => {
                        if (a.duration === b.duration) {
                            return a.id < b.id;
                        }

                        return a.duration > b.duration;
                    });
            }
        }

        return MediaCatalog;
    }());

    return {
        getBook: function(name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function(name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getBookCatalog: function(name) {
            return new BookCatalog(name);
        },
        getMediaCatalog: function(name) {
            return new MediaCatalog(name);
        }
    };
}
let result = solve();
let media = result.getMedia('generic', 1, 2, 'mediaDes');
let mediaCatalog = result.getMediaCatalog('mediaCatalogName');
mediaCatalog.add(media);
console.log(mediaCatalog.getTop(20));

module.exports = solve;