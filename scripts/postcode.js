
function hasNumbers(str) {
    var numError = false;
    //Check string for numbers
    for (var i = 0; i < str.length; i++) {
        if (!isNaN(str.charAt(i))) numError = true;
    }
    return numError;
}

function isNumeric(str) {
    var numError = true;
    //Check string for numbers
    for (var i = 0; i < str.length; i++) {
        if (isNaN(str.charAt(i))) numError = false;
    }
    return numError;
}

function isAlpha(str) {
    var alphaError = true;
    //Check string for numbers
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) < "A" || str.charAt(i) > "z") alphaError = false;
    }
    return alphaError;
}

function isAlphaAndNumeric(str) {
    var alphaNumError = true;
    for (var i = 0; i < str.length; i++) {
        if (!hasNumbers(str.charAt(i)) && !isAlpha(str.charAt(i))) {
            alphaNumError = false;
        }
    }
    return alphaNumError;
}

function trimSpaces(str) {
    var tempStr = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != " ") {
            tempStr += str.charAt(i);
        }
    }
    return tempStr;
}

function isValidPartialPostcode(str) {
    var outwardPass = false;
    var postcodeStr = trimSpaces("" + str);
    //Check for partial postcode 
    //AN
    if ((postcodeStr.length == 2 || postcodeStr.length == 5) && (isAlpha(postcodeStr.charAt(0)) && isNumeric(postcodeStr.charAt(1)))) outwardPass = true;
    //ANN & AAN & ANA
    if ((postcodeStr.length == 3 || postcodeStr.length == 6) && (isAlpha(postcodeStr.charAt(0)) && isNumeric(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) || isAlpha(postcodeStr.charAt(0)) && isAlpha(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) || isAlpha(postcodeStr.charAt(0)) && isNumeric(postcodeStr.charAt(1)) && isAlpha(postcodeStr.charAt(2)))) outwardPass = true;
    //AANN & AANA
    if ((postcodeStr.length == 4 || postcodeStr.length == 7) && (isAlpha(postcodeStr.charAt(0)) && isAlpha(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) && isNumeric(postcodeStr.charAt(3)) || isAlpha(postcodeStr.charAt(0)) && isAlpha(postcodeStr.charAt(1)) && isNumeric(postcodeStr.charAt(2)) && isAlpha(postcodeStr.charAt(3)))) outwardPass = true;
    return outwardPass;
}

function arrayContainsElement(array, elem) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == elem) return true;
    }
    return false;
}

function hasCIKMOV(refStr) {
    var seqError = false;
    for (var i = 0; i < refStr.length; i++) {
        if (arrayContainsElement(hasCIKMOV.arguments, hasCIKMOV.arguments[0].charAt(i))) seqError = true;
    }
    return seqError;
}

function validatePostcode(str) {
    // This function checks the postcode has been entered. It also checks the size
    // and the format of the postcode.
    var isValid = true;
    var postcodeStr = trimSpaces("" + str);

    if (postcodeStr == "") {
        return;
    }
    else if (!isAlphaAndNumeric(postcodeStr) && postcodeStr != "") {
        alert("Please enter a valid postcode (letters and numbers only)");
        isValid = false;
    }
    else if (postcodeStr.length < 2 || postcodeStr.length > 7) {
        alert("Please enter a postcode length between 2 - 7 characters");
        isValid = false;
    }
    else if (hasCIKMOV(postcodeStr.substring(postcodeStr.length, postcodeStr.length - 2).toLowerCase(), "c", "i", "k", "m", "o", "v")) {
        alert("Please enter a valid postcode");
        isValid = false;
    }
    else if (!isValidPartialPostcode(str)) {
        alert("Please enter a valid postcode");
        isValid = false;
    }
    else if (postcodeStr.length > 4 && (!isAlpha(postcodeStr.charAt(0)) ||
        !isAlpha(postcodeStr.charAt(postcodeStr.length - 1)) ||
        !isAlpha(postcodeStr.charAt(postcodeStr.length - 2)) ||
        !isNumeric(postcodeStr.charAt(postcodeStr.length - 3)))) {
        alert("Please enter a valid postcode");
        isValid = false;
    }

    return isValid;
}