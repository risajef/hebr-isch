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

const alphabetPracticeCards = [
  ...letters.map((letter) => ({ ...letter, id: letter.he, baseHe: letter.he, isFinal: false })),
  ...letters.filter((letter) => letter.final).map((letter) => ({
    ...letter,
    id: `final-${letter.he}`,
    he: letter.final,
    baseHe: letter.he,
    isFinal: true,
  })),
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
  ["bet-hard", "בּ", "b", "b wie in Ball", "bet", 0], ["bet-soft", "ב", "v", "v wie in Vase", "bet", 0],
  ["gimel-hard", "גּ", "g", "g wie in gut", "gimel", 0], ["gimel-soft", "ג", "gh", "gh, ein stimmhaftes Reibeg", "gimel", 0],
  ["dalet-hard", "דּ", "d", "d wie in Dach", "dalet", 0], ["dalet-soft", "ד", "dh", "dh wie englisch this", "dalet", 0],
  ["kaf-hard", "כּ", "k", "k wie in Kamm", "kaf", 0], ["kaf-soft", "כ", "ch", "ch wie in Bach", "kaf", 0],
  ["pe-hard", "פּ", "p", "p wie in Paar", "pe", 0], ["pe-soft", "פ", "f", "f wie in Fass", "pe", 0],
  ["taw-hard", "תּ", "t", "t wie in Tag", "taw", 0], ["taw-soft", "ת", "th", "th wie englisch thin", "taw", 0],
  ["shin", "שׁ", "sch", "sch wie in Schule", "shin", 0], ["sin", "שׂ", "s", "s wie in Sonne", "shin", 0],
  ["mappiq", "לָהּ", "h", "h wird mitgesprochen (Mappiq)", "mappiq", 1], ["final-he", "לָה", "", "kein h; He ist hier stummer Vokalträger", "mappiq", 1],
  ["forte", "מִלָּה", "ll", "l wird durch Dagesch forte verdoppelt", "forte", 1],
].map(([id, prompt, sound, explanation, contrast, focusIndex]) => ({ id, prompt, sound, explanation, contrast, focusIndex }));

const readingWords = [
  { he: "שָׁלוֹם", answer: "schalom", alternatives: ["shalom"], hint: "Frieden", tip: "וֹ ist hier Cholam male und klingt wie o, nicht wie w." },
  { he: "בָּרָא", answer: "bara", hint: "er schuf" },
  { he: "מֶלֶךְ", answer: "melekh", alternatives: ["melech"], hint: "König" },
  { he: "בָּבֶל", answer: "bavel", hint: "Babel" },
  { he: "רוּחַ", answer: "ruach", alternatives: ["ruakh"], hint: "Wind, Atem, Geist", tip: "וּ ist Schuruk und klingt wie u; hier kommt kein w dazu." },
  { he: "שָׂרָה", answer: "sara", hint: "Sara" },
  { he: "פָּרָה", answer: "para", hint: "Kuh" },
  { he: "תּוֹרָה", answer: "tora", hint: "Weisung / Tora" },
  { he: "מִלָּה", answer: "milla", alternatives: ["mil-la"], hint: "Wort" },
  { he: "לָהּ", answer: "lah", alternatives: ["la-h"], hint: "zu ihr (mit Mappiq)" },
  { he: "אֱלֹהִים", answer: "elohim", alternatives: ["ʾelohim"], hint: "Gott", tip: "י trägt hier den i-Vokal und wird nicht zusätzlich als j gesprochen." },
  { he: "בְּרֵאשִׁית", answer: "bereschit", alternatives: ["bereshit"], hint: "im Anfang" },
  { he: "הָאָרֶץ", answer: "ha'aretz", alternatives: ["haaretz", "ha-aretz"], hint: "die Erde" },
  { he: "דָּבָר", answer: "davar", hint: "Wort / Sache" },
  { he: "כֶּסֶף", answer: "kesef", hint: "Silber / Geld" },
  { he: "מַיִם", answer: "majim", alternatives: ["mayim"], hint: "Wasser" },
  { he: "אֹהֶל", answer: "ohel", alternatives: ["ohel"], hint: "Zelt" },
  { he: "קֻמִי", answer: "kumi", hint: "steh auf!", tip: "Das abschließende י gehört hier zum langen i; es kommt kein zusätzliches j dazu." },
  { he: "אֲדֹנָי", answer: "adhonai", alternatives: ["adhonay"], hint: "Herr" },
  { he: "אֳנִיָּה", answer: "oniyya", alternatives: ["onijja"], hint: "Schiff" },
  { he: "דָּג", answer: "dagh", hint: "Fisch" },
  { he: "מִדְבָּר", answer: "midhbar", hint: "Wüste" },
  { he: "בַּת", answer: "bath", hint: "Tochter" },
  { he: "כָּתוּב", answer: "kathuv", hint: "geschrieben" },
];

const PRACTICE_GOAL = 5;
const defaultState = {
  seen: [],
  correct: 0,
  streak: 0,
  lastDay: "",
  completedLessons: [],
  practiceCorrect: { alphabet: 0, vowels: 0, marks: 0, reading: 0, vocabulary: 0, grammar: 0, verses: 0 },
  readingSeen: [],
  verseSeen: [],
  leitner: { alphabet: {}, marks: {}, vocabulary: {}, grammar: {} },
};
const progressKey = "althebraeisch-progress";
let practiceMode = "choice";

