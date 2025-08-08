window.addEventListener("DOMContentLoaded", () => {
  console.log("Accessibility Widget loaded");
// --- Create toggle button ---
const toggleButton = document.createElement('button');
toggleButton.innerText = '♿';
toggleButton.setAttribute('id', 'accessibility-toggle');
document.body.appendChild(toggleButton);

// --- Create accessibility panel ---
const panel = document.createElement('div');
panel.setAttribute('id', 'accessibility-panel');
panel.style.display = 'none';

// --- Add features inside the panel ---
panel.innerHTML = `
  <h4>Accessibility Tools</h4>
  <button id="text-size-btn" tabindex="0">Toggle Text Size</button>
  <button id="contrast-btn" tabindex="0">Toggle High Contrast</button>
  <button id="dyslexia-btn" tabindex="0">Toggle Dyslexia Font</button>
  <button id="reset-btn" tabindex="0">Reset All</button>
  <button id="seizure-safe-toggle">Seizure Safe Mode</button>
  <button id="vision-impaired-toggle">Vision Impaired Mode</button>
  <button id="adhd-friendly-toggle">ADHD Friendly Mode</button>
  <div id="cognitive-section">
    <button id="toggle-cognitive" class="accessibility-btn">Cognitive Disability Mode</button>
  </div>
  <button id="toggle-keyboard" class="accessibility-btn">Keyboard Navigation</button>
  <button id="toggle-screenreader" class="accessibility-btn">Screen Reader Profile</button>
  <button id="scale-content-toggle">Toggle Content Scaling</button>
  <button id="readable-font-toggle">Readable Font</button>
  <button id="highlight-titles-toggle">Highlight Titles</button>
  <button id="highlight-links-toggle">Highlight Links</button>
  <button id="text-align-left-toggle">Align Left</button>
  <button id="text-align-center-toggle">Align Center</button>
  <button id="text-align-right-toggle">Align Right</button>
  <button id="line-height-toggle">Line Height</button>
  <button id="letter-spacing-toggle">Letter Spacing</button>
  <button id="focus-spotlight-toggle">Focus Spotlight</button>
  <button id="reduce-motion-toggle">Reduce Motion</button>
  <button id="dark-contrast-toggle">Dark Contrast</button>
  <button id="light-contrast-toggle">Light Contrast</button>
  <button id="high-contrast-toggle">High Contrast</button>
  <button id="high-saturation-toggle">High Saturation</button>
  <button id="text-color-toggle">Adjust Text Colors</button>
  <button id="monochrome-toggle">Monochrome Mode</button>
  <button id="text-magnifier-toggle">Text Magnifier</button>
  <button id="mute-sound-toggle">Mute Sound</button>
  <button id="hide-images-toggle">Hide Images</button>
  <button id="stop-animations-toggle">Stop Animations</button>
  <button id="big-black-cursor-toggle">Big Black Cursor</button>
  <button id="big-white-cursor-toggle">Big White Cursor</button>


`;
document.body.appendChild(panel);

// --- Toggle panel visibility ---
toggleButton.addEventListener('click', () => {
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});

// --- Feature 1: Increase text size ---
document.getElementById('text-size-btn').addEventListener('click', () => {
  document.body.classList.toggle('large-text');
});

// --- Feature 2: High contrast mode ---
document.getElementById('contrast-btn').addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

// --- Feature 3: Dyslexia-friendly font ---
document.getElementById('dyslexia-btn').addEventListener('click', () => {
  document.body.classList.toggle('dyslexia-font');
});

document.getElementById('reset-btn').addEventListener('click', () => {
  document.body.classList.remove('large-text', 'high-contrast', 'dyslexia-font');
});

// Seizure Safe Mode toggle functionality
document.getElementById('seizure-safe-toggle').addEventListener('click', () => {
  document.body.classList.toggle('seizure-safe');
});

document.getElementById('vision-impaired-toggle').addEventListener('click', () => {
  document.body.classList.toggle('vision-impaired');
});

document.getElementById('adhd-friendly-toggle').addEventListener('click', () => {
  document.body.classList.toggle('adhd-friendly');
});

// Reading Guide (only active in ADHD mode)
const readingGuide = document.createElement('div');
readingGuide.id = 'reading-guide';
document.body.appendChild(readingGuide);

// ADHD Spotlight Overlay
const spotlightOverlay = document.createElement('div');
spotlightOverlay.id = 'adhd-spotlight';
document.body.appendChild(spotlightOverlay);

document.addEventListener('mousemove', (e) => {
  if (document.body.classList.contains('adhd-friendly')) {
    const x = e.clientX;
    const y = e.clientY;
    spotlightOverlay.style.setProperty('--spotlight-x', `${x}px`);
    spotlightOverlay.style.setProperty('--spotlight-y', `${y}px`);
    spotlightOverlay.style.display = 'block';
  } else {
    spotlightOverlay.style.display = 'none';
  }
});

const toggleCognitive = document.getElementById('toggle-cognitive');
toggleCognitive.addEventListener('click', () => {
  document.body.classList.toggle('cognitive-friendly');
});

document.getElementById("toggle-keyboard").addEventListener("click", () => {
  document.body.classList.toggle("keyboard-navigation");

  const isActive = document.body.classList.contains("keyboard-navigation");
  localStorage.setItem("keyboard-navigation", isActive ? "true" : "false");
});
if (localStorage.getItem("keyboard-navigation") === "true") {
  document.body.classList.add("keyboard-navigation");
}

document.getElementById("toggle-screenreader").addEventListener("click", () => {
  document.body.classList.toggle("screenreader-profile");

  const isActive = document.body.classList.contains("screenreader-profile");
  localStorage.setItem("screenreader-profile", isActive ? "true" : "false");
});

if (localStorage.getItem("screenreader-profile") === "true") {
  document.body.classList.add("screenreader-profile");
}


document.querySelectorAll('#accessibility-widget button').forEach(button => {
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click(); // Trigger button click on Enter or Space
    }
  });
});

