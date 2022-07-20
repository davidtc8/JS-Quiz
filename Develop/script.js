//Object with questions
const quizQuestions = [
  {
    question: "Which of the following is not a programming language?",
    a: "TypeScript",
    b: "Python",
    c: "Anaconda",
    d: "Java",
    correct: "c",
  },
  {
    question:
      "WhatsApp concurrent model is implemented using _____ programming language",
    a: "Java",
    b: "Node.js",
    c: "Erlang",
    d: "C",
    correct: "c",
  },
  {
    question: "What does a compiler do?",
    a: "Translates computer code from machine level to byte code.",
    b: "Translates computer code from higher-level programming language to machine code.",
    c: "Translates computer code from lower-level programming language to higher-level programming language.",
    d: "A compiler does nothing.",
    correct: "b",
  },
  {
    question: "Python is _____ programming language.",
    a: "high-level",
    b: "mid-level",
    c: "low-level",
    d: "none of the above",
    correct: "a",
  },
  {
    question: "Which of the following is an apt description for an algorithm?",
    a: "A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.",
    b: "Program statements that run to execute a task.",
    c: "A set of instructions written in a programming language to perform a task.",
    d: "Set of instructions decoded from a high-level programming code to perform the task.",
    correct: "a",
  },
];

//Constants
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const question = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const text = "";
var a = document.createElement("a");
// var link = document.createTextNode('Submit Score')
// a.appendChild(link)
// a.title('Submit Score');
// a.href = 'score.html';


let currentQuiz = 0;
let score = 0;
let gameOn = true;

const my_page =
  "file:///C:/Users/David%20Torres/Documents/Coding%20Bootcamp/Module%20Challenges/Module%204%20Challenge/JS-Quiz/score.html";

if (window.location.href !== my_page) {
  loadQuiz();
  gameOn = false;
} else {
  console.log("you did it!");
}

// ----- LOADQUIZ FUNCTION -----
function loadQuiz() {
  deselectAnswers();
  const currentQuizDATA = quizQuestions[currentQuiz];
  //Selecting the question inside the object
  question.innerText = currentQuizDATA.question;
  a_text.innerText = currentQuizDATA.a;
  b_text.innerText = currentQuizDATA.b;
  c_text.innerText = currentQuizDATA.c;
  d_text.innerText = currentQuizDATA.d;
}

// ----- DESELECT ANSWERS FUNCTION -----
function deselectAnswers() {
  for (let i = 0; i < answerEls.length; i++) {
    answerEls[i].checked = false;
  }
}

// ----- RETURNS THE ANSWER THAT THE USER PUT -----
function getSelected() {
  for (let i = 0; i < answerEls.length; i++) {
    if (answerEls[i].checked) {
      userAnswer = answerEls[i].id;
    }
  }
  return userAnswer;
}

// ----- EVENT LISTENER FOR THE BUTTON -----
submitBtn.addEventListener("click", function () {
  const answer = getSelected();
  console.log('hiii')
  console.log(answer);
  if (window.location.href !== my_page) {
    if (answer) {
      if (answer === quizQuestions[currentQuiz].correct) {
        score += 1;
      }
      currentQuiz += 1;
      if (currentQuiz < quizQuestions.length) {
        loadQuiz();
      } else if (currentQuiz == quizQuestions.length) {
        const score_name_value = submitName();
        console.log(score_name_value);
      }
    } else {
        console.log('hi')
        console.log(score_name_value);
        text = score_name_value.textContent;
        console.log(text);
    }
  }
});

// ----- SUBMIT YOUR SCORE NAME -----
function submitName() {
    quiz.innerHTML = `<h2>You answered ${score}/${quizQuestions.length} questions correctly</h2>
            <h2>Submit Your name</h2>
            <label for="name"></label>
            <form class = 'form'>
                <input type = 'text' id='score_name' placeholder='You can use something like "Dark Lord"' required>
            </form>
            <button id="submit" onclick="localStorageItems()">
                Submit Score
            </button>`;
    const score_name = document.getElementById("score_name");
    const submitBtn2 = document.getElementById("submit");
    return score_name;
}

function localStorageItems() {
    const score_name = document.getElementById("score_name");
    const currentScore = localStorage.getItem('score')
    const newScore = currentScore ? JSON.parse(currentScore) : [];
    newScore.push({
        score:score, 
        name: score_name.value
    })
    localStorage.setItem("score", JSON.stringify(newScore));
    showScore()
}

function showScore() {
    const scores = localStorage.getItem('score');
    const scoreArray = getScoreArray(scores)
    const scoreHtml = scoreArray.map(score => `<li>${score.name}: ${score.score}</li>`).join('')
    quiz.innerHTML = `<h2>Scores!</h2>
        <ul> 
            ${scoreHtml}
        </ul>
        <button id="submit" onclick='window.location.reload();'>
            Restart Quiz 
        </button>`;
}

function getScoreArray(scores) {
    const allScores = JSON.parse(scores)
    console.log(allScores)
    allScores.sort((a, b) => b.score - a.score)
    return allScores.slice(0,3) 
}

// ----- TIMER FUNCTION & VARIABLES -----
const startingMinutes = 1;
let time = startingMinutes * 60;

const countdownEl = document.getElementById("timer");

if (window.location.href !== my_page) {
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (window.location.href !== my_page) {
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time <= 0 || time < 1) {
      endTime();
      submitName();
    } else {
      time--;
    }
  } else {
    console.log("You did it twice!");
  }
}

function endTime() {
  countdownEl.innerHTML = "Time Out!";
}
