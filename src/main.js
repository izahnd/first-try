import "./style.css";
import Footer from "./footer";

// Build the page layout (header / calculator / footer)
document.querySelector("#app").innerHTML = `
  <header class="bar">
    <h1 class="title">Hello Yuliia</h1>
  </header>

  <main class="main">
    <section class="calc" aria-label="Calculator">
      <input id="screen" class="screen" type="text" value="0" readonly />

      <div class="grid">
        <button data-action="clear">C</button>
        <button data-action="back">⌫</button>
        <button data-value="(">(</button>
        <button data-value=")">)</button>

        <button data-value="7">7</button>
        <button data-value="8">8</button>
        <button data-value="9">9</button>
        <button data-value="/">÷</button>

        <button data-value="4">4</button>
        <button data-value="5">5</button>
        <button data-value="6">6</button>
        <button data-value="*">×</button>

        <button data-value="1">1</button>
        <button data-value="2">2</button>
        <button data-value="3">3</button>
        <button data-value="-">−</button>

        <button data-value="0" class="wide">0</button>
        <button data-value=".">.</button>
        <button data-value="+">+</button>

        <button data-action="equals" class="wide">=</button>
      </div>
    </section>
  </main>
  ${Footer()}`;
// --- Calculator logic ---
const screen = document.getElementById("screen");
const today = document.getElementById("today");

// Show current date in footer
function renderDate() {
  const d = new Date();
  today.textContent = d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
renderDate();

// Update calculator screen
function setScreen(val) {
  screen.value = val;
}

// Append character to screen
function appendToScreen(ch) {
  if (screen.value === "0" && /[0-9.]/.test(ch)) {
    setScreen(ch === "." ? "0." : ch);
  } else {
    setScreen(screen.value + ch);
  }
}

// Safely evaluate math expression
function safeEval(expr) {
  // Allow only digits, spaces, parentheses and operators
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) return "Error";
  try {
    const result = Function('"use strict"; return (' + expr + ")")();
    if (Number.isFinite(result)) return String(result);
    return "Error";
  } catch {
    return "Error";
  }
}

// Handle button clicks
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    const action = btn.getAttribute("data-action");

    if (action === "clear") return setScreen("0");

    if (action === "back") {
      const v = screen.value;
      return setScreen(v.length <= 1 ? "0" : v.slice(0, -1));
    }

    if (action === "equals") return setScreen(safeEval(screen.value));

    if (value) appendToScreen(value);
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") setScreen(safeEval(screen.value));
  if (e.key === "Escape") setScreen("0");

  // Optional: allow typing numbers/operators
  if (/^[0-9+\-*/().]$/.test(e.key)) appendToScreen(e.key);

  if (e.key === "Backspace") {
    const v = screen.value;
    setScreen(v.length <= 1 ? "0" : v.slice(0, -1));
  }
});