// === Read Aloud Buttons ===
const readAloudControls = document.createElement("div");
readAloudControls.className = "read-aloud-controls";

const readAloudBtn = document.createElement("button");
readAloudBtn.id = "read-aloud-btn";
readAloudBtn.textContent = "🔊 Read This Page";

const stopReadingBtn = document.createElement("button");
stopReadingBtn.id = "stop-reading-btn";
stopReadingBtn.textContent = "⛔ Stop Reading";

readAloudControls.appendChild(readAloudBtn);
readAloudControls.appendChild(stopReadingBtn);

const cognitiveSection = document.getElementById("cognitive-section");

// Append to your Cognitive Disability section
cognitiveSection.appendChild(readAloudControls);

readAloudBtn.addEventListener("click", () => {
  const content = document.body.innerText;
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
});

stopReadingBtn.addEventListener("click", () => {
  speechSynthesis.cancel();
});

document.getElementById("scale-content-toggle").addEventListener("click", () => {
  const scaleApplied = document.body.classList.toggle("scale-content");

  if (scaleApplied) {
    document.body.style.transform = "scale(1.2)";
    document.body.style.transformOrigin = "top left";
  } else {
    document.body.style.transform = "scale(1)";
    document.body.style.transformOrigin = "top left";
  }
});
// Readable Font
document.getElementById("readable-font-toggle").addEventListener("click", () => {
  document.body.classList.toggle("readable-font");
});

// Highlight Titles
document.getElementById("highlight-titles-toggle").addEventListener("click", () => {
  document.body.classList.toggle("highlight-titles");
});

// Highlight Links
document.getElementById("highlight-links-toggle").addEventListener("click", () => {
  document.body.classList.toggle("highlight-links");
});
document.getElementById("text-align-left-toggle").addEventListener("click", () => {
  document.body.style.textAlign = "left";
});

document.getElementById("text-align-center-toggle").addEventListener("click", () => {
  document.body.style.textAlign = "center";
});

