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

const vowels = [
  { he: "בָּ", name: "Kamatz", sound: "a", soundText: "a", example: "wie in Vater" },
  { he: "בַּ", name: "Patach", sound: "a", soundText: "a", example: "wie in Mann" },
  { he: "בֵּ", name: "Zere", sound: "e", soundText: "e", example: "wie in See" },
  { he: "בֶּ", name: "Segol", sound: "e", soundText: "e", example: "wie in Bett" },
  { he: "בִּ", name: "Chirik", sound: "i", soundText: "i", example: "wie in Igel" },
  { he: "בֹּ", name: "Cholam", sound: "o", soundText: "o", example: "wie in Ofen" },
  { he: "בּוֹ", name: "Cholam male", sound: "o", soundText: "o", example: "wie in Ofen" },
  { he: "בֻּ", name: "Kubbuz", sound: "u", soundText: "u", example: "kurz, wie in Mutter" },
  { he: "בּוּ", name: "Schuruk", sound: "u", soundText: "u", example: "wie in Kuh" },
  { he: "בְּ", name: "Schwa", sound: "ə", soundText: "ə / kein Vokal", example: "kurzes unbetontes e oder stumm – je nach Position" },
  { he: "בֳּ", name: "Chataf-Kamatz", sound: "o", soundText: "kurzes o", example: "ein reduziertes, kurzes o" },
  { he: "בֲּ", name: "Chataf-Patach", sound: "a", soundText: "kurzes a", example: "ein reduziertes, kurzes a" },
  { he: "בֱּ", name: "Chataf-Segol", sound: "e", soundText: "kurzes e", example: "ein reduziertes, kurzes e" },
];

const marksQuestions = [
  {
    prompt: "בּ",
    question: "Was zeigt der Punkt in diesem Bet?",
    answers: [
      ["Der Laut ist b, wie in Ball.", true],
      ["Der Laut ist v, wie in Vase.", false],
      ["Der Punkt zeigt einen Vokal an.", false],
    ],
  },
  {
    prompt: "ב",
    question: "Wie klingt Bet ohne Dagesch in der üblichen israelischen Aussprache?",
    answers: [
      ["Wie v in Vase.", true],
      ["Wie b in Ball.", false],
      ["Es wird nicht gesprochen.", false],
    ],
  },
  {
    prompt: "לָהּ",
    question: "Was zeigt der Punkt im abschließenden He?",
    answers: [
      ["Mappiq: Das He wird als h gesprochen.", true],
      ["Ein langes a.", false],
      ["Dagesch qal: Das He wird zu b.", false],
    ],
  },
  {
    prompt: "מִלָּה",
    question: "Was kann der Punkt hier markieren?",
    answers: [
      ["Dagesch forte: ein verstärkter oder verdoppelter Konsonant.", true],
      ["Ein zusätzliches i.", false],
      ["Mappiq im abschließenden He.", false],
    ],
  },
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
let currentVowel = null;
let vowelAnswered = false;
let vowelMode = "choice";
let currentMarksQuestion = null;
let marksAnswered = false;

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
  drawVowelLessons();
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
  if (viewId === "vowels") createVowelQuestion();
  if (viewId === "marks") createMarksQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function drawVowelLessons() {
  document.querySelector("#vowel-lessons").innerHTML = vowels.map((vowel) => `
    <article class="lesson-card">
      <div class="lesson-hebrew" lang="he" dir="rtl">${vowel.he}</div>
      <h3>${vowel.name}</h3>
      <div class="vowel-sound">${vowel.soundText}</div>
      <p>${vowel.example}.</p>
    </article>
  `).join("");
}

function createVowelQuestion() {
  currentVowel = vowels[Math.floor(Math.random() * vowels.length)];
  vowelAnswered = false;
  document.querySelector("#vowel-prompt").textContent = currentVowel.he;
  document.querySelector("#vowel-feedback").textContent = vowelMode === "choice"
    ? "Wähle den passenden Grundlaut."
    : "Tippe den Grundlaut ein und bestätige.";
  const answers = document.querySelector("#vowel-answers");
  const form = document.querySelector("#vowel-text-answer");
  const input = document.querySelector("#vowel-input");
  answers.hidden = vowelMode !== "choice";
  form.hidden = vowelMode === "choice";
  input.value = "";
  if (vowelMode === "typed") {
    input.focus();
    return;
  }

  const options = [...new Set([currentVowel.sound, ...vowels.map((vowel) => vowel.sound)])]
    .sort(() => Math.random() - 0.5);
  const selected = [currentVowel.sound, ...options.filter((sound) => sound !== currentVowel.sound).slice(0, 3)]
    .sort(() => Math.random() - 0.5);
  answers.innerHTML = selected.map((sound) =>
    `<button class="answer" data-vowel-sound="${sound}">${sound}</button>`,
  ).join("");
}

function createMarksQuestion() {
  currentMarksQuestion = marksQuestions[Math.floor(Math.random() * marksQuestions.length)];
  marksAnswered = false;
  document.querySelector("#marks-prompt").textContent = currentMarksQuestion.prompt;
  document.querySelector("#marks-kind").textContent = currentMarksQuestion.question;
  document.querySelector("#marks-feedback").textContent = "Wähle die passende Erklärung.";
  const options = [...currentMarksQuestion.answers].sort(() => Math.random() - 0.5);
  document.querySelector("#marks-answers").innerHTML = options.map(([label, correct]) =>
    `<button class="answer" data-correct="${correct}">${label}</button>`,
  ).join("");
}

function recordNonAlphabetCorrect() {
  state.correct += 1;
  updateStreak();
  saveProgress();
  renderProgress();
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
  if (practiceMode === "sound" && (expected === "ʾ" || expected === "ʿ")) {
    accepted.push("stumm", "");
  }
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

document.querySelectorAll("[data-vowel-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    vowelMode = button.dataset.vowelMode;
    document.querySelectorAll("[data-vowel-mode]").forEach((modeButton) => {
      const active = modeButton === button;
      modeButton.classList.toggle("active", active);
      modeButton.setAttribute("aria-pressed", String(active));
    });
    createVowelQuestion();
  });
});

