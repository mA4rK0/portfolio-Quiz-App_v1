const questions = [
  {
    question: "What is the most extensive country in the world?",
    answers: [
      { text: "Japan", correct: false },
      { text: "Australia", correct: false },
      { text: "Laos", correct: false },
      { text: "Russia", correct: true },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Free River", correct: false },
      { text: "Nile River", correct: true },
      { text: "Mahakam River", correct: false },
      { text: "Darling River", correct: false },
    ],
  },
  {
    question: "1 + 1 = ?",
    answers: [
      { text: "5", correct: false },
      { text: "11", correct: false },
      { text: "2", correct: true },
      { text: "4", correct: false },
    ],
  },
  {
    question: "What animals are carnivores?",
    answers: [
      { text: "Lion", correct: true },
      { text: "cow", correct: false },
      { text: "sheep", correct: false },
      { text: "deer", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-btn");
const nextButton = document.querySelector("#next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn", "border", "w-100", "my-2", "text-start");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("btn-success");
    score++;
  } else {
    selectedBtn.classList.add("btn-danger");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("btn-success");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