function readProgress() {
  try {
    const saved = localStorage.getItem(progressKey) ?? localStorage.getItem("ivrit-progress");
    const stored = JSON.parse(saved) || {};
    return {
      ...defaultState,
      ...stored,
      completedLessons: Array.isArray(stored.completedLessons) ? stored.completedLessons : [],
      readingSeen: Array.isArray(stored.readingSeen) ? stored.readingSeen : [],
      verseSeen: Array.isArray(stored.verseSeen) ? stored.verseSeen : [],
      practiceCorrect: { ...defaultState.practiceCorrect, ...stored.practiceCorrect },
      leitner: {
        alphabet: { ...(stored.leitner?.alphabet || {}) },
        marks: { ...(stored.leitner?.marks || {}) },
        vocabulary: { ...(stored.leitner?.vocabulary || {}) },
        grammar: { ...(stored.leitner?.grammar || {}) },
      },
    };
  } catch {
    return {
      ...defaultState,
      completedLessons: [],
      practiceCorrect: { ...defaultState.practiceCorrect },
      readingSeen: [],
      verseSeen: [],
      leitner: { alphabet: {}, marks: {}, vocabulary: {}, grammar: {} },
    };
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
let currentReadingWord = null;
let readingAnswered = false;
let vocabularyMode = "choice";
let currentVocabularyWord = null;
let vocabularyAnswered = false;
let currentGrammarQuestion = null;
let grammarAnswered = false;
let currentVerseExercise = null;
let verseAnswered = false;
const practiceSessions = { alphabet: null, marks: null, vocabulary: null, grammar: null };
let autoAdvanceTimer = null;

function clearAutoAdvance() {
  if (autoAdvanceTimer !== null) window.clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer = null;
}

function scheduleAutoAdvance(viewId, showNextQuestion, delay = 900) {
  clearAutoAdvance();
  autoAdvanceTimer = window.setTimeout(() => {
    autoAdvanceTimer = null;
    if (document.querySelector(".view.active")?.id === viewId) showNextQuestion();
  }, delay);
}

function saveProgress() {
  localStorage.setItem(progressKey, JSON.stringify(state));
}

function createLetterCard(letter) {
  const finalForm = letter.final ? ` · Schlussform ${letter.final}` : "";
  const forms = letter.final
    ? `<span class="he">${letter.he}</span><span class="form-arrow" aria-hidden="true">→</span><span class="he final-he">${letter.final}</span>`
    : `<span class="he">${letter.he}</span>`;
  return `
    <button class="letter" data-letter="${letter.he}" title="${letter.name}${finalForm}">
      <div class="letter-forms" dir="ltr">${forms}</div>
      <div class="trans">${letter.sound}</div>
      <div class="name">${letter.name}${finalForm}</div>
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
  document.querySelector("#streak").textContent = state.streak;
  updateLearningPath();
}

function lessonComplete(stage) {
  return state.completedLessons.includes(stage);
}

function practiceComplete(stage) {
  const goal = stage === "verses" ? verseExercises.length : stage === "reading" ? 8 : PRACTICE_GOAL;
  if (state.practiceCorrect[stage] < goal) return false;
  if (stage === "alphabet") return alphabetPracticeCards.every(({ id }) => state.leitner.alphabet[id]?.attempts > 0);
  if (stage === "marks") return marksQuestions.every(({ id }) => state.leitner.marks[id]?.attempts > 0);
  if (stage === "vocabulary") return vocabulary.every(({ id }) => state.leitner.vocabulary[id]?.attempts > 0);
  if (stage === "grammar") return grammarQuestions.every(({ id }) => state.leitner.grammar[id]?.attempts > 0);
  if (stage === "verses") return verseExercises.every(({ id }) => state.verseSeen.includes(id));
  return true;
}

function practiceCoverage(stage) {
  if (stage === "alphabet") {
    return alphabetPracticeCards.filter(({ id }) => state.leitner.alphabet[id]?.attempts > 0).length / alphabetPracticeCards.length;
  }
  if (stage === "marks") {
    return marksQuestions.filter(({ id }) => state.leitner.marks[id]?.attempts > 0).length / marksQuestions.length;
  }
  if (stage === "vocabulary") {
    return vocabulary.filter(({ id }) => state.leitner.vocabulary[id]?.attempts > 0).length / vocabulary.length;
  }
  if (stage === "grammar") {
    return grammarQuestions.filter(({ id }) => state.leitner.grammar[id]?.attempts > 0).length / grammarQuestions.length;
  }
  if (stage === "verses") return state.verseSeen.length / verseExercises.length;
  return Math.min(1, state.practiceCorrect[stage] / PRACTICE_GOAL);
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

function createPracticeRound(stage, cards, getId) {
  const cardIds = cards.map(getId);
  const dueIds = cards
    .filter((card) => {
      const progress = state.leitner[stage][getId(card)];
      return progress?.attempts > 0 && progress.box <= 1;
    })
    .sort((first, second) => (state.leitner[stage][getId(first)].box - state.leitner[stage][getId(second)].box)
      || ((state.leitner[stage][getId(second)].wrong || 0) - (state.leitner[stage][getId(first)].wrong || 0)))
    .map(getId);
  practiceSessions[stage] = {
    queue: [...shuffle(cardIds), ...shuffle(dueIds)],
    cursor: 0,
    seen: new Set(),
    total: cardIds.length,
  };
}

function nextPracticeCard(stage, cards, getId) {
  let session = practiceSessions[stage];
  if (!session || session.cursor >= session.queue.length) {
    createPracticeRound(stage, cards, getId);
    session = practiceSessions[stage];
  }
  const cardId = session.queue[session.cursor];
  session.cursor += 1;
  session.seen.add(cardId);
  updatePracticeRoundCount(stage);
  return cards.find((card) => getId(card) === cardId);
}

function updatePracticeRoundCount(stage) {
  const session = practiceSessions[stage];
  if (!session) return;
  const field = document.querySelector(`#${stage}-round-count`);
  if (!field) return;
  const unit = stage === "alphabet" ? "Buchstabenformen"
    : stage === "vocabulary" ? "Wörter"
      : stage === "grammar" ? "Regeln" : "Zeichen";
  const uncertain = Object.values(state.leitner[stage]).filter((progress) => progress.attempts > 0 && progress.box <= 1).length;
  field.textContent = `${session.seen.size} / ${session.total} ${unit} in dieser Runde · ${uncertain} unsicher`;
}

function splitHebrewGraphemes(text) {
  const graphemes = [];
  for (const character of text) {
    const codePoint = character.codePointAt(0);
    if (codePoint >= 0x0591 && codePoint <= 0x05c7 && graphemes.length) {
      graphemes[graphemes.length - 1] += character;
    } else {
      graphemes.push(character);
    }
  }
  return graphemes;
}

function renderFocusedHebrew(question) {
  return splitHebrewGraphemes(question.prompt).map((grapheme, index) =>
    index === question.focusIndex ? `<span class="prompt-focus">${grapheme}</span>` : grapheme,
  ).join("");
}

function recordPracticeReview(stage, cardId, isCorrect) {
  const records = state.leitner[stage];
  const progress = records[cardId] || { box: 0, attempts: 0, correct: 0, wrong: 0 };
  progress.attempts += 1;
  if (isCorrect) {
    progress.correct += 1;
    progress.box = Math.min(5, progress.box + 1);
  } else {
    progress.wrong += 1;
    progress.box = 0;
    const session = practiceSessions[stage];
    if (session) {
      const returnAt = Math.min(session.cursor + 2, session.queue.length);
      session.queue.splice(returnAt, 0, cardId);
    }
  }
  records[cardId] = progress;
  saveProgress();
  updatePracticeRoundCount(stage);
  return progress;
}

function updateLearningPath() {
  const stages = [
    { key: "letters", lesson: "alphabet", practice: "alphabet", lessonView: "alphabet", practiceView: "alphabet-practice", title: "Alphabet", description: "Lerne die 22 Buchstaben, ihre Namen und die fünf Schlussformen.", lessonAction: "Alphabet ansehen", practiceAction: "Alphabet üben", viewPrefix: "alphabet" },
    { key: "vowels", lesson: "vowels", practice: "vowels", lessonView: "vowels", practiceView: "vowel-practice", title: "Vokale", description: "Lerne die Nikud-Zeichen und übe ihre Laute.", lessonAction: "Vokale ansehen", practiceAction: "Vokale üben", viewPrefix: "vowel" },
    { key: "marks", lesson: "marks", practice: "marks", lessonView: "marks", practiceView: "marks-practice", title: "Dagesch & Mappiq", description: "Lerne, wie Punkte die Aussprache von Konsonanten verändern.", lessonAction: "Dagesch & Mappiq ansehen", practiceAction: "Dagesch & Mappiq üben", viewPrefix: "marks" },
    { key: "vocabulary", lesson: "vocabulary", practice: "vocabulary", lessonView: "vocabulary", practiceView: "vocabulary-practice", title: "Grundwortschatz", description: "Lerne häufige Wörter und ihre Formen.", lessonAction: "Wörter ansehen", practiceAction: "Wörter üben", viewPrefix: "vocabulary" },
    { key: "grammar", lesson: "grammar", practice: "grammar", lessonView: "grammar", practiceView: "grammar-practice", title: "Grammatik", description: "Lerne fünf Grundmuster und wende sie an.", lessonAction: "Grammatik ansehen", practiceAction: "Grammatik üben", viewPrefix: "grammar" },
  ];
  const stageSteps = (stage) => [
    { view: stage.lessonView, title: `Lerne ${stage.title}`, description: stage.description, complete: lessonComplete(stage.lesson), action: stage.lessonAction },
    { view: stage.practiceView, title: `Übe ${stage.title}`, description: stage.practice === "vocabulary" ? `${vocabulary.length} Wörter, ${state.practiceCorrect.vocabulary} richtige Antworten.` : stage.practice === "grammar" ? `${grammarRules.length} Regeln, ${state.practiceCorrect.grammar} richtige Antworten.` : `${state.practiceCorrect[stage.practice]} von ${PRACTICE_GOAL} richtigen Antworten bis zum Etappenziel.`, complete: practiceComplete(stage.practice), action: stage.practiceAction },
  ];
  const steps = [
    ...stages.slice(0, 3).flatMap(stageSteps),
    { view: "reading-rules", title: "Lerne die Leseregeln", description: "Erkenne Vokalbuchstaben und Sonderfälle im Wort.", complete: lessonComplete("reading-rules"), action: "Leseregeln ansehen" },
    { view: "reading-practice", title: "Lies biblische Wörter", description: `${state.practiceCorrect.reading || 0} von 8 Wörtern richtig transkribiert.`, complete: (state.practiceCorrect.reading || 0) >= 8, action: "Leseübungen starten" },
    ...stages.slice(3).flatMap(stageSteps),
    { view: "verse-practice", title: "Übersetze Bibelverse", description: `${state.verseSeen.length} von ${verseExercises.length} Abschnitten bearbeitet.`, complete: practiceComplete("verses"), action: "Verse übersetzen" },
  ];
  const nextStep = steps.find((step) => !step.complete);
  const completeCount = steps.filter((step) => step.complete).length;
  document.querySelector("#learning-steps").textContent = completeCount;
  document.querySelector("#progress").style.width = `${(completeCount / steps.length) * 100}%`;

  const continueButton = document.querySelector("#continue-learning");
  const continueTitle = document.querySelector("#continue-title");
  const continueDescription = document.querySelector("#continue-description");
  const continueKicker = document.querySelector("#continue-kicker");
  if (nextStep) {
    continueButton.dataset.go = nextStep.view;
    continueButton.textContent = `${nextStep.action} →`;
    continueTitle.textContent = nextStep.title;
    continueDescription.textContent = nextStep.description;
    continueKicker.textContent = `DEIN NÄCHSTER SCHRITT · ${completeCount + 1} VON ${steps.length}`;
  } else {
    continueButton.dataset.go = "home";
    continueButton.textContent = "Lernpfad ansehen →";
    continueTitle.textContent = "Du hast den Lernpfad geschafft!";
    continueDescription.textContent = "Wiederhole Wörter und Regeln oder übersetze weitere Bibelverse.";
    continueKicker.textContent = "ALLE ETAPPEN ABGESCHLOSSEN";
  }

  stages.forEach((stage, index) => {
    const lessonsDone = lessonComplete(stage.lesson);
    const practiceCount = Math.min(state.practiceCorrect[stage.practice], PRACTICE_GOAL);
    const done = lessonsDone && practiceComplete(stage.practice);
    const progress = (Number(lessonsDone) * 0.5 + practiceCoverage(stage.practice) * 0.5) * 100;
    document.querySelector(`#${stage.key}-progress`).style.width = `${progress}%`;
    document.querySelector(`#${stage.key}-status`).textContent = done
      ? "Abgeschlossen"
      : nextStep?.view.startsWith(stage.viewPrefix)
        ? "Jetzt dran"
        : index === 0 ? "Start" : "Danach";
    document.querySelector(`[data-path="${stage.key}"]`).classList.toggle("complete", done);
    document.querySelector(`[data-path="${stage.key}"]`).classList.toggle("active", !done && nextStep?.view.startsWith(stage.viewPrefix));
  });

  const readingRulesDone = lessonComplete("reading-rules");
  document.querySelector("#reading-rules-progress").style.width = `${Number(readingRulesDone) * 100}%`;
  document.querySelector("#reading-rules-status").textContent = readingRulesDone
    ? "Abgeschlossen"
    : nextStep?.view === "reading-rules" ? "Jetzt dran" : "Danach";
  document.querySelector('[data-path="reading-rules"]').classList.toggle("complete", readingRulesDone);
  document.querySelector('[data-path="reading-rules"]').classList.toggle("active", !readingRulesDone && nextStep?.view === "reading-rules");

  const readingDone = (state.practiceCorrect.reading || 0) >= 8;
  document.querySelector("#reading-progress").style.width = `${Math.min(100, ((state.practiceCorrect.reading || 0) / 8) * 100)}%`;
  document.querySelector("#reading-status").textContent = readingDone ? "Abgeschlossen" : nextStep?.view === "reading-practice" ? "Jetzt dran" : "Danach";
  document.querySelector('[data-path="reading"]').classList.toggle("complete", readingDone);
  document.querySelector('[data-path="reading"]').classList.toggle("active", !readingDone && nextStep?.view === "reading-practice");

  const verseDone = practiceComplete("verses");
  document.querySelector("#verses-progress").style.width = `${practiceCoverage("verses") * 100}%`;
  document.querySelector("#verses-status").textContent = verseDone ? "Abgeschlossen" : nextStep?.view === "verse-practice" ? "Jetzt dran" : "Zum Abschluss";
  document.querySelector('[data-path="verses"]').classList.toggle("complete", verseDone);
  document.querySelector('[data-path="verses"]').classList.toggle("active", !verseDone && nextStep?.view === "verse-practice");

  document.querySelector("#alphabet-practice-count").textContent = `${state.practiceCorrect.alphabet} / ${PRACTICE_GOAL} richtige Antworten`;
  document.querySelector("#vowel-practice-count").textContent = `${state.practiceCorrect.vowels} / ${PRACTICE_GOAL} richtige Antworten`;
  document.querySelector("#marks-practice-count").textContent = `${state.practiceCorrect.marks} / ${PRACTICE_GOAL} richtige Antworten`;
  document.querySelector("#reading-practice-count").textContent = `${state.practiceCorrect.reading || 0} / 8 Wörter richtig`;
  document.querySelector("#vocabulary-practice-count").textContent = `${state.practiceCorrect.vocabulary} / ${PRACTICE_GOAL} richtige Antworten`;
  document.querySelector("#grammar-practice-count").textContent = `${state.practiceCorrect.grammar} / ${PRACTICE_GOAL} richtige Antworten`;
  document.querySelector("#verse-practice-count").textContent = `${state.verseSeen.length} / ${verseExercises.length} Abschnitte bearbeitet`;
  document.querySelector("#alphabet-completion").hidden = !practiceComplete("alphabet");
  document.querySelector("#vowel-completion").hidden = !practiceComplete("vowels");
  document.querySelector("#marks-completion").hidden = !practiceComplete("marks");
  document.querySelector("#vocabulary-completion").hidden = !practiceComplete("vocabulary");
  document.querySelector("#grammar-completion").hidden = !practiceComplete("grammar");
  document.querySelector("#verse-completion").hidden = !verseDone;
  document.querySelector("#reading-completion").hidden = (state.practiceCorrect.reading || 0) < 8;
}

function completeLesson(stage) {
  if (!lessonComplete(stage)) state.completedLessons.push(stage);
  saveProgress();
  renderProgress();
}

function recordCorrectPractice(stage, letter = null) {
  state.correct += 1;
  state.practiceCorrect[stage] = Math.min(PRACTICE_GOAL, state.practiceCorrect[stage] + 1);
  if (letter) state.seen = [...new Set([...state.seen, letter.baseHe || letter.he])];
  updateStreak();
  saveProgress();
  renderProgress();
}

function render() {
  drawAlphabet();
  drawVowelLessons();
  drawVocabularyCards();
  drawGrammarLessons();
  renderProgress();
}

function showView(viewId) {
  clearAutoAdvance();
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });
  document.querySelectorAll(".nav").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });

  if (viewId === "alphabet-practice") createQuestion();
  if (viewId === "vowel-practice") createVowelQuestion();
  if (viewId === "marks-practice") createMarksQuestion();
  if (viewId === "reading-practice") createReadingQuestion();
  if (viewId === "vocabulary-practice") createVocabularyQuestion();
  if (viewId === "grammar-practice") createGrammarQuestion();
  if (viewId === "verse-practice") createVerseQuestion();
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

