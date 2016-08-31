/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(arr) {
    if (!arr.length) {
        return null;
    }
    if (!arr) {
        throw new Error();
    }

    var len = arr.length,
        result = 0;

    arr = arr.map(Number);

    for (var i = 0; i < len; i += 1) {
        if (isNaN(arr[i])) {
            throw new Error();
        }
        result += arr[i];
    }

    return result;
}

module.exports = sum;