/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(start, end) {
    var start = +start;
    var end = +end;
    if (isNaN(start) || isNaN(end) || start === undefined || end === undefined) {
        throw new Error();
    }
    var result = [];

    for (var i = start + 1; i <= end; i += 1) {
        if (isPrime(i)) {
            result.push(i);
        }
    }

    return result;

    function isPrime(number) {
        if (number < 2) {
            return false;
        }
        for (var i = 2; i <= Math.sqrt(number); i += 1) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
}
//console.log(findPrimes(0, 5));

module.exports = findPrimes;