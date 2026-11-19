const letters = [
  { he: "א", name: "Alef", sound: "stumm" },
  { he: "ב", name: "Bet", sound: "b" },
  { he: "ג", name: "Gimel", sound: "g" },
  { he: "ד", name: "Dalet", sound: "d" },
  { he: "ה", name: "He", sound: "h" },
  { he: "ו", name: "Waw", sound: "w" },
  { he: "ז", name: "Zajin", sound: "z" },
  { he: "ח", name: "Chet", sound: "ch" },
  { he: "ט", name: "Tet", sound: "t" },
  { he: "י", name: "Jod", sound: "j" },
  { he: "כ", final: "ך", name: "Kaf", sound: "k" },
  { he: "ל", name: "Lamed", sound: "l" },
  { he: "מ", final: "ם", name: "Mem", sound: "m" },
  { he: "נ", final: "ן", name: "Nun", sound: "n" },
  { he: "ס", name: "Samech", sound: "s" },
  { he: "ע", name: "Ajin", sound: "stumm" },
  { he: "פ", final: "ף", name: "Pe", sound: "p" },
  { he: "צ", final: "ץ", name: "Tsadi", sound: "ts" },
  { he: "ק", name: "Kof", sound: "k" },
  { he: "ר", name: "Resh", sound: "r" },
  { he: "ש", name: "Schin", sound: "sch" },
  { he: "ת", name: "Taw", sound: "t" },
];

const defaultState = { seen: [], correct: 0, streak: 0, lastDay: "" };

function readProgress() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem("ivrit-progress")) };
  } catch {
    return { ...defaultState };
  }
}

let state = readProgress();
let currentQuestion = null;
let questionAnswered = false;

function saveProgress() {
  localStorage.setItem("ivrit-progress", JSON.stringify(state));
}

function createLetterCard(letter) {
  const finalForm = letter.final ? ` · Schlussform ${letter.final}` : "";

  return `
    <button class="letter" data-letter="${letter.he}" title="${letter.name}${finalForm}">
      <div class="he">${letter.he}</div>
      <div class="trans">${letter.sound}</div>
      <div class="name">${letter.name}</div>
    </button>
  `;
}

function drawAlphabet() {
  const finalOnly = document.querySelector("#alphabet-filter").value === "final";
  const alphabet = finalOnly ? letters.filter((letter) => letter.final) : letters;

  document.querySelector("#all-letters").innerHTML = alphabet.map(createLetterCard).join("");
}

function renderProgress() {
  document.querySelector("#learned").textContent = state.seen.length;
  document.querySelector("#correct-count").textContent = state.correct;
  document.querySelector("#progress").style.width = `${(state.seen.length / 22) * 100}%`;
  document.querySelector("#streak").textContent = state.streak;
}

function render() {
  document.querySelector("#preview-letters").innerHTML = letters
    .slice(0, 7)
    .map(createLetterCard)
    .join("");
  drawAlphabet();
  renderProgress();
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });

  if (viewId === "practice") createQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createQuestion() {
  currentQuestion = letters[Math.floor(Math.random() * letters.length)];
  questionAnswered = false;
  document.querySelector("#prompt").textContent = currentQuestion.he;
  document.querySelector("#feedback").textContent = "Wähle die passende Umschrift.";

  const options = new Map([[currentQuestion.sound, currentQuestion]]);
  while (options.size < 4) {
    const candidate = letters[Math.floor(Math.random() * letters.length)];
    if (!options.has(candidate.sound)) options.set(candidate.sound, candidate);
  }

  const shuffledOptions = [...options.keys()].sort(() => Math.random() - 0.5);
  document.querySelector("#answers").innerHTML = shuffledOptions
    .map((sound) => `<button class="answer" data-sound="${sound}">${sound}</button>`)
    .join("");
}

function markLetterAsSeen(letter) {
  state.seen = [...new Set([...state.seen, letter.he])];
  saveProgress();
  renderProgress();
}

function updateStreak() {
  const today = new Date().toLocaleDateString("sv-SE");
  if (state.lastDay === today) return;

  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("sv-SE");
  state.streak = state.lastDay === yesterday ? state.streak + 1 : 1;
  state.lastDay = today;
}

document.querySelectorAll(".nav").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.go));
});

document.querySelector("#alphabet-filter").addEventListener("change", drawAlphabet);
document.querySelector("#new-question").addEventListener("click", createQuestion);

document.addEventListener("click", (event) => {
  const card = event.target.closest(".letter");
  if (!card) return;

  const letter = letters.find((item) => item.he === card.dataset.letter);
  if (!letter) return;

  markLetterAsSeen(letter);
  const feedback = document.querySelector("#feedback");
  feedback.textContent = `${letter.name} wird ungefähr „${letter.sound}“ ausgesprochen.`;
});

document.querySelector("#answers").addEventListener("click", (event) => {
  const answer = event.target.closest(".answer");
  if (!answer || questionAnswered || !currentQuestion) return;

  questionAnswered = true;
  const isCorrect = answer.dataset.sound === currentQuestion.sound;

  document.querySelectorAll(".answer").forEach((option) => {
    if (option.dataset.sound === currentQuestion.sound) option.classList.add("correct");
  });
  if (!isCorrect) answer.classList.add("wrong");

  document.querySelector("#feedback").textContent = isCorrect
    ? "Richtig! כל הכבוד · Kol hakavod!"
    : `Noch nicht ganz. ${currentQuestion.name} klingt wie „${currentQuestion.sound}“.`;

  if (isCorrect) {
    state.correct += 1;
    markLetterAsSeen(currentQuestion);
    updateStreak();
    saveProgress();
    renderProgress();
  }
});

document.querySelector("#today").textContent = new Intl.DateTimeFormat("de-CH", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

render();
