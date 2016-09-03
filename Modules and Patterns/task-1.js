/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
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
 * Create method getAllStudents that returns an array of students in the format:
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
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
    let students = [];
    let courses = {};
    let lastId = 0;
    let studentsForCourse = [];
    let studentsIDs = [];
    let countHomeworks = 0;

    function isUpperCaseLetter(letter) {
        return letter >= 'A' && letter <= 'Z';
    }

    function isLowerCaseLetter(letter) {
        return letter >= 'a' && letter <= 'z';
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
        let allHomeworkCount = courses.presentations.length;
        let sortedStudents = courses.studentsForCourse;
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
            if (title === '') {
                throw 'init: Titles have at least one character';
            }

            if (title[0] === ' ' || title[title.length - 1] === ' ') {
                throw 'init: Titles do not start or end with spaces';
            }

            for (let i = 0, len = title.length; i < len - 1; i += 1) {
                if (title[i] === ' ' && title[i + 1] === ' ') {
                    throw 'init: titles do not have consecutive spaces';
                }
            }

            if (typeof presentations === 'undefined' || presentations.length === 0) {
                throw 'init: there are no presentations';
            }

            courses.title = title;
            courses.presentations = presentations;
            courses.studentsForCourse = students;

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

            students.push({ firstName, lastName, id });
            courses.studentsForCourse = students;

            return id;
        },
        getAllStudents: function() {
            //return courses.studentsForCourse;
            let studentsObj = [];
            for (let i = 0, len = courses.studentsForCourse.length; i < len; i += 1) {
                studentsObj.push({
                    firstName: courses.studentsForCourse[i].firstName,
                    lastName: courses.studentsForCourse[i].lastName,
                    id: courses.studentsForCourse[i].id,
                });
            }
            return studentsObj;
        },
        submitHomework: function(studentID, homeworkID) {
            if (typeof studentID !== 'number' || typeof homeworkID !== 'number') {
                throw 'submitHomework: typeof StudentID or homeworkID is not a number ';
            }
            if (studentID < 1 || homeworkID < 1) {
                throw 'submitHomework: StudentID or homeworkID is < 1';
            }
            if (parseInt(studentID) !== studentID || parseInt(homeworkID) !== homeworkID) {
                throw 'submitHomework: StudentID or homeworkID not integer';
            }

            let isFoundStudentsId = false;
            for (let i = 0, len = courses.studentsForCourse.length; i < len; i += 1) {
                if (courses.studentsForCourse[i].id === studentID) {
                    isFoundStudentsId = true;
                    break;
                }
                isFoundStudentsId = false;
            }
            if (!isFoundStudentsId) {
                throw 'submitHomework: no student with this id';
            }

            for (let i = 0, len = courses.studentsForCourse.length; i < len; i += 1) {
                if (courses.studentsForCourse[i].id === studentID) {
                    if (isNaN(courses.studentsForCourse[i].countHomeworks)) {
                        courses.studentsForCourse[i].countHomeworks = 0;
                    }
                    courses.studentsForCourse[i].countHomeworks += 1;
                }
            }

        },
        pushExamResults: function(results) {
            let len = results.length;
            if (typeof results === 'undefined') {
                throw 'pushExamResults: no arguments';
            }
            if (!Array.isArray(results)) {
                throw 'pushExamResults: not array';
            }

            for (let i = 0; i < len; i += 1) {
                if ((typeof results[i].StudentID !== 'number') || (typeof results[i].score !== 'number') ||
                    isNaN(results[i].StudentID) || isNaN(results[i].score)) {
                    throw 'pushExamResults: studentID or score not a number';
                }
                studentsIDs.push(results[i].StudentID);
            }

            for (let i = 0, len = studentsIDs.length; i < len - 1; i += 1) {
                for (let j = i + 1, len1 = studentsIDs.length; j < len1; j += 1) {
                    if (studentsIDs[i] === studentsIDs[j]) {
                        throw 'pushExamResults: try to cheat';
                    }
                }
            }
            let isThereStudentsWithThisId = false;
            let coursesLen = courses.studentsForCourse.length;
            for (let i = 0; i < len; i += 1) {
                for (let j = 0; j < coursesLen; j += 1) {
                    if (results[i].StudentID === courses.studentsForCourse[j].id) {

                        courses.studentsForCourse[j].score = results[i].score;
                        isThereStudentsWithThisId = true;
                    }
                }
                if (!isThereStudentsWithThisId) {
                    throw 'pushExamResults: no students with this id';
                }
                isThereStudentsWithThisId = false;
            }

            for (let i = 0; i < coursesLen; i += 1) {
                if (typeof courses.studentsForCourse[i].score === 'undefined') {
                    courses.studentsForCourse[i].score = 0;
                }
            }
        },
        getTopStudents: function() {
            let sortedStudents = sort(courses.studentsForCourse);
            let studentsObj = [];
            for (let i = 0, len = sortedStudents.length; i < 10; i += 1) {
                studentsObj.push({
                    firstName: sortedStudents[i].firstName,
                    lastName: sortedStudents[i].lastName,
                    id: sortedStudents[i].id
                });
            }

            return studentsObj;
        },
        getCourses: function() {
            console.log(courses);

        }
    };

    return Course;
}



module.exports = solve;