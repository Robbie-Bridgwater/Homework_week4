// These are the necessary data sets required for the various prompts
var lowerLetters = ["a", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var upperLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialChars = ["#", "!", "£", "$", "%", "^", "&", "*", "(", ")", "{", "}", "@", "~", ";", ":", "<", ",", ".", ">", "/"];

// This initialises the button as a variable for the JS to interact with.
var generatePassword = document.getElementById("generate");
// This initialises the span div as a variable for the JS to interact with.
var span = document.getElementById("Password");

// Below is an event listener for when the generate password button is clicked
// This is a while loop that will prompt the user with a question asking how long they want their password
// to be, if it's not within the permitted range it will ask them the prompt again. It is not best practice
// to use a while loop with a boolean expression that traps the user but I have used it in this instance.
generatePassword.addEventListener("click", function() {
    while (true) {
        passwordLength = prompt("Please select how long you would like your password to be, it must be between 8 and 128 characters long.");
        if (passwordLength >= 8 && passwordLength <= 128) {
            break;
        }
        alert("Woah, woah woah, you're choosing something that's not between 8 and 128 characters long. Let's try that again. You're trapped now. You can't hit cancel. You can't choose an invalid response. Best just to play along...");
    }
    alert("Well done!");

    // This is a series of prompts that will ask the user about what criteria the password must meet,
    // such as the inclusion of: uppercase, lowercase, numbers, special characters.
    passwordUpperCase = confirm("Would you like your password to include uppercase letters?");
    passwordLowerCase = confirm("Would you like your password to include lowercase letters?");
    passwordNumeric = confirm("Would you like your password to include numerical values?");
    passwordSpecialChar = confirm("Last one, I promise, would you like your password to be very special and include special characters?");

    // This creates a function which randomly chooses 1 letter from the upperLetters array.
    const getUppercaseLetter = () => {
            let index = Math.floor(Math.random() * upperLetters.length);
            return upperLetters[index]
        }
        // This creates a function which randomly chooses 1 letter from the lowerLetters array.
    const getLowercaseLetter = () => {
            let index = Math.floor(Math.random() * lowerLetters.length);
            return lowerLetters[index]
        }
        // This creates a function which randomly chooses 1 letter from the numeric array.
    const getNumber = () => {
            let index = Math.floor(Math.random() * numeric.length);
            return numeric[index]
        }
        // This creates a function which randomly chooses 1 letter from the specialChars array.
    const getSpecialChar = () => {
        let index = Math.floor(Math.random() * specialChars.length);
        return specialChars[index]
    }

    // <------- MAIN ------->

    // This initialises an empty array
    const funcs = [];
    // This conditional statement if true will push the getUppercaseLetter function into the empty func array.
    if (passwordUpperCase) {
        funcs.push(getUppercaseLetter);
    }
    // This conditional statement if true will push the getLowercaseLetter function into the empty func array.
    if (passwordLowerCase) {
        funcs.push(getLowercaseLetter);
    }
    // This conditional statement if true will push the getNumber function into the empty func array.
    if (passwordNumeric) {
        funcs.push(getNumber);
    }
    // This conditional statement if true will push the getSpecialChar function into the empty func array.
    if (passwordSpecialChar) {
        funcs.push(getSpecialChar);
    }

    // This creates an empty string called password.
    let password = "";
    // This creates a for loop which will go from index 0 to the index determined by the "passwordLength" prompt.
    for (i = 0; i < passwordLength; ++i) {
        // This creates a variable called functionIndex, it will choose a random number within the range of zero to
        // the amount of functions that have been confirmed for use. i.e. getSpecialChar and getLowercaseLetter have
        // been confirmed so it would be 0 or 1.
        const functionIndex = Math.floor(Math.random() * funcs.length);
        // This grabs a function from the array "funcs" using the randomly generated number from functionIndex.
        // If the functionIndex is 0, it would grab the first one in the array i.e. funcs[0].
        const functionToUse = funcs[functionIndex];
        // This declares the function as a variable to be used.
        const letter = functionToUse();
        // This concatenates the variable "letter" and the empty string called "password" together.
        password += letter;
    }
    // Hey presto, this replaces the text content within the HTML file with the finished, randomised, password. 
    Password.textContent = password;
})