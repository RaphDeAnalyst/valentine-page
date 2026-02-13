/* ---------------- ELEMENTS ---------------- */
const intro = document.getElementById("intro");
const question = document.getElementById("question");
const message = document.getElementById("message");

const startBtn = document.getElementById("startBtn");
const questionText = document.getElementById("questionText");
const choices = document.getElementById("choices");
const choiceBtns = document.querySelectorAll(".choiceBtn");

const typewriter = document.getElementById("typewriter");
const signature = document.getElementById("signature");
const bgMusic = document.getElementById("bgMusic");

let voices = [];
let selectedVoice = null;

/* ---------------- SECTION CONTROL ---------------- */
function showSection(section) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });
  section.classList.add("active");
}

/* ---------------- TYPEWRITER ---------------- */
// Letter-by-letter
function typeText(element, text, speed = 70) {
  return new Promise(resolve => {
    element.innerHTML = "";
    let i = 0;

    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    element.appendChild(cursor);

    function typing() {
      if (i < text.length) {
        element.insertBefore(
          document.createTextNode(text.charAt(i)),
          cursor
        );
        i++;
        setTimeout(typing, speed);
      } else {
        cursor.remove();
        resolve();
      }
    }

    typing();
  });
}

/* ---------------- SPEECH ---------------- */
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.voice = selectedVoice;
  speechSynthesis.speak(utterance);
}

// Load voices
speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
  selectedVoice = voices.find(v => v.name.includes("Female")) || voices[0];
};

/* ---------------- MUSIC FADE ---------------- */
function fadeInMusic() {
  bgMusic.volume = 0;
  bgMusic.play();

  let volume = 0;
  const fade = setInterval(() => {
    if (volume < 0.4) {
      volume += 0.02;
      bgMusic.volume = volume;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

/* ---------------- FLOW ---------------- */
startBtn.addEventListener("click", async () => {
  showSection(question);
  await typeText(questionText, "Do you know how much I love you?");
  choices.classList.remove("hidden");
});

/* When either choice button is clicked */
choiceBtns.forEach(btn => {
  btn.addEventListener("click", async () => {

    // Remove buttons immediately
    choices.style.opacity = "0";
    choices.style.pointerEvents = "none";
    setTimeout(() => {
      choices.style.display = "none";
    }, 300);

    // Letter-by-letter suspense
    await typeText(questionText, "Wrong answer.", 70);
    await delay(800);
    await typeText(questionText, "The correct answer is...", 70);
    await delay(3500);
    await typeText(questionText, "More than yesterday.", 70);
    await delay(1200);
    await typeText(questionText, "Less than tomorrow.", 70);

    await delay(1500);

    // Show main message section first
    showSection(message);
    await delay(200); // allow CSS fade-in

    fadeInMusic();
    startMainMessage();
  });
});

/* ---------------- MAIN MESSAGE ---------------- */
async function startMainMessage() {
  const paragraphs = [
    "Happy Valentine’s Day, my sweetheart 💖",
    "You are the most beautiful part of my life, the smile that brightens my day, the peace my heart runs to, and the love I never knew I needed so deeply. Being with you makes everything feel softer, happier, and more meaningful.",
    "I don’t just love you today… I love you in every little moment, every laugh we share, and every memory we create together. You mean more to me than words could ever truly explain.",
    "Forever grateful for you. Forever choosing you. 💕"
  ];

  for (let i = 0; i < paragraphs.length; i++) {
    await typeText(typewriter, paragraphs[i], 70); // letter-by-letter
    speak(paragraphs[i]);

    if (i === 0) triggerCelebration();

    await delay(3000);
    typewriter.innerHTML += "\n\n";
  }

  signature.classList.add("show");
}

/* ---------------- UTIL ---------------- */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ---------------- CELEBRATION ---------------- */
function triggerCelebration() {
  const container = document.getElementById("celebration");

  // Floating hearts
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 20 + Math.random() * 20 + "px";
    heart.style.animationDuration = 4 + Math.random() * 3 + "s";
    heart.textContent = "❤️";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }

  // Falling hearts
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart-fall");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 15 + Math.random() * 15 + "px";
    heart.style.animationDuration = 3 + Math.random() * 2 + "s";
    heart.textContent = "💕";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }
}


/* ---------------- INITIAL LOAD ---------------- */
showSection(intro);
