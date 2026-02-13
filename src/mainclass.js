export default function MainClass() {
  return `
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
  </main>`;
}