document.getElementById("text-align-right-toggle").addEventListener("click", () => {
  document.body.style.textAlign = "right";
});


// Line Height
document.getElementById("line-height-toggle").addEventListener("click", () => {
  document.body.classList.toggle("line-height-increase");
});

// Letter Spacing
document.getElementById("letter-spacing-toggle").addEventListener("click", () => {
  document.body.classList.toggle("letter-spacing-increase");
});
document.getElementById("focus-spotlight-toggle").addEventListener("click", () => {
  document.body.classList.toggle("focus-spotlight-mode");
});
document.getElementById("reduce-motion-toggle").addEventListener("click", () => {
  document.body.classList.toggle("reduce-motion-mode");
});
let isDarkContrast = false;

document.getElementById("dark-contrast-toggle").addEventListener("click", () => {
  if (isDarkContrast) {
    document.body.classList.remove("dark-contrast");
  } else {
    document.body.classList.add("dark-contrast");
  }
  isDarkContrast = !isDarkContrast;
});
document.body.classList.remove("dark-contrast");
isDarkContrast = false;

let isLightContrast = false;

document.getElementById("light-contrast-toggle").addEventListener("click", () => {
  if (isLightContrast) {
    document.body.classList.remove("light-contrast");
  } else {
    document.body.classList.add("light-contrast");
  }
  isLightContrast = !isLightContrast;
});
document.body.classList.remove("light-contrast");
isLightContrast = false;
let isHighContrast = false;

document.getElementById("high-contrast-toggle").addEventListener("click", () => {
  if (isHighContrast) {
    document.body.classList.remove("high-contrast");
  } else {
    document.body.classList.add("high-contrast");
  }
  isHighContrast = !isHighContrast;
});
document.body.classList.remove("high-contrast");
isHighContrast = false;
let isHighSaturation = false;

document.getElementById("high-saturation-toggle").addEventListener("click", () => {
  if (isHighSaturation) {
    document.body.classList.remove("high-saturation");
  } else {
    document.body.classList.add("high-saturation");
  }
  isHighSaturation = !isHighSaturation;
});

document.body.classList.remove("high-saturation");
isHighSaturation = false;

let isTextColorAdjusted = false;

document.getElementById("text-color-toggle").addEventListener("click", () => {
  if (isTextColorAdjusted) {
    document.body.classList.remove("adjust-text-color");
  } else {
    document.body.classList.add("adjust-text-color");
  }
  isTextColorAdjusted = !isTextColorAdjusted;
});
document.body.classList.remove("adjust-text-color");
isTextColorAdjusted = false;

let isMonochrome = false;

document.getElementById("monochrome-toggle").addEventListener("click", () => {
  if (isMonochrome) {
    document.body.classList.remove("monochrome-mode");
  } else {
    document.body.classList.add("monochrome-mode");
  }
  isMonochrome = !isMonochrome;
});
document.body.classList.remove("monochrome-mode");
isMonochrome = false;
let isMagnifierActive = false;
let magnifier;

document.getElementById("text-magnifier-toggle").addEventListener("click", () => {
  if (isMagnifierActive) {
    removeTextMagnifier();
  } else {
    enableTextMagnifier();
  }
  isMagnifierActive = !isMagnifierActive;
});

function enableTextMagnifier() {
  magnifier = document.createElement("div");
  magnifier.id = "text-magnifier";
  document.body.appendChild(magnifier);

  document.addEventListener("mousemove", handleMagnifier);
}

function removeTextMagnifier() {
  document.removeEventListener("mousemove", handleMagnifier);
  if (magnifier) magnifier.remove();
}

function handleMagnifier(e) {
  const text = document.elementFromPoint(e.clientX, e.clientY);
  if (text && text.innerText) {
    magnifier.innerText = text.innerText;
    magnifier.style.top = `${e.clientY + 20}px`;
    magnifier.style.left = `${e.clientX + 20}px`;
  }
}
removeTextMagnifier();
isMagnifierActive = false;

