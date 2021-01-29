// list of all questions, choices, and answers
var questions = [
    {
        title: "Commonly used data type Do Not include:---",
        choices: ["strings", "booleance", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        title: "The condition in an if/else statement is enclosed within:---",
        choices: ["quotes", "Curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },

    {
        title: "String values must be enclosed within --- when being assigned to variables ",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },

    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:---",
        choices: ["JavaScript", "terminal/bash", "alerts", "console.log"],
        answer: "console.log"
    },
];

// variables to keep track of quiz state
var questionBox = 0;
var time = questions.length * 15;
var interval;

// variables to reference DOM elements
var question = document.querySelector("#questions");
var timer = document.querySelector("#time");
var options = document.querySelector("#choices");
var submit = document.querySelector("#submit");
var start = document.querySelector("#start");
var initial = document.querySelector("#initials");
var showselection = document.querySelector("#showselection");

document.getElementById('clear').addEventListener("click", clear)

function clear() {
    document.getElementsByTagName('li')[0].remove()
    console.log("clear button pressed)")
}

function startQuiz() {
    var startScreen = document.querySelector("#instructions");
    startScreen.setAttribute("class", "hide");

    question.removeAttribute("class");

    interval = setInterval(clockTick, 1000);

    timer.textContent = time;

    getQuestion();
}

function getQuestion() {
    // get current question object from array
    var codeQuestion = questions[questionBox];

    // update title with current question
    var title = document.querySelector("#title");
    title.textContent = codeQuestion.title;

    options.innerHTML = "";

    //loop over choices
    for (var i = 0; i < codeQuestion.choices.length; i++) {
        var choice = codeQuestion.choices[i];
        //create button for each choice
        var selection = document.createElement("button");
        selection.setAttribute("class", "choice");
        selection.setAttribute("value", choice);
        selection.textContent = i + 1 + ". " + choice;
        // attach click event listener
        selection.onclick = questionClick;
        console.log(selection);
        //attach to query selector options
        options.appendChild(selection);
    }
}

function questionClick() {
    if (this.value !== questions[questionBox].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timer.textContent = time;

        showselection.textContent = "Wrong!";
    } else {
        showselection.textContent = "Correct!";
    }

    showselection.setAttribute("class", "showselection");
    setTimeout(function () {
        showselection.setAttribute("class", "showselection hide");
    }, 1000);

    questionBox++;

    if (questionBox === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    clearInterval(interval);

    var endScreen = document.querySelector("#results");
    endScreen.removeAttribute("class");

    var finalScore = document.querySelector("#score");
    finalScore.textContent = time;

    question.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timer.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore(event) {
    event.preventDefault();

    var initials = initial.value.trim();

    var list = document.querySelector('#list');
    list.setAttribute("class", "container");
    var endScreen = document.querySelector("#results");
    endScreen.setAttribute("class", "hide");

    // make sure value wasn't empty
    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials,
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        //listItem creates html element <li></li>
        var listItem = document.createElement("li");

        //textContent puts value inside <li>userscore</li>
        listItem.textContent = newScore.score + " " + newScore.initials;

        //querySelector is looking for <ol> tag
        var ol = document.querySelector('#highscores');
        //appendChild assign <ol> with created element<ol> <li>userscore</li></ol>
        ol.appendChild(listItem);


    }
}

submit.onclick = saveHighscore;

start.onclick = startQuiz;