function drawVocabularyCards() {
  const filter = document.querySelector("#vocabulary-filter").value;
  document.querySelector("#vocabulary-cards").innerHTML = vocabulary.map((word) => {
    const example = word.form || word.example;
    const root = word.root ? `<div><b>Wurzel:</b> <span lang="he" dir="rtl">${word.root}</span></div>` : "";
    const form = example ? `<div><b>Belegform:</b> <span lang="he" dir="rtl">${example.he}</span> · ${example.gloss}${example.analysis ? ` <span>(${example.analysis})</span>` : ""}</div>` : "";
    const note = word.note ? `<div>${word.note}</div>` : "";
    const reference = example?.reference ? `<div><b>Stelle:</b> ${example.reference}</div>` : "";
    return `
      <article class="word-card" data-category="${word.category}" ${filter !== "all" && filter !== word.category ? "hidden" : ""}>
        <div class="word-card-head"><div class="word-lemma" lang="he" dir="rtl">${word.lemma}</div><span class="word-type">${word.category}</span></div>
        <div class="word-reading">${word.reading} · lautnah</div>
        <div class="word-gloss">${word.gloss}</div>
        ${(root || form || note || reference) ? `<div class="word-detail">${root}${form}${reference}${note}</div>` : ""}
      </article>
    `;
  }).join("");
}

