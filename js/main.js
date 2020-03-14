/* --------------------
    Query Selectors
-----------------------*/

// commented out because moment.js takes care of this!

/* var todaysDate = document.querySelector('#todaysDate');

var c1_submitBtn = document.querySelector('#c1_submitBtn');
var c1_inputField = document.querySelector('#c1_inputField');
var c1_result = document.querySelector("#c1_result");

var c2_inputField = document.querySelector('#c2_inputField');
var c2_submitBtn = document.querySelector('#c2_submitBtn');
var c2_result = document.querySelector('#c2_result'); */

/* --------------------
    Event Listeners
-----------------------*/

c1_submitBtn.addEventListener('click', function() {
    c1_inputField.focus();
    setTheInterval(c1_inputField.value);
});

c1_inputField.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        setTheInterval(c1_inputField.value);
        return;
    } else if (e.keyCode === 27) {
        c1_inputField.value = '';
        return;
    }
});

c2_submitBtn.addEventListener('click', function() {
    c2_inputField.focus();
    var c2_resultValue = moment().add(7, 'days');
});

c2_inputField.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        calcDaysToX(c2_inputField.value);
        return;
    } else if (e.keyCode === 27) {
        c2_inputField.value = '';
        return;
    }
});

c2_submitBtn.addEventListener('click', function() {
    calcDaysToX(c2_inputField.value);
});

c3_submitBtn.addEventListener('click', function() {
    setTheSecondsTimer(c3_inputField.value);
});

c3_inputField.addEventListener('keyup', function(e) {

    if (e.keyCode === 13) {
        setTheSecondsTimer(c3_inputField.value);
    } else if (e.keyCode === 27) {
        c3_inputField.value = '';
    }
});

c3_stopBtn.addEventListener('click', function() {
    stopTheSecondsTimer();
});

/* --------------------
    C3 Functions
-----------------------*/

function setTheSecondsTimer(s) {

    clearInterval(y);

    if (isNaN(s) || (s == '')) {
        c3_result.innerHTML = `Please enter a valid number!`;
        return;
    }

    c3_inputField.value = 'Loading ...';
    c3_inputField.disabled = true;
    c3_submitBtn.classList.toggle('hide');
    c3_stopBtn.classList.toggle('hide');

    y = setInterval(function() {

        if (s <= 0) {
            stopTheSecondsTimer();
            return
        }

        c3_inputField.value = `${s}`;
        s -= 1;

    }, 1000);
}

function stopTheSecondsTimer() {
    c3_inputField.value = ``;
    c3_submitBtn.classList.toggle('hide');
    c3_stopBtn.classList.toggle('hide');
    clearInterval(y);
    c3_inputField.disabled = false;
    c3_inputField.focus();
}

/* --------------------
    C2 Functions
-----------------------*/

function calcDaysToX(days) {

    if (isNaN(days)) {
        c2_result.innerHTML = `Please enter a valid number!`;
        return;
    }

    c2_result.innerHTML = 'Loading...';
    console.log(days);
    var c2_resultVal = moment().add(days, 'days');
    c2_result.innerHTML = `${days} days from now is: ${c2_resultVal}`;
}

/* --------------------
    C1 Functions
-----------------------*/

function setTheInterval(countDownDate) {
    clearInterval(x);

    if (countDownDate === '') {
        c1_result.innerHTML = `Please enter a date in the format: Dec 01, 2019`
        return;
    }

    if (!moment(countDownDate).isValid()) {
        // console.log(false);
        c1_result.innerHTML = `Invalid Date :( Please try again!`
        c1_inputField.focus();
        return;
    }

    // pending - check if year is missing from input

    c1_result.innerHTML = `Loading...`;

    x = setInterval(function() {
        updateTheDate(countDownDate);
    }, 1000);
}

function updateTheDate(countDownDate) {

    // Get today's date and time
    var now = new Date().getTime();
    var countDownDateInTime = new Date(countDownDate).getTime();

    // Find the distance between now and the count down date
    var distance = countDownDateInTime - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="c1_result"

    if (distance < 0) {
        c1_result.innerHTML = `Time since ${countDownDate} is <b> ${Math.abs(days+1)} days </b> ${Math.abs(hours+1)} hours ${Math.abs(minutes+1)} mins ${Math.abs(seconds+1)} seconds`;
    } else {
        c1_result.innerHTML = `Time to ${countDownDate} is <b> ${days} days </b> ${hours} hours ${minutes} mins ${seconds} seconds`;
    }
}

/* --------------------
    INIT
-----------------------*/

c1_inputField.value = '';
c2_inputField.value = '';
c3_inputField.value = '';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

var today = new Date();
var tdate = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
todaysDate.innerHTML = `Today\'s date: ${tdate}`;

// set a default countDownDate which is 1 month away from today
var countDownDate = monthNames[today.getMonth() + 1] + ' ' + today.getDate() + ', ' + today.getFullYear();

var x, y; //global variable x
setTheInterval(countDownDate); // Update the count down every 1 second

calcDaysToX(90);

/* --------------------
    Future Challenges

    1. Check for invalid input
    2. Allow input of day or day+month (automatically assume month is in the future)

-----------------------*/