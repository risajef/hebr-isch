const letters = [
  { he: "א", name: "Alef", sound: "ʾ" },
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
  { he: "ע", name: "Ajin", sound: "ʿ" },
  { he: "פ", final: "ף", name: "Pe", sound: "p" },
  { he: "צ", final: "ץ", name: "Tsadi", sound: "ts" },
  { he: "ק", name: "Kof", sound: "k" },
  { he: "ר", name: "Resh", sound: "r" },
  { he: "ש", name: "Schin", sound: "sch" },
  { he: "ת", name: "Taw", sound: "t" },
];

const defaultState = { seen: [], correct: 0, streak: 0, lastDay: "" };
const progressKey = "althebraeisch-progress";
let practiceMode = "choice";

function readProgress() {
  try {
    const saved = localStorage.getItem(progressKey) ?? localStorage.getItem("ivrit-progress");
    return { ...defaultState, ...JSON.parse(saved) };
  } catch {
    return { ...defaultState };
  }
}

let state = readProgress();
let currentQuestion = null;
let questionAnswered = false;

function saveProgress() {
  localStorage.setItem(progressKey, JSON.stringify(state));
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
  const feedback = document.querySelector("#feedback");
  const answers = document.querySelector("#answers");
  const textAnswer = document.querySelector("#text-answer");
  const input = document.querySelector("#answer-input");
  const kind = document.querySelector("#practice-kind");
  feedback.textContent = practiceMode === "choice"
    ? "Wähle die passende Lautangabe."
    : "Gib deine Antwort ein und bestätige mit Enter oder Prüfen.";
  input.value = "";
  answers.hidden = practiceMode !== "choice";
  textAnswer.hidden = practiceMode === "choice";

  if (practiceMode === "sound") {
    kind.textContent = "Wie wird dieser Buchstabe ungefähr gesprochen?";
    input.placeholder = "Laut eingeben …";
    input.setAttribute("aria-label", "Laut eingeben");
  } else if (practiceMode === "name") {
    kind.textContent = "Wie heißt dieser Buchstabe?";
    input.placeholder = "Buchstabennamen eingeben …";
    input.setAttribute("aria-label", "Buchstabennamen eingeben");
  } else {
    kind.textContent = "Welcher Laut gehört zu diesem Buchstaben?";
  }

  if (practiceMode !== "choice") {
    input.focus();
    return;
  }
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

document.querySelectorAll(".mode").forEach((button) => {
  button.addEventListener("click", () => {
    practiceMode = button.dataset.mode;
    document.querySelectorAll(".mode").forEach((modeButton) => {
      const active = modeButton === button;
      modeButton.classList.toggle("active", active);
      modeButton.setAttribute("aria-pressed", String(active));
    });
    createQuestion();
  });
});

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

function normalizeAnswer(value) {
  return value
    .trim()
    .toLocaleLowerCase("de")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘']/g, "ʾ")
    .replace(/\s+/g, " ");
}

function submitTypedAnswer(event) {
  event.preventDefault();
  if (questionAnswered || !currentQuestion) return;

  const expected = practiceMode === "sound" ? currentQuestion.sound : currentQuestion.name;
  const value = normalizeAnswer(document.querySelector("#answer-input").value);
  const accepted = [expected];
  if (expected === "ʾ") accepted.push("ʔ", "alef", "aleph", "glottal");
  if (expected === "ʿ") accepted.push("ajin", "ayin", "pharyngeal");

  const isCorrect = accepted.some((answer) => normalizeAnswer(answer) === value);
  questionAnswered = true;
  document.querySelector("#feedback").textContent = isCorrect
    ? "Richtig! כל הכבוד · Kol hakavod!"
    : `Noch nicht ganz. ${practiceMode === "sound" ? `Der ungefähre Laut ist „${expected}“` : `Der Buchstabe heißt ${expected}`}.`;

  if (isCorrect) {
    state.correct += 1;
    markLetterAsSeen(currentQuestion);
    updateStreak();
    saveProgress();
    renderProgress();
  }
}

document.querySelector("#text-answer").addEventListener("submit", submitTypedAnswer);

document.querySelector("#today").textContent = new Intl.DateTimeFormat("de-CH", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

render();
