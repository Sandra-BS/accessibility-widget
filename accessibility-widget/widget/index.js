// Check if domain is registered before showing widget
async function checkDomainRegistration() {
  try {
    const currentDomain = window.location.hostname;
    const response = await fetch(`https://your-render-app.onrender.com/api/check/${currentDomain}`);
    const data = await response.json();
    
    if (data.registered) {
      initializeWidget();
    } else {
      console.log('Domain not registered for accessibility widget');
    }
  } catch (error) {
    console.error('Error checking domain registration:', error);
  }
}

function initializeWidget() {
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
  const button = document.getElementById('text-size-btn');
  const isActive = document.body.classList.toggle('large-text');
  button.classList.toggle('active', isActive);
});

// --- Feature 2: High contrast mode ---
document.getElementById('contrast-btn').addEventListener('click', () => {
  const button = document.getElementById('contrast-btn');
  const isActive = document.body.classList.toggle('high-contrast');
  button.classList.toggle('active', isActive);
});

// --- Feature 3: Dyslexia-friendly font ---
document.getElementById('dyslexia-btn').addEventListener('click', () => {
  const button = document.getElementById('dyslexia-btn');
  const isActive = document.body.classList.toggle('dyslexia-font');
  button.classList.toggle('active', isActive);
});

document.getElementById('reset-btn').addEventListener('click', () => {
  document.body.classList.remove('large-text', 'high-contrast', 'dyslexia-font');
  // Remove active class from all buttons
  document.querySelectorAll('#accessibility-panel button').forEach(btn => {
    btn.classList.remove('active');
  });
});

// Seizure Safe Mode toggle functionality
document.getElementById('seizure-safe-toggle').addEventListener('click', () => {
  const button = document.getElementById('seizure-safe-toggle');
  const isActive = document.body.classList.toggle('seizure-safe');
  button.classList.toggle('active', isActive);
});

document.getElementById('vision-impaired-toggle').addEventListener('click', () => {
  const button = document.getElementById('vision-impaired-toggle');
  const isActive = document.body.classList.toggle('vision-impaired');
  button.classList.toggle('active', isActive);
});

document.getElementById('adhd-friendly-toggle').addEventListener('click', () => {
  const button = document.getElementById('adhd-friendly-toggle');
  const isActive = document.body.classList.toggle('adhd-friendly');
  button.classList.toggle('active', isActive);
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
  const button = document.getElementById('toggle-cognitive');
  const isActive = document.body.classList.toggle('cognitive-friendly');
  button.classList.toggle('active', isActive);
});

document.getElementById("toggle-keyboard").addEventListener("click", () => {
  const button = document.getElementById("toggle-keyboard");
  const isActive = document.body.classList.toggle("keyboard-navigation");
  button.classList.toggle('active', isActive);
  localStorage.setItem("keyboard-navigation", isActive ? "true" : "false");
});
if (localStorage.getItem("keyboard-navigation") === "true") {
  document.body.classList.add("keyboard-navigation");
  document.getElementById("toggle-keyboard").classList.add('active');
}

document.getElementById("toggle-screenreader").addEventListener("click", () => {
  const button = document.getElementById("toggle-screenreader");
  const isActive = document.body.classList.toggle("screenreader-profile");
  button.classList.toggle('active', isActive);
  localStorage.setItem("screenreader-profile", isActive ? "true" : "false");
});

if (localStorage.getItem("screenreader-profile") === "true") {
  document.body.classList.add("screenreader-profile");
  document.getElementById("toggle-screenreader").classList.add('active');
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
  const button = document.getElementById("scale-content-toggle");
  const scaleApplied = document.body.classList.toggle("scale-content");
  button.classList.toggle('active', scaleApplied);

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
  const button = document.getElementById("readable-font-toggle");
  const isActive = document.body.classList.toggle("readable-font");
  button.classList.toggle('active', isActive);
});

// Highlight Titles
document.getElementById("highlight-titles-toggle").addEventListener("click", () => {
  const button = document.getElementById("highlight-titles-toggle");
  const isActive = document.body.classList.toggle("highlight-titles");
  button.classList.toggle('active', isActive);
});

// Highlight Links
document.getElementById("highlight-links-toggle").addEventListener("click", () => {
  const button = document.getElementById("highlight-links-toggle");
  const isActive = document.body.classList.toggle("highlight-links");
  button.classList.toggle('active', isActive);
});