function drawGrammarLessons() {
  document.querySelector("#grammar-lessons").innerHTML = grammarRules.map((rule, index) => {
    const examples = rule.examples.map((example) => {
      const [he, gloss] = example.split(" · ");
      return `<div><span class="grammar-example-he" lang="he" dir="rtl">${he}</span><br />${gloss || ""}</div>`;
    }).join("");
    const linkedWords = rule.vocabularyIds
      .map((id) => vocabulary.find((word) => word.id === id))
      .filter(Boolean)
      .map((word) => `<span lang="he" dir="rtl">${word.lemma}</span>`)
      .join("");
    return `<article class="lesson-card"><div class="path-number">0${index + 1}</div><h3>${rule.title}</h3><div class="vowel-sound">${rule.summary}</div><p>${rule.explanation}</p><div class="grammar-examples">${examples}</div><div class="grammar-links">${linkedWords}</div></article>`;
  }).join("");
}

function createVowelQuestion() {
  clearAutoAdvance();
  currentVowel = vowels[Math.floor(Math.random() * vowels.length)];
  vowelAnswered = false;
  document.querySelector("#vowel-prompt").textContent = currentVowel.he;
  document.querySelector("#vowel-feedback").textContent = vowelMode === "choice"
    ? "Wähle den passenden Grundlaut."
    : "Tippe den Grundlaut ein und bestätige.";
  const answers = document.querySelector("#vowel-answers");
  const form = document.querySelector("#vowel-text-answer");
  const input = document.querySelector("#vowel-input");
  form.classList.remove("correct-feedback");
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
  clearAutoAdvance();
  currentMarksQuestion = nextPracticeCard("marks", marksQuestions, ({ id }) => id);
  marksAnswered = false;
  document.querySelector("#marks-prompt").innerHTML = renderFocusedHebrew(currentMarksQuestion);
  document.querySelector("#marks-kind").textContent = "Wie wird das farbig markierte Zeichen ausgesprochen?";
  document.querySelector("#marks-feedback").textContent = "Wähle die passende Lautangabe.";
  const contrastSounds = {
    bet: ["b", "v"], gimel: ["g", "gh"], dalet: ["d", "dh"],
    kaf: ["k", "ch"], pe: ["p", "f"], taw: ["t", "th"],
    shin: ["sch", "s"], mappiq: ["h", ""], forte: ["ll", "l"],
  }[currentMarksQuestion.contrast];
  const distractors = [...new Set(marksQuestions.map(({ sound }) => sound))]
    .filter((sound) => !contrastSounds.includes(sound));
  const options = shuffle([...contrastSounds, ...shuffle(distractors).slice(0, 2)]);
  document.querySelector("#marks-answers").innerHTML = options.map((sound) =>
    `<button class="answer" data-sound="${sound}">${sound || "kein h"}</button>`,
  ).join("");
}

