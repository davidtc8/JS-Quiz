//Object with questions
const quizQuestions = [
    {
        question: 'Which of the following is not a programming language?',
        a: 'TypeScript',
        b: 'Python',
        c: 'Anaconda',
        d: 'Java',
        correct: 'c'
    },
    {
        question: 'WhatsApp concurrent model is implemented using _____ programming language',
        a: 'Java',
        b: 'Node.js',
        c: 'Erlang',
        d: 'C',
        correct: 'c'
    },
    {
        question: 'What does a compiler do?',
        a: 'Translates computer code from machine level to byte code.',
        b: 'Translates computer code from higher-level programming language to machine code.',
        c: 'Translates computer code from lower-level programming language to higher-level programming language.',
        d: 'A compiler does nothing.',
        correct: 'b'
    },
    {
        question: 'Python is _____ programming language.',
        a: 'high-level',
        b: 'mid-level',
        c: 'low-level',
        d: 'none of the above',
        correct: 'a'
    },
    {
        question: 'Which of the following is an apt description for an algorithm?',
        a: 'A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.',
        b: 'Program statements that run to execute a task.',
        c: 'A set of instructions written in a programming language to perform a task.',
        d: 'Set of instructions decoded from a high-level programming code to perform the task.',
        correct: 'a'
    }
]

//Constants
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const question = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const score_name = document.getElementById('score_name')

let currentQuiz = 0;
let score = 0;
let gameOn = true
let for_loop_test = 0;

// LoadQuiz function

if (gameOn === true) {
    loadQuiz();
    gameOn = false
}

function loadQuiz() {
    deselectAnswers()
    const currentQuizDATA = quizQuestions[currentQuiz]
    //Selecting the question inside the object
    for_loop_test += 1;
    console.log(`you have called loadQuiz ${for_loop_test} times`)
    question.innerText = currentQuizDATA.question
    a_text.innerText = currentQuizDATA.a
    b_text.innerText = currentQuizDATA.b
    c_text.innerText = currentQuizDATA.c
    d_text.innerText = currentQuizDATA.d
}

function deselectAnswers() {
    for(let i = 0; i < answerEls.length; i++) {
        answerEls[i].checked = false
    }
}

function getSelected() {
    for (let i = 0; i < answerEls.length; i++) {
        if(answerEls[i].checked) {
            userAnswer = answerEls[i].id
        }
    }
    return userAnswer
}

submitBtn.addEventListener('click', function() {
    const answer = getSelected()
    console.log(answer)
    if(answer) {
        if (answer === quizQuestions[currentQuiz].correct) {
            score += 1
        }
        currentQuiz += 1
        if (currentQuiz < quizQuestions.length) {
            console.log('hiiii')
            loadQuiz()
        } else {
            const score_name_value = submitName();
            console.log(score_name_value)
        }
    }
})

function submitName () {
    quiz.innerHTML = `<h2>You answered ${score}/${quizQuestions.length} questions correctly</h2>
    <h2>Submit Your name</h2>
    <label for="name"></label>
    <form class = 'form'>
        <input type = 'text' id='score_name' placeholder='You can use something like "Dark Lord"' required>
    </form>
    <button onclick ='location.reload()'>
        <a href="score.html">Submit Score</a>
    </button>`
    return score_name.textContent
}

function localStorageItems() {
    localStorage.setItem("score", score);
}

//Timer 
const startingMinutes = 1;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('timer')

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time%60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time <= 0 || time < 1) {
        endTime();
    } else {
        time --;
    }
}

function endTime() {
    countdownEl.innerHTML = 'Time Out!'
}

