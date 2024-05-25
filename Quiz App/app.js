// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGtsxiKbAjBkbNvqZsS-MQmNT03bzahy4",
  authDomain: "quizapp-9c5b4.firebaseapp.com",
  databaseURL: "https://quizapp-9c5b4-default-rtdb.firebaseio.com",
  projectId: "quizapp-9c5b4",
  storageBucket: "quizapp-9c5b4.appspot.com",
  messagingSenderId: "781400749576",
  appId: "1:781400749576:web:fc4287dbe99ffaa0d743bd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

var questions = [
  {
    question: "What does the 'DOM' stand for in web development?",
    option1: "Document Object Model",
    option2: "Data Object Model",
    option3: "Dynamic Object Management",
    corrAnswer: "Document Object Model",
  },
  {
    question: "Which of the following is NOT a valid JavaScript data type?",
    option1: "Boolean",
    option2: "Float",
    option3: "String",
    corrAnswer: "Float",
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    option1: "//",
    option2: "/*",
    option3: "#",
    corrAnswer: "//",
  },
  {
    question: "What does JSON stand for?",
    option1: "JavaScript Object Notation",
    option2: "JavaScript Oriented Notation",
    option3: "JavaScript Ordered Notation",
    corrAnswer: "JavaScript Object Notation",
  },
  {
    question: "Which of the following is NOT a valid HTTP status code?",
    option1: "404",
    option2: "200",
    option3: "3000",
    corrAnswer: "3000",
  },
  {
    question: "What does API stand for?",
    option1: "Application Programming Interface",
    option2: "Advanced Programming Interface",
    option3: "Automated Programming Interface",
    corrAnswer: "Application Programming Interface",
  },
  {
    question: "What is the purpose of the 'box-sizing' property in CSS?",
    option1: "To set the size of an HTML element",
    option2: "To include or exclude an element's padding and border from its total width and height",
    option3: "To define the color of an element's border",
    corrAnswer: "To include or exclude an element's padding and border from its total width and height",
  },
  {
    question: "What is the latest version of HTML as of 2024?",
    option1: "HTML5",
    option2: "HTML6",
    option3: "HTMLX",
    corrAnswer: "HTML5",
  },
  {
    question: "Which of the following is NOT a valid CSS selector?",
    option1: "div > p",
    option2: "p + p",
    option3: "p ~ p",
    corrAnswer: "p ~ p",
  },
  {
    question: "What does the 'src' attribute stand for in HTML <img> tag?",
    option1: "Source",
    option2: "Script",
    option3: "Stylesheet",
    corrAnswer: "Source",
  },
];

var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var btn = document.getElementById("btn");
var timer = document.getElementById("timer");
var index = 0;
var score = 0;
var min = 1;
var sec = 29;

var interval = setInterval(function () {
  timer.innerHTML = `${min}:${sec}`;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 1;
      sec = 59;
      nextQuestion();
    }
  }
}, 1000);

function nextQuestion() {
  var getOptions = document.getElementsByName("option");

  for (var i = 0; i < getOptions.length; i++) {
    if (getOptions[i].checked) {
      var selectedAns = getOptions[i].value;
      var selectedQues = questions[index - 1].question;
      var selectedOpt = questions[index - 1][`option${selectedAns}`];
      var correctAns = questions[index - 1]["corrAnswer"];

      if (selectedOpt == correctAns) {
        score++;
      }
    }

    getOptions[i].checked = false;
  }
  btn.disabled = true;

  if (index >= questions.length) {
    if (score < 5) {
      Swal.fire({
        title: "Better Luck Next Time!",
        text: `You scored ${score} out of ${questions.length}`,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Good job!",
        text: `You scored ${((score / questions.length) * 100).toFixed(2)}%`,
        icon: "success",
      });
    }
    clearInterval(interval);

    // Store the score in Firebase
    const scoresRef = database.ref('scores');
    scoresRef.push({
      score: score,
      timestamp: new Date().toISOString()
    });
  } else {
    ques.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    
    index++;
    min = 1;
    sec = 29;
  }
}

function target() {
  btn.disabled = false;
}

// Initial load
opt1.innerText = questions[index].option1;
opt2.innerText = questions[index].option2;
opt3.innerText = questions[index].option3;