function createReadingQuestion() {
  clearAutoAdvance();
  const unseen = readingWords.filter(({ he }) => !state.readingSeen.includes(he));
  const pool = unseen.length ? unseen : readingWords.filter(({ he }) => he !== currentReadingWord?.he);
  currentReadingWord = pool[Math.floor(Math.random() * pool.length)];
  readingAnswered = false;
  document.querySelector("#reading-prompt").textContent = currentReadingWord.he;
  document.querySelector("#reading-feedback").textContent = "Tippe die Aussprache ein.";
  document.querySelector("#reading-input").value = "";
  document.querySelector("#reading-answer").classList.remove("correct-feedback");
  document.querySelector("#reading-input").focus();
}

function createVocabularyQuestion() {
  clearAutoAdvance();
  currentVocabularyWord = nextPracticeCard("vocabulary", vocabulary, ({ id }) => id);
  vocabularyAnswered = false;
  document.querySelector("#vocabulary-prompt").textContent = currentVocabularyWord.lemma;
  document.querySelector("#vocabulary-kind").textContent = vocabularyMode === "choice"
    ? "Was bedeutet dieses Wort?"
    : `Gib eine passende deutsche Bedeutung für ${currentVocabularyWord.category.toLocaleLowerCase("de")} ein.`;
  document.querySelector("#vocabulary-feedback").textContent = "Rufe die Bedeutung ab.";
  const choices = document.querySelector("#vocabulary-answers");
  const form = document.querySelector("#vocabulary-text-answer");
  const input = document.querySelector("#vocabulary-input");
  form.classList.remove("correct-feedback");
  choices.hidden = vocabularyMode !== "choice";
  form.hidden = vocabularyMode === "choice";
  input.value = "";
  if (vocabularyMode === "typed") {
    input.focus();
    return;
  }

  const distractors = shuffle(vocabulary.filter((word) => word.id !== currentVocabularyWord.id
    && word.category === currentVocabularyWord.category
    && word.gloss !== currentVocabularyWord.gloss));
  const fallback = shuffle(vocabulary.filter((word) => word.id !== currentVocabularyWord.id && word.gloss !== currentVocabularyWord.gloss));
  const answers = shuffle([...new Set([currentVocabularyWord.gloss, ...distractors.map(({ gloss }) => gloss), ...fallback.map(({ gloss }) => gloss)])].slice(0, 4));
  choices.innerHTML = answers.map((gloss) => `<button class="answer" data-gloss="${gloss}">${gloss}</button>`).join("");
}

