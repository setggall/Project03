//On Page Load this brings focus onto the Name field and adds our hidden text box.
//Adds a running total after the activities listings.
//Adds id's to paypal and bitcoin divs and hides them.
$(document).ready(function() {
    $('#name').focus();
    $('#title').after('<textarea id="other-title" placeholder="Your Title" rows="5" cols="30"></textarea>');
    $('#other-title').hide();
    $('.activities').after('<div class="total">Total: $' + runningTotal + '</div>');
    $('#credit-card').next().attr('id', 'paypal');
    $('#paypal').next().attr('id', 'bitcoin');
    $('#paypal').hide();
    $('#bitcoin').hide();
    $('#color').hide();
});

//This function will check to see the value selected from the drop down and show and hide the text box accordingly.
$('#title').change(function() {
    if ($('#title').val() === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

//This disugustingly ugly function shows and hides shirt color based on the design selected.
$('#design').change(function() {
    var availableColor = $('#color').children();
    if ($('#design').val() === 'js puns') {
        $(availableColor).eq(5).hide();
        $(availableColor).eq(4).hide();
        $(availableColor).eq(3).hide();
        $(availableColor).eq(2).show();
        $(availableColor).eq(1).show();
        $(availableColor).eq(0).show();
        $('#color').show();
    } else {
        $(availableColor).eq(5).show();
        $(availableColor).eq(4).show();
        $(availableColor).eq(3).show();
        $(availableColor).eq(2).hide();
        $(availableColor).eq(1).hide();
        $(availableColor).eq(0).hide();
        $('#color').show();
    }
});

//Activities section variables, these variables will be used in the long list of functions below.
var main = $('input[name="all"]');
var jsFrameworks = $('input[name="js-frameworks"]');
var jsLibraries = $('input[name="js-libs"]');
var express = $('input[name="express"]');
var nodeJS = $('input[name="node"]');
var buildTools = $('input[name="build-tools"]');
var npm = $('input[name="npm"]');
var runningTotal = 0;

//Function to update the total cost of the Conference
var updateTotal = function(price) {
    runningTotal += price;
    $('.total').remove();
    $('.activities').after('<div class="total">Total: $' + runningTotal + '</div>');
};

//This glorious set of functions set the running total and disable checkboxes that conflict with an already chosen activity.
//Here's one for the main conference.
main.click(function() {
    if ($(this).prop('checked')) {
        updateTotal(200);
    } else {
        updateTotal(-200);
    }
});
//And one for the JavaScript Frameworks Workshop!
jsFrameworks.click(function() {
    if ($(this).prop('checked')) {
        express.prop('disabled', true);
        updateTotal(100);
    } else {
        express.prop('disabled', false);
        updateTotal(-100);
    }
});
//JavaScript Libraries in the HOUSE!
jsLibraries.click(function() {
    if ($(this).prop('checked')) {
        nodeJS.prop('disabled', true);
        updateTotal(100);
    } else {
        nodeJS.prop('disabled', false);
        updateTotal(-100);
    }
});
//XXXpress!
express.click(function() {
    if ($(this).prop('checked')) {
        jsFrameworks.prop('disabled', true);
        updateTotal(100);
    } else {
        jsFrameworks.prop('disabled', false);
        updateTotal(-100);
    }
});
//Don't forget Node.JS!
nodeJS.click(function() {
    if ($(this).prop('checked')) {
        jsLibraries.prop('disabled', true);
        updateTotal(100);
    } else {
        jsLibraries.prop('disabled', false);
        updateTotal(-100);
    }
});
//Build Tools fool!
buildTools.click(function() {
    if ($(this).prop('checked')) {
        updateTotal(100);
    } else {
        updateTotal(-100);
    }
});
//Last but not least the npm Workshop!
npm.click(function() {
    if ($(this).prop('checked')) {
        updateTotal(100);
    } else {
        updateTotal(-100);
    }
});
//THAT'S A LOT OF FUNCTIONS!

//Shows and hides payment details based on the selected form of payment.
$('#payment').change(function() {
    if ($('#payment').val() === 'credit card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    } else if ($('#payment').val() === 'paypal') {
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    } else if ($('#payment').val() === 'bitcoin') {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }
});

//Form Validation....

var errorMsg = "";
//Regular expressions for Email, Credit Cards, and Zip Codes
var emailField = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var creditCard = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/g;
var zipCode = /^\d{5}(?:[-\s]\d{4})?$/;

//Adding an h2 tag to show the error message if there is an issue with the form.
$('form').prepend('<h2 id="error"></h2>');
$('#error').css('color', 'red');
$('#error').hide();

//Runs validation when submit button is clicked.
$('form').submit(function(event) {
    event.preventDefault();
    //Validating name, email, activities, credit card number, zip code, & ccv (in that order)
    if ($('#name').val() === "") {
        errorMsg = "Please enter your name.";
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    } else if (!emailField.test($('#mail').val())) {
        errorMsg = "Please enter a valid email.";
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    } else if ($('.activities > label > input:checked').length === 0) {
        errorMsg = "Please select at least one activity.";
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    } else if ($('#payment').val() === 'credit card' && !creditCard.test($('#cc-num').val())) {
        errorMsg = "Please enter a valid credit card number.";
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    } else if ($('#payment').val() === "credit card" && !zipCode.test($('#zip').val())) {
        errorMsg = "Please enter your zip code.";
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    } else if ($('#payment').val() === 'credit card' && $('#cvv').val().length != 3) {
        errorMsg = 'Please enter a valid CCV value.';
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    } else {
        errorMsg = '';
    }
    //Displays error message if there were any issues during validation.
    document.getElementById('error').innerHTML = errorMsg;
    $('#error').show();

});