// Text Alignment - these are mutually exclusive
document.getElementById("text-align-left-toggle").addEventListener("click", () => {
  const button = document.getElementById("text-align-left-toggle");
  document.body.style.textAlign = "left";
  // Remove active from other alignment buttons
  document.querySelectorAll('[id*="text-align"]').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
});

document.getElementById("text-align-center-toggle").addEventListener("click", () => {
  const button = document.getElementById("text-align-center-toggle");
  document.body.style.textAlign = "center";
  // Remove active from other alignment buttons
  document.querySelectorAll('[id*="text-align"]').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
});

document.getElementById("text-align-right-toggle").addEventListener("click", () => {
  const button = document.getElementById("text-align-right-toggle");
  document.body.style.textAlign = "right";
  // Remove active from other alignment buttons
  document.querySelectorAll('[id*="text-align"]').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
});

// Line Height
document.getElementById("line-height-toggle").addEventListener("click", () => {
  const button = document.getElementById("line-height-toggle");
  const isActive = document.body.classList.toggle("line-height-increase");
  button.classList.toggle('active', isActive);
});

// Letter Spacing
document.getElementById("letter-spacing-toggle").addEventListener("click", () => {
  const button = document.getElementById("letter-spacing-toggle");
  const isActive = document.body.classList.toggle("letter-spacing-increase");
  button.classList.toggle('active', isActive);
});

document.getElementById("focus-spotlight-toggle").addEventListener("click", () => {
  const button = document.getElementById("focus-spotlight-toggle");
  const isActive = document.body.classList.toggle("focus-spotlight-mode");
  button.classList.toggle('active', isActive);
});

document.getElementById("reduce-motion-toggle").addEventListener("click", () => {
  const button = document.getElementById("reduce-motion-toggle");
  const isActive = document.body.classList.toggle("reduce-motion-mode");
  button.classList.toggle('active', isActive);
});
// Contrast toggles - these are mutually exclusive
document.getElementById("dark-contrast-toggle").addEventListener("click", () => {
  const button = document.getElementById("dark-contrast-toggle");
  const isActive = document.body.classList.toggle("dark-contrast");
  button.classList.toggle('active', isActive);
  
  // Remove other contrast modes
  if (isActive) {
    document.body.classList.remove("light-contrast", "high-contrast");
    document.querySelectorAll('[id*="contrast-toggle"]').forEach(btn => {
      if (btn !== button) btn.classList.remove('active');
    });
  }
});

document.getElementById("light-contrast-toggle").addEventListener("click", () => {
  const button = document.getElementById("light-contrast-toggle");
  const isActive = document.body.classList.toggle("light-contrast");
  button.classList.toggle('active', isActive);
  
  // Remove other contrast modes
  if (isActive) {
    document.body.classList.remove("dark-contrast", "high-contrast");
    document.querySelectorAll('[id*="contrast-toggle"]').forEach(btn => {
      if (btn !== button) btn.classList.remove('active');
    });
  }
});

document.getElementById("high-contrast-toggle").addEventListener("click", () => {
  const button = document.getElementById("high-contrast-toggle");
  const isActive = document.body.classList.toggle("high-contrast");
  button.classList.toggle('active', isActive);
  
  // Remove other contrast modes
  if (isActive) {
    document.body.classList.remove("dark-contrast", "light-contrast");
    document.querySelectorAll('[id*="contrast-toggle"]').forEach(btn => {
      if (btn !== button) btn.classList.remove('active');
    });
  }
});

document.getElementById("high-saturation-toggle").addEventListener("click", () => {
  const button = document.getElementById("high-saturation-toggle");
  const isActive = document.body.classList.toggle("high-saturation");
  button.classList.toggle('active', isActive);
});

document.getElementById("text-color-toggle").addEventListener("click", () => {
  const button = document.getElementById("text-color-toggle");
  const isActive = document.body.classList.toggle("adjust-text-color");
  button.classList.toggle('active', isActive);
});

document.getElementById("monochrome-toggle").addEventListener("click", () => {
  const button = document.getElementById("monochrome-toggle");
  const isActive = document.body.classList.toggle("monochrome-mode");
  button.classList.toggle('active', isActive);
});
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

// Initialize widget when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkDomainRegistration);
} else {
  checkDomainRegistration();
}
}
