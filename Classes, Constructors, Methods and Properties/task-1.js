/* globals console */
'use strict';


class listNode {
    constructor(value) {
        this._data = value;
        this._next = null;
    }

}

class LinkedList {
    constructor() {
        this._start = null;
        this._length = 0;
    }

    get first() {
        return this._start._data;
    }

    get last() {
        let current = this._start;

        while (current._next) {
            current = current._next;
        }
        return current._data;
    }

    get length() {
        return this._length;
    }

    add(value) {
        let node = new listNode(value),
            current = this._start;

        if (this._start === null) {
            this._start = node;
        } else {
            while (current._next) {
                current = current._next;
            }
            current._next = node;
        }
        this._length += 1;
    }

    append(...args) {
        if (Array.isArray(args[0])) {
            args = args[0];
        }
        for (let i = 0, len = args.length; i < len; i += 1) {
            this.add(args[i]);
        }
        return this;
    }

    prepend(...args) {
        if (Array.isArray(args[0])) {
            args = args[0];
        }
        let next = this._start;
        this._start = null;
        this.append(args);

        let current = this._start;
        while (current._next) {
            current = current._next;
        }
        current._next = next;

        return this;
    }

    insert(index, ...args) {
        if (index === 0) {
            this.prepend(args);
        } else {
            let next = this._start,
                previous = null,
                count = 0;
            while (count !== index) {
                count += 1;
                previous = next;
                next = next._next;
            }

            let items = args.map(node => {
                return new listNode(node);
            });

            previous._next = items[0];
            this._length += 1;

            let current = previous._next;
            for (let i = 1, len = items.length; i < len; i += 1) {
                current._next = items[i];
                current = current._next;
                this._length += 1;
            }
            current._next = next;
        }
        return this;
    }

    at(index, value) {
        let count = 0,
            current = this._start;
        if (typeof value === 'undefined') {
            while (count !== index) {
                current = current._next;
                count += 1;
            }
            return current._data;
        } else {
            while (count !== index) {
                current = current._next;
                count += 1;
            }
            current._data = value;
        }
    }

    removeAt(index) {
        var current = this._start,
            previous, count = 0;

        if (index === count) {
            this._start = current._next;
        } else {
            while (count !== index) {
                count += 1;
                previous = current;
                current = current._next;
            }
            previous._next = current._next;
        }
        this._length -= 1;
        return current._data;
    }

    [Symbol.iterator]() {
        let current = this._start;
        return {
            next: function() {
                if (current === null) {
                    return { done: true };
                } else {
                    let data = current._data;
                    current = current._next;
                    return {
                        value: data,
                        done: false
                    };
                }
            }
        };
    }

    toArray() {
        let arr = [];
        let current = this._start;
        if (current._next === null) {
            arr.push(current._data);
        }
        while (current._next) {
            arr.push(current._data);
            current = current._next;
            if (current._next === null) {
                arr.push(current._data);
            }
        }
        return arr;
    }

    toString() {
        let current = this._start,
            result = '';
        if (current._next === null) {
            result += `${current._data}`;
        }
        while (current._next !== null) {
            result += `${current._data} -> `;
            current = current._next;
            if (current._next === null) {
                result += `${current._data}`;
            }
        }
        return result;
    }
}


module.exports = LinkedList;