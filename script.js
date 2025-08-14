const questions = [
  {
    q: "Which HTML tag is used to define a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<nav>"],
    answer: 0
  },
  {
    q: "Which CSS property controls the text size?",
    options: ["font-weight", "font-size", "text-style", "size"],
    answer: 1
  },
  {
    q: "What does 'const' mean in JavaScript?",
    options: [
      "A variable that cannot be reassigned",
      "A function definition",
      "A block of code that runs once",
      "A type annotation"
    ],
    answer: 0
  },
  {
    q: "Which method converts a JSON string to an object?",
    options: ["JSON.parse()", "JSON.stringify()", "toJSON()", "Object.from()"],
    answer: 0
  },
  {
    q: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let selected = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const resultCard = document.getElementById("result");
const quizCard = document.getElementById("quiz");
const finalMessage = document.getElementById("final-message");
const restartBtn = document.getElementById("restart-btn");

function renderQuestion() {
  selected = null;
  nextBtn.disabled = true;

  const item = questions[current];
  questionEl.textContent = item.q;
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreEl.textContent = `Score: ${score}`;

  optionsEl.innerHTML = "";
  item.options.forEach((text, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = text;
    btn.setAttribute("data-index", idx);
    btn.addEventListener("click", () => choose(idx));
    optionsEl.appendChild(btn);
  });
}

function choose(idx) {
  if (selected !== null) return; // prevent double-clicks
  selected = idx;

  const item = questions[current];
  const buttons = [...document.querySelectorAll(".option")];

  // lock buttons
  buttons.forEach(b => (b.disabled = true));

  // mark correct answer
  buttons.forEach(b => {
    const i = Number(b.getAttribute("data-index"));
    if (i === item.answer) b.classList.add("correct");
  });

  // mark wrong if needed & update score
  if (idx !== item.answer) {
    buttons[idx].classList.add("wrong");
  } else {
    score++;
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
  nextBtn.focus();
}

function next() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizCard.classList.add("is-hidden");
  finalMessage.innerHTML = `You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.`;
  resultCard.classList.remove("is-hidden");
  restartBtn.focus();
}

function restart() {
  current = 0;
  score = 0;
  quizCard.classList.remove("is-hidden");
  resultCard.classList.add("is-hidden");
  renderQuestion();
}

nextBtn.addEventListener("click", next);
restartBtn.addEventListener("click", restart);

// start
renderQuestion();