document.querySelector("#next-vowel-question").addEventListener("click", createVowelQuestion);
document.querySelector("#vowel-answers").addEventListener("click", (event) => {
  const answer = event.target.closest(".answer");
  if (!answer || vowelAnswered || !currentVowel) return;
  finishVowelQuestion(answer.dataset.vowelSound === currentVowel.sound, answer);
});

function finishVowelQuestion(isCorrect, selectedButton = null) {
  if (vowelAnswered) return;
  vowelAnswered = true;
  if (selectedButton) {
    document.querySelectorAll("#vowel-answers .answer").forEach((button) => {
      if (button.dataset.vowelSound === currentVowel.sound) button.classList.add("correct");
    });
    if (!isCorrect) selectedButton.classList.add("wrong");
  }

  const explanation = currentVowel.name === "Schwa"
    ? "Beim Schwa hängt es von der Position ab: kurzes unbetontes e oder kein Vokal."
    : `${currentVowel.name} klingt ungefähr wie „${currentVowel.soundText}“ (${currentVowel.example}).`;
  document.querySelector("#vowel-feedback").textContent = isCorrect
    ? `Richtig! ${explanation}`
    : `Noch nicht ganz. ${currentVowel.name}: ${explanation}`;
  if (isCorrect) recordNonAlphabetCorrect();
}

document.querySelector("#vowel-text-answer").addEventListener("submit", (event) => {
  event.preventDefault();
  if (vowelAnswered || !currentVowel) return;
  const value = normalizeAnswer(document.querySelector("#vowel-input").value);
  const expected = currentVowel.sound;
  const accepted = [expected];
  if (currentVowel.name === "Schwa") accepted.push("e", "schwa", "stumm", "kein vokal", "nichts");
  finishVowelQuestion(accepted.some((answer) => normalizeAnswer(answer) === value));
});

document.querySelector("#next-marks-question").addEventListener("click", createMarksQuestion);
document.querySelector("#marks-answers").addEventListener("click", (event) => {
  const answer = event.target.closest(".answer");
  if (!answer || marksAnswered || !currentMarksQuestion) return;
  marksAnswered = true;
  document.querySelectorAll("#marks-answers .answer").forEach((button) => {
    if (button.dataset.correct === "true") button.classList.add("correct");
  });
  const isCorrect = answer.dataset.correct === "true";
  if (!isCorrect) answer.classList.add("wrong");
  document.querySelector("#marks-feedback").textContent = isCorrect
    ? "Richtig!"
    : `Noch nicht ganz. ${currentMarksQuestion.answers.find(([, correct]) => correct)[0]}`;
  if (isCorrect) recordNonAlphabetCorrect();
});

document.querySelector("#today").textContent = new Intl.DateTimeFormat("de-CH", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

render();