function finishVocabularyQuestion(isCorrect, selectedButton = null) {
  if (vocabularyAnswered || !currentVocabularyWord) return;
  vocabularyAnswered = true;
  const feedback = document.querySelector("#vocabulary-feedback");
  if (selectedButton) {
    document.querySelectorAll("#vocabulary-answers .answer").forEach((button) => {
      if (button.dataset.gloss === currentVocabularyWord.gloss) button.classList.add("correct");
    });
    if (!isCorrect) selectedButton.classList.add("wrong");
  }
  feedback.textContent = isCorrect
    ? `Richtig: ${currentVocabularyWord.gloss}.`
    : `Noch nicht ganz: ${currentVocabularyWord.gloss}.`;
  recordPracticeReview("vocabulary", currentVocabularyWord.id, isCorrect);
  if (isCorrect) {
    recordCorrectPractice("vocabulary");
    if (!selectedButton) document.querySelector("#vocabulary-text-answer").classList.add("correct-feedback");
    scheduleAutoAdvance("vocabulary-practice", createVocabularyQuestion, 1200);
  }
}

function createGrammarQuestion() {
  clearAutoAdvance();
  currentGrammarQuestion = nextPracticeCard("grammar", grammarQuestions, ({ id }) => id);
  grammarAnswered = false;
  document.querySelector("#grammar-kind").textContent = currentGrammarQuestion.prompt;
  document.querySelector("#grammar-prompt").textContent = currentGrammarQuestion.promptHe;
  document.querySelector("#grammar-feedback").textContent = "Wähle die passende Erklärung.";
  document.querySelector("#grammar-answers").innerHTML = shuffle(currentGrammarQuestion.options)
    .map((option) => `<button class="answer" data-answer="${option}">${option}</button>`).join("");
}

function finishGrammarQuestion(selectedButton) {
  if (grammarAnswered || !currentGrammarQuestion) return;
  grammarAnswered = true;
  const isCorrect = selectedButton.dataset.answer === currentGrammarQuestion.answer;
  document.querySelectorAll("#grammar-answers .answer").forEach((button) => {
    if (button.dataset.answer === currentGrammarQuestion.answer) button.classList.add("correct");
  });
  if (!isCorrect) selectedButton.classList.add("wrong");
  document.querySelector("#grammar-feedback").textContent = isCorrect
    ? `Richtig. ${currentGrammarQuestion.explanation}`
    : `Noch nicht ganz. ${currentGrammarQuestion.explanation}`;
  recordPracticeReview("grammar", currentGrammarQuestion.id, isCorrect);
  if (isCorrect) {
    recordCorrectPractice("grammar");
    scheduleAutoAdvance("grammar-practice", createGrammarQuestion, 1400);
  }
}

function createVerseQuestion() {
  clearAutoAdvance();
  const unseen = verseExercises.filter(({ id }) => !state.verseSeen.includes(id));
  const pool = unseen.length ? unseen : verseExercises.filter(({ id }) => id !== currentVerseExercise?.id);
  currentVerseExercise = pool[Math.floor(Math.random() * pool.length)];
  verseAnswered = false;
  document.querySelector("#verse-reference").textContent = currentVerseExercise.reference;
  document.querySelector("#verse-prompt").textContent = currentVerseExercise.he;
  document.querySelector("#verse-input").value = "";
  document.querySelector("#verse-answer").classList.remove("correct-feedback");
  document.querySelector("#verse-feedback").textContent = "Was bedeutet dieser Abschnitt?";
  document.querySelector("#verse-explanation").hidden = true;
  document.querySelector("#verse-translation").textContent = "";
  document.querySelector("#verse-note").textContent = "";
  document.querySelector("#verse-breakdown").innerHTML = "";
  document.querySelector("#verse-input").focus();
}

