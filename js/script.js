document.getElementById("start-btn").addEventListener("click", () => {
  try {
    document.getElementById("welcome-screen").style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("timer-box").style.display = "block";
    startQuiz();
  } catch (error) {
    console.error("Error starting quiz:", error);
    document.getElementById("question").textContent = "Error loading quiz. Please try again.";
  }
});
const questions = [
  {
    question: "What does the HTML `<canvas>` element do?",
    options: ["Embeds a video", "Creates a drawing surface", "Defines a form", "Displays an image gallery"],
    answer: 1
  },
  {
    question: "Which CSS property controls the spacing between elements in a flex container?",
    options: ["margin", "padding", "gap", "space-between"],
    answer: 2
  },
  {
    question: "In JavaScript, which method removes the last element from an array?",
    options: ["shift()", "pop()", "splice()", "unshift()"],
    answer: 1
  },
  {
    question: "Which HTML attribute improves accessibility by labeling form elements?",
    options: ["id", "class", "for", "name"],
    answer: 2
  },
  {
    question: "What is the purpose of the CSS `box-sizing: border-box` property?",
    options: ["Adds a border", "Includes padding and border in element's width", "Resizes the box", "Centers the element"],
    answer: 1
  },
  {
    question: "Which JavaScript event is triggered when a user clicks an element?",
    options: ["onhover", "onclick", "onchange", "onfocus"],
    answer: 1
  },
  {
    question: "Which HTML element is used to define semantic content for articles?",
    options: ["<section>", "<div>", "<article>", "<content>"],
    answer: 2
  },
  {
    question: "In CSS, how do you select all elements with a specific class?",
    options: ["#classname", ".classname", "*classname", "classname"],
    answer: 1
  },
  {
    question: "What does the JavaScript `querySelector()` method return?",
    options: ["All matching elements", "The first matching element", "An array of elements", "A string"],
    answer: 1
  },
  {
    question: "Which CSS property is used to create a responsive grid layout?",
    options: ["flex", "grid-template", "float", "display: block"],
    answer: 1
  },
  {
    question: "What is the purpose of the HTML `<meta>` tag with `viewport` content?",
    options: ["Sets the page title", "Controls responsive scaling", "Links to CSS", "Defines character encoding"],
    answer: 1
  },
  {
    question: "Which JavaScript method converts a string to an integer?",
    options: ["parseFloat()", "toString()", "parseInt()", "Number.toFixed()"],
    answer: 2
  },
  {
    question: "Which CSS pseudo-class targets an element when a user hovers over it?",
    options: [":active", ":focus", ":hover", ":visited"],
    answer: 2
  },
  {
    question: "In HTML, which attribute specifies an alternate text for an image?",
    options: ["src", "alt", "title", "href"],
    answer: 1
  },
  {
    question: "Which JavaScript keyword is used to create a constant variable?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "What is the CSS `position: fixed` property used for?",
    options: ["Positions relative to parent", "Removes element from flow", "Sticks element to viewport", "Aligns element to center"],
    answer: 2
  },
  {
    question: "Which HTML element is used to embed JavaScript code?",
    options: ["<script>", "<js>", "<code>", "<javascript>"],
    answer: 0
  },
  {
    question: "In CSS, which unit is relative to the viewport's width?",
    options: ["rem", "vw", "em", "px"],
    answer: 1
  },
  {
    question: "Which JavaScript method adds an element to the beginning of an array?",
    options: ["push()", "unshift()", "splice()", "concat()"],
    answer: 1
  },
  {
    question: "What is the purpose of the HTML `<header>` element?",
    options: ["Defines a footer", "Contains navigation or introductory content", "Embeds media", "Creates a form"],
    answer: 1
  },
  {
    question: "Which CSS property is used to create a shadow effect around an element?",
    options: ["text-shadow", "box-shadow", "shadow", "outline"],
    answer: 1
  },
  {
    question: "Which JavaScript framework is known for its virtual DOM?",
    options: ["Angular", "Vue", "React", "Svelte"],
    answer: 2
  },
  {
    question: "What does the CSS `display: none` property do?",
    options: ["Hides an element", "Makes an element transparent", "Displays as block", "Aligns element inline"],
    answer: 0
  },
  {
    question: "Which HTML attribute is used to make a form input required?",
    options: ["mandatory", "required", "validate", "must"],
    answer: 1
  },
  {
    question: "In JavaScript, which operator checks for both value and type equality?",
    options: ["==", "===", "!=", "!=="],
    answer: 1
  }
];

let currentQuestion =  0;
let score = 0;
let timer;
let timeLeft = 30;
let shuffledQuestions = [];

const questionEl = document.getElementById("question") || document.createElement("div");
const optionsEl = document.getElementById("options") || document.createElement("div");
const resultEl = document.getElementById("result") || document.createElement("div");
const progressBar = document.getElementById("progress-bar") || document.createElement("div");
const progressText = document.getElementById("progress-text") || document.createElement("div");
const timerEl = document.getElementById("timer") || document.createElement("span");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  shuffledQuestions = shuffleArray([...questions]);
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimer();
  timer = setInterval(updateTimer, 1000);

  const q = shuffledQuestions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(idx, btn);
    optionsEl.appendChild(btn);
  });

  const percent = Math.round((currentQuestion / shuffledQuestions.length) * 100);
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${percent}%`;
}

function checkAnswer(selectedIdx, btn) {
  clearInterval(timer);
  const correctIdx = shuffledQuestions[currentQuestion].answer;
  const optionButtons = document.querySelectorAll(".option");

  optionButtons.forEach((button, idx) => {
    if (idx === correctIdx) button.classList.add("correct");
    else if (idx === selectedIdx) button.classList.add("incorrect");
    button.disabled = true;
  });

  if (selectedIdx === correctIdx) {
    score += 2;
    resultEl.textContent = "Correct!";
  } else {
    resultEl.textContent = `Incorrect! The answer was: ${shuffledQuestions[currentQuestion].options[correctIdx]}`;
  }

  setTimeout(() => {
    resultEl.textContent = "";
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
}

function updateTimer() {
  timerEl.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    document.querySelectorAll(".option").forEach(btn => btn.disabled = true);
    checkAnswer(-1, null);
  }
  timeLeft--;
}

function endQuiz() {
  clearInterval(timer);
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  resultEl.innerHTML = `
    <div class="end-screen-content">
      <p class="end-screen-text">Total Marks: ${score} / 50</p>
      <p class="end-screen-text">Percentage: ${Math.round((score / 50) * 100)}%</p>
      <button id="restart-btn">Restart Quiz</button>
    </div>
  `;
  progressBar.style.width = `100%`;
  progressText.textContent = `100%`;
  document.getElementById("restart-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to restart the quiz?")) {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("timer-box").style.display = "none";
      document.querySelector("header").style.display = "none";
      document.getElementById("welcome-screen").style.display = "block";
    }
  });
}