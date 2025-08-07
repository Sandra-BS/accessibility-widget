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