function normalizeTranslation(value) {
  return normalizeAnswer(value)
    .replace(/[.,;:!?׃־]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function finishVerseQuestion(value) {
  if (verseAnswered || !currentVerseExercise) return;
  verseAnswered = true;
  const accepted = [currentVerseExercise.translation, ...currentVerseExercise.accepted]
    .map(normalizeTranslation);
  const isCorrect = accepted.includes(normalizeTranslation(value));
  document.querySelector("#verse-feedback").textContent = isCorrect
    ? "Richtig — so greifen Wortschatz und Grammatik ineinander."
    : "Noch nicht ganz. Vergleiche deine Übersetzung mit der Auflösung und den Wortteilen.";
  document.querySelector("#verse-explanation").hidden = false;
  document.querySelector("#verse-translation").textContent = currentVerseExercise.translation;
  document.querySelector("#verse-note").textContent = currentVerseExercise.explanation;
  document.querySelector("#verse-breakdown").innerHTML = currentVerseExercise.segments
    .map((segment) => `<span><b lang="he" dir="rtl">${segment.he}</b> · ${segment.gloss}</span>`).join("");

  if (isCorrect) {
    document.querySelector("#verse-answer").classList.add("correct-feedback");
    const isNewVerse = !state.verseSeen.includes(currentVerseExercise.id);
    if (isNewVerse) {
      state.verseSeen.push(currentVerseExercise.id);
      state.practiceCorrect.verses = Math.min(verseExercises.length, state.practiceCorrect.verses + 1);
      state.correct += 1;
    }
    updateStreak();
    saveProgress();
    renderProgress();
    scheduleAutoAdvance("verse-practice", createVerseQuestion, 4500);
  }
}

function createQuestion() {
  clearAutoAdvance();
  currentQuestion = nextPracticeCard("alphabet", alphabetPracticeCards, ({ id }) => id);
  questionAnswered = false;
  document.querySelector("#prompt").textContent = currentQuestion.he;
  const feedback = document.querySelector("#feedback");
  const answers = document.querySelector("#answers");
  const textAnswer = document.querySelector("#text-answer");
  const input = document.querySelector("#answer-input");
  textAnswer.classList.remove("correct-feedback");
  const kind = document.querySelector("#practice-kind");
  feedback.textContent = practiceMode === "choice"
    ? "Wähle die passende Lautangabe."
    : "Gib deine Antwort ein und bestätige mit Enter oder Prüfen.";
  input.value = "";
  answers.hidden = practiceMode !== "choice";
  textAnswer.hidden = practiceMode === "choice";

  if (practiceMode === "sound") {
    kind.textContent = currentQuestion.isFinal
      ? `Wie klingt die Schlussform von ${currentQuestion.name}?`
      : "Wie wird dieser Buchstabe ungefähr gesprochen?";
    input.placeholder = "Laut eingeben …";
    input.setAttribute("aria-label", "Laut eingeben");
  } else if (practiceMode === "name") {
    kind.textContent = currentQuestion.isFinal
      ? "Wie heißt der Buchstabe in dieser Schlussform?"
      : "Wie heißt dieser Buchstabe?";
    input.placeholder = "Buchstabennamen eingeben …";
    input.setAttribute("aria-label", "Buchstabennamen eingeben");
  } else {
    kind.textContent = currentQuestion.isFinal
      ? "Welcher Laut gehört zu dieser Schlussform?"
      : "Welcher Laut gehört zu diesem Buchstaben?";
  }

  if (practiceMode !== "choice") {
    input.focus();
    return;
  }
  const options = new Map([[currentQuestion.sound, currentQuestion]]);
  while (options.size < 4) {
    const candidate = alphabetPracticeCards[Math.floor(Math.random() * alphabetPracticeCards.length)];
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
  button.addEventListener("click", () => {
    if (button.dataset.completeLesson) completeLesson(button.dataset.completeLesson);
    showView(button.dataset.go);
    if (button.dataset.scrollTo) {
      window.setTimeout(() => {
        document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  });
});

document.querySelector("#alphabet-filter").addEventListener("change", drawAlphabet);
document.querySelector("#new-question").addEventListener("click", createQuestion);

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    practiceMode = button.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach((modeButton) => {
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
    ? currentQuestion.isFinal
      ? `Richtig! ${currentQuestion.he} ist die Schlussform von ${currentQuestion.name}.`
      : "Richtig! כל הכבוד · Kol hakavod!"
    : currentQuestion.isFinal
      ? `Noch nicht ganz. Die Schlussform von ${currentQuestion.name} klingt ungefähr wie „${currentQuestion.sound}“.`
      : `Noch nicht ganz. ${currentQuestion.name} klingt wie „${currentQuestion.sound}“.`;

  recordPracticeReview("alphabet", currentQuestion.id, isCorrect);
  if (isCorrect) recordCorrectPractice("alphabet", currentQuestion);
  if (isCorrect) scheduleAutoAdvance("alphabet-practice", createQuestion);
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
    ? currentQuestion.isFinal
      ? `Richtig! ${currentQuestion.he} ist die Schlussform von ${currentQuestion.name}.`
      : "Richtig! כל הכבוד · Kol hakavod!"
    : currentQuestion.isFinal
      ? `Noch nicht ganz. ${currentQuestion.he} ist die Schlussform von ${currentQuestion.name}; ${practiceMode === "sound" ? `der Laut ist ungefähr „${expected}“` : `der Buchstabenname bleibt ${currentQuestion.name}`}.`
      : `Noch nicht ganz. ${practiceMode === "sound" ? `Der ungefähre Laut ist „${expected}“` : `Der Buchstabe heißt ${expected}`}.`;

  recordPracticeReview("alphabet", currentQuestion.id, isCorrect);
  if (isCorrect) recordCorrectPractice("alphabet", currentQuestion);
  if (isCorrect) {
    document.querySelector("#text-answer").classList.add("correct-feedback");
    scheduleAutoAdvance("alphabet-practice", createQuestion);
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
  if (isCorrect) recordCorrectPractice("vowels");
  if (isCorrect) {
    if (!selectedButton) document.querySelector("#vowel-text-answer").classList.add("correct-feedback");
    scheduleAutoAdvance("vowel-practice", createVowelQuestion);
  }
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
  const isCorrect = answer.dataset.sound === currentMarksQuestion.sound;
  document.querySelectorAll("#marks-answers .answer").forEach((button) => {
    if (button.dataset.sound === currentMarksQuestion.sound) button.classList.add("correct");
  });
  if (!isCorrect) answer.classList.add("wrong");
  document.querySelector("#marks-feedback").textContent = isCorrect
    ? `Richtig: ${currentMarksQuestion.explanation}.`
    : `Noch nicht ganz. ${currentMarksQuestion.sound || "kein h"}: ${currentMarksQuestion.explanation}. Es kommt bald wieder.`;
  recordPracticeReview("marks", currentMarksQuestion.id, isCorrect);
  if (isCorrect) recordCorrectPractice("marks");
  if (isCorrect) scheduleAutoAdvance("marks-practice", createMarksQuestion);
});

document.querySelector("#vocabulary-filter").addEventListener("change", drawVocabularyCards);
document.querySelectorAll("[data-vocabulary-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    vocabularyMode = button.dataset.vocabularyMode;
    document.querySelectorAll("[data-vocabulary-mode]").forEach((modeButton) => {
      const active = modeButton === button;
      modeButton.classList.toggle("active", active);
      modeButton.setAttribute("aria-pressed", String(active));
    });
    createVocabularyQuestion();
  });
});
document.querySelector("#next-vocabulary-question").addEventListener("click", createVocabularyQuestion);
document.querySelector("#vocabulary-answers").addEventListener("click", (event) => {
  const answer = event.target.closest(".answer");
  if (!answer || vocabularyAnswered || !currentVocabularyWord) return;
  finishVocabularyQuestion(answer.dataset.gloss === currentVocabularyWord.gloss, answer);
});
document.querySelector("#vocabulary-text-answer").addEventListener("submit", (event) => {
  event.preventDefault();
  if (vocabularyAnswered || !currentVocabularyWord) return;
  const accepted = [currentVocabularyWord.gloss, ...currentVocabularyWord.gloss.split(/[,;]|\s+\/\s+/)]
    .map((answer) => normalizeAnswer(answer));
  const value = normalizeAnswer(document.querySelector("#vocabulary-input").value);
  finishVocabularyQuestion(accepted.includes(value));
});

document.querySelector("#next-grammar-question").addEventListener("click", createGrammarQuestion);
document.querySelector("#grammar-answers").addEventListener("click", (event) => {
  const answer = event.target.closest(".answer");
  if (!answer || grammarAnswered || !currentGrammarQuestion) return;
  finishGrammarQuestion(answer);
});

document.querySelector("#next-verse-question").addEventListener("click", createVerseQuestion);
document.querySelector("#verse-answer").addEventListener("submit", (event) => {
  event.preventDefault();
  finishVerseQuestion(document.querySelector("#verse-input").value);
});

document.querySelector("#next-reading-question").addEventListener("click", createReadingQuestion);
document.querySelector("#restart-reading").addEventListener("click", () => {
  state.practiceCorrect.reading = 0;
  state.readingSeen = [];
  saveProgress();
  renderProgress();
  createReadingQuestion();
});
document.querySelector("#reading-answer").addEventListener("submit", (event) => {
  event.preventDefault();
  if (readingAnswered || !currentReadingWord) return;
  readingAnswered = true;
  const stripMarks = (value) => normalizeAnswer(value).replace(/j/g, "y").replace(/ʾ|ʿ/g, "").replace(/[^a-z]/g, "");
  const answer = stripMarks(document.querySelector("#reading-input").value);
  const expected = [currentReadingWord.answer, ...(currentReadingWord.alternatives || [])].map(stripMarks);
  const isCorrect = expected.includes(answer);
  document.querySelector("#reading-feedback").textContent = isCorrect
    ? `Richtig: ${currentReadingWord.answer} · ${currentReadingWord.hint}.`
    : `Noch nicht ganz: ${currentReadingWord.answer} · ${currentReadingWord.hint}.${currentReadingWord.tip ? ` ${currentReadingWord.tip}` : ""}`;
  if (isCorrect) {
    document.querySelector("#reading-answer").classList.add("correct-feedback");
    const isNewWord = !state.readingSeen.includes(currentReadingWord.he);
    if (isNewWord) {
      state.readingSeen.push(currentReadingWord.he);
      state.practiceCorrect.reading = Math.min(8, (state.practiceCorrect.reading || 0) + 1);
      state.correct += 1;
    }
    updateStreak();
    saveProgress();
    renderProgress();
    scheduleAutoAdvance("reading-practice", createReadingQuestion);
  }
});

document.querySelector("#today").textContent = new Intl.DateTimeFormat("de-CH", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(new Date());

render();
