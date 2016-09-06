/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of _students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of _students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing _students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing _students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
    let lastId = 0;
    let studentsIDs = [];

    function isUpperCaseLetter(letter) {
        return letter >= 'A' && letter <= 'Z';
    }

    function isLowerCaseLetter(letter) {
        return letter >= 'a' && letter <= 'z';
    }

    function hasConsecutiveSpaces(title) {
        for (let i = 0, len = title.length; i < len; i += 1) {
            if (title[i] === ' ' && title[i + 1] === ' ') {
                return true;
            }
        }
        return false;
    }

    function countScore(scoreOfStudent, countHomeworkOfStudent, countOfAllHomework) {
        if (typeof countHomeworkOfStudent === 'undefined' || isNaN(countHomeworkOfStudent)) {
            countHomeworkOfStudent = 0;
        }

        return 0.75 * scoreOfStudent + countHomeworkOfStudent / countOfAllHomework;
    }

    function sort(arr) {
        let len = arr.length;
        let isNotSorted = true;
        let allHomeworkCount = this._presentations.length;
        let sortedStudents = this._students;
        while (isNotSorted) {
            isNotSorted = false;
            for (let i = 0; i < len - 1; i += 1) {
                let firstStudentScore = countScore(sortedStudents[i].score,
                    sortedStudents[i].countHomeworks, allHomeworkCount);
                let secondStudentScore = countScore(sortedStudents[i + 1].score,
                    sortedStudents[i + 1].countHomeworks, allHomeworkCount);
                if (firstStudentScore < secondStudentScore) {
                    let tmp = sortedStudents[i];
                    sortedStudents[i] = sortedStudents[i + 1];
                    sortedStudents[i + 1] = tmp;
                    isNotSorted = true;
                }
            }
        }
        return sortedStudents;
    }



    var Course = {

        init: function(title, presentations) {
            if (typeof title !== 'string') {
                throw 'init: typeof title !== string';
            }
            if (title.length === 0) {
                throw 'init: Titles have at least one character';
            } else if (title[0] === ' ' || title[title.length - 1] === ' ') {
                throw 'init: Titles do not start or end with spaces';
            }

            if (hasConsecutiveSpaces(title)) {
                throw 'init: titles do not have consecutive spaces';
            }

            if (typeof presentations === 'undefined' || presentations.length === 0) {
                throw 'init: there are no presentations';
            }

            presentations.forEach(function(title) {
                if (title.length === 0) {
                    throw 'init: presentation title is empty string';
                } else if (hasConsecutiveSpaces(title)) {
                    throw 'init: titles do not have consecutive spaces';
                }
            });

            this._title = title;
            this._presentations = presentations;
            this._students = [];


            return this;

        },
        addStudent: function(name) {
            if (typeof name !== 'string') {
                throw 'addStudent: typeof name !== string';
            }
            let splitName = name.split(' ');
            if (splitName.length !== 2) {
                throw 'addStudent: splitName.length !== 2';
            }
            let firstName = splitName[0];
            let lastName = splitName[1];
            if (!isUpperCaseLetter(firstName[0]) || !isUpperCaseLetter(lastName[0])) {
                throw 'addStudent: Names start with an upper case letter';
            }
            for (let i = 1, len = firstName.length; i < len; i += 1) {
                if (!isLowerCaseLetter(firstName[i])) {
                    throw 'addStudent: All other symbols in the name (if any) are lowercase letters';
                }
            }
            for (let i = 1, len = lastName.length; i < len; i += 1) {
                if (!isLowerCaseLetter(lastName[i])) {
                    throw 'addStudent: All other symbols in the name (if any) are lowercase letters';
                }
            }
            let id = lastId += 1;

            this._students.push({ firstName: firstName, lastName: lastName, id: id, score: 0 });

            return id;
        },
        getAllStudents: function() {
            let studentsToReturn = [];

            for (let i = 0, len = this._students.length; i < len; i += 1) {
                studentsToReturn.push({
                    firstname: this._students[i].firstName,
                    lastname: this._students[i].lastName,
                    id: this._students[i].id
                });
            }

            return studentsToReturn;
        },
        submitHomework: function(studentID, homeworkID) {
            if (typeof studentID !== 'number' || typeof homeworkID !== 'number') {
                throw 'submitHomework: typeof StudentID or homeworkID is not a number ';
            }

            if (this._presentations.length < homeworkID || homeworkID <= 0) {
                throw ('Invalid presentation id!');
            }

            let isFoundStudentsId = false;
            for (let i = 0, len = this._students.length; i < len; i += 1) {
                if (this._students[i].id === studentID) {
                    isFoundStudentsId = true;
                    break;
                }
                isFoundStudentsId = false;
            }
            if (!isFoundStudentsId) {
                throw 'submitHomework: no student with this id';
            }

            for (let i = 0, len = this._students.length; i < len; i += 1) {
                if (this._students[i].id === studentID) {
                    if (isNaN(this._students[i].countHomeworks)) {
                        this._students[i].countHomeworks = 0;
                    }
                    this._students[i].countHomeworks += 1;
                }
            }

        },
        pushExamResults: function(results) {
            if (typeof results === 'undefined') {
                throw 'pushExamResults: no arguments';
            } else if (!Array.isArray(results)) {
                throw 'pushExamResults: not array';
            }
            let len = results.length;
            let studentsLen = this._students.length;

            for (let i = 0; i < len; i += 1) {
                if ((typeof results[i].StudentID !== 'number') || (typeof results[i].score !== 'number') ||
                    isNaN(results[i].StudentID) || isNaN(results[i].score)) {
                    throw 'pushExamResults: studentID or score not a number';
                }
                if (results[i].StudentID <= 0 || studentsLen < results[i].StudentID) {
                    throw ('pushExamResults: invalid student id');
                }

                for (let j = 0; j < studentsLen; j += 1) {
                    if (results[i].StudentID === this._students[j].id) {
                        if (this._students[j].score !== 0) {
                            throw 'pushExamResults: someone try to cheat';
                        }
                        this._students[j].score = results[i].score;
                    }
                }
            }
        },
        getTopStudents: function() {
            let sortedStudents = sort(this._students);
            let studentsObj = [];
            for (let i = 0, len = sortedStudents.length; i < 10; i += 1) {
                studentsObj.push({
                    firstname: sortedStudents[i].firstName,
                    lastname: sortedStudents[i].lastName,
                    id: sortedStudents[i].id
                });
            }
            return studentsObj;
        }

    };

    return Course;
}

module.exports = solve;