// Mute Sound
document.getElementById("mute-sound-toggle").addEventListener("click", () => {
  const audios = document.querySelectorAll("audio, video");
  audios.forEach(media => {
    media.muted = !media.muted;
  });
});

// Hide Images
document.getElementById("hide-images-toggle").addEventListener("click", () => {
  document.body.classList.toggle("hide-images");
});

// Stop Animations
document.getElementById("stop-animations-toggle").addEventListener("click", () => {
  document.body.classList.toggle("stop-animations");
});
// Big Black Cursor
document.getElementById("big-black-cursor-toggle").addEventListener("click", () => {
  document.body.classList.toggle("big-black-cursor");
  document.body.classList.remove("big-white-cursor");
});

// Big White Cursor
document.getElementById("big-white-cursor-toggle").addEventListener("click", () => {
  document.body.classList.toggle("big-white-cursor");
  document.body.classList.remove("big-black-cursor");
});
const style = document.createElement('style');
style.textContent = `/* Launcher Button */
#accessibility-launcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
}

/* Accessibility Panel */
#accessibility-panel {
  position: fixed;
  bottom: 70px;
  right: 20px;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  width: 220px;
}

#accessibility-panel h3 {
  margin-top: 0;
  font-size: 16px;
}
/* Toggle larger text */
.large-text * {
  font-size: 1.25em !important;
}

/* High contrast colors */
.high-contrast {
  background-color: #000 !important;
  color: #fff !important;
}

.high-contrast a {
  color: #0ff !important;
}

/* Dyslexia-friendly font (fallback to Comic Sans if OpenDyslexic not available) */
.dyslexia-font * {
  font-family: 'OpenDyslexic', 'Comic Sans MS', cursive, sans-serif !important;
}

#accessibility-widget {
  position: fixed;
  top: 50px;
  right: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 15px;
  z-index: 9999;
  width: 200px;
}

#accessibility-widget button {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}

/* Seizure Safe Mode - disables animation and transitions */
body.seizure-safe * {
  animation: none !important;
  transition: none !important;
}

/* Vision Impaired Mode */
body.vision-impaired {
  font-size: 1.3em; /* Content scaling */
  font-family: Arial, Helvetica, sans-serif !important; /* Readable font */
  background-color: #000 !important;
  color: #fff !important;
}

body.vision-impaired a {
  color: #00ffff !important;
}

body.vision-impaired * {
  background-color: transparent !important;
  border-color: #fff !important;
}

/* ADHD Friendly Mode */
body.adhd-friendly {
  animation: none !important;
  transition: none !important;
  filter: brightness(90%);
}

/* ADHD Spotlight Overlay */
#adhd-spotlight {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  backdrop-filter: blur(4px) brightness(60%);
  background: radial-gradient(
    circle at var(--spotlight-x) var(--spotlight-y),
    transparent 80px,
    rgba(0, 0, 0, 0.5) 160px
  );
  transition: background 0.1s;
}

.keyboard-navigation *:focus {
  outline: 3px solid #00f !important;
  outline-offset: 2px;
}

/* Cognitive Disability Profile */
body.cognitive-friendly * {
  animation: none !important;
  transition: none !important;
}

body.cognitive-friendly p,
body.cognitive-friendly li {
  line-height: 1.8 !important;
  font-size: 18px !important;
  letter-spacing: 0.5px !important;
}

body.cognitive-friendly h1,
body.cognitive-friendly h2,
body.cognitive-friendly h3 {
  margin-top: 2rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

body.cognitive-friendly .cta,
body.cognitive-friendly button,
body.cognitive-friendly a.button {
  outline: 3px solid #0077ff;
  background-color: #e0f2ff !important;
  color: #000 !important;
  font-weight: bold;
}

body.cognitive-friendly img.decorative,
body.cognitive-friendly .non-essential {
  display: none !important;
}

body.cognitive-friendly section,
body.cognitive-friendly article,
body.cognitive-friendly div {
  padding: 20px !important;
  margin: 10px 0 !important;
}

.keyboard-navigation *:focus {
  outline: 3px solid #ff9800;
  outline-offset: 2px;
  transition: outline 0.2s ease-in-out;
}

.read-aloud-controls {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

#read-aloud-btn,
#stop-reading-btn {
  padding: 8px 14px;
  background-color: #2a68ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

#read-aloud-btn:hover,
#stop-reading-btn:hover {
  background-color: #1e4ad9;
}
.scale-content {
  transition: transform 0.3s ease-in-out;
}
.readable-font * {
  font-family: Arial, Helvetica, sans-serif !important;
}

.highlight-titles h1,
.highlight-titles h2,
.highlight-titles h3,
.highlight-titles h4,
.highlight-titles h5,
.highlight-titles h6 {
  background-color: #fff9c4;
  padding: 0.2em;
  border-radius: 0.2em;
}

.highlight-links a {
  background-color: #e1f5fe;
  text-decoration: underline !important;
  padding: 0.1em 0.2em;
  border-radius: 0.2em;
}
.align-left * {
  text-align: left !important;
}

.line-height-increase * {
  line-height: 1.8 !important;
}

.letter-spacing-increase * {
  letter-spacing: 0.08em !important;
}
/* General background dim when spotlight mode is active */
.focus-spotlight-mode *:not(:focus):not(.widget):not(.widget *) {
  filter: blur(1.5px) brightness(0.7);
  transition: filter 0.2s ease;
}

/* Add glow or highlight to focused elements */
.focus-spotlight-mode *:focus {
  outline: 3px solid #ffd54f !important;
  box-shadow: 0 0 10px 3px rgba(255, 213, 79, 0.9);
  position: relative;
  z-index: 1000;
}
/* Kill transitions and animations site-wide */
.reduce-motion-mode * {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}
body {
  transition: text-align 0.3s ease;
}
.dark-contrast {
  background-color: #000 !important;
  color: #fff !important;
}

.dark-contrast a {
  color: #0ff !important;
}

.light-contrast {
  background-color: #fff !important;
  color: #000 !important;
}

.light-contrast a {
  color: #00f !important;
}
.high-saturation {
  filter: saturate(2) !important; /* Doubles saturation */
}
.adjust-text-color {
  color: #111 !important;
  background-color: #fefefe !important;
}
.monochrome-mode {
  filter: grayscale(100%) !important;
}

#text-magnifier {
  position: fixed;
  z-index: 9999;
  background: #fff;
  color: #000;
  border: 1px solid #ccc;
  font-size: 24px;
  padding: 8px 12px;
  pointer-events: none;
  max-width: 300px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
/* Hide images */
.hide-images img {
  display: none !important;
}

/* Stop animations */
.stop-animations * {
  animation: none !important;
  transition: none !important;
}
/* Big Black Cursor */
.big-black-cursor * {
  cursor: url('https://cdn.jsdelivr.net/gh/encharm/Font-Awesome-SVG-PNG@master/black/png/32/mouse-pointer.png'), auto !important;
}

/* Big White Cursor */
.big-white-cursor * {
  cursor: url('https://cdn.jsdelivr.net/gh/encharm/Font-Awesome-SVG-PNG@master/white/png/32/mouse-pointer.png'), auto !important;
}
`;
document.head.appendChild(style);
(async function () {
  // Step 1: Get the current domain
  const currentDomain = window.location.hostname;

  // Step 2: Call your backend API to get domain-specific settings
  const response = await fetch(`https://accessibility-widget-bmpc.onrender.com/api/settings?domain=${currentDomain}`);
  
  if (!response.ok) {
    console.error('Failed to load accessibility settings');
    return;
  }

  const settings = await response.json();
  console.log('Accessibility settings loaded:', settings);

  // Step 3: Apply settings
  if (settings.darkMode) {
    document.body.style.backgroundColor = "#111";
    document.body.style.color = "#fff";
  }

  if (settings.largeText) {
    document.body.style.fontSize = "1.5rem";
  }

  // Add other settings here...
})();
});
