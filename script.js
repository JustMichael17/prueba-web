// Pasos de la "ejecución depurada".
// Cada paso dice: qué línea se ilumina, qué variables hay,
// qué sale en consola y qué explicar.
const STEPS = [
  {
    line: null,
    vars: {},
    console: "",
    text: "El depurador es una lupa para tu programa. Lo corre despacio y te deja mirar dentro.",
    breakpoint: 5
  },
  {
    line: 3,
    vars: { x: 5 },
    console: "",
    text: "Paso 1. Entra en main. Crea la variable x y guarda 5."
  },
  {
    line: 4,
    vars: { x: 5, y: 3 },
    console: "",
    text: "Paso 2. Crea y y guarda 3. Ya hay dos variables en memoria."
  },
  {
    line: 5,
    vars: { x: 5, y: 3 },
    console: "",
    text: "Breakpoint. Pusimos una parada en la línea 5. El depurador se detiene antes de llamar a suma."
  },
  {
    line: 8,
    vars: { x: 5, y: 3, a: 5, b: 3 },
    console: "",
    text: "Paso dentro (Step Into). Saltamos al método suma. a copia 5, b copia 3."
  },
  {
    line: 9,
    vars: { x: 5, y: 3, a: 5, b: 3 },
    console: "",
    text: "Suma a + b = 8. Este valor se devolverá a quien llamó."
  },
  {
    line: 5,
    vars: { x: 5, y: 3, total: 8 },
    console: "",
    text: "Volvemos (Step Return). total recibe el 8 que devolvió suma."
  },
  {
    line: 6,
    vars: { x: 5, y: 3, total: 8 },
    console: "8",
    text: "Imprime total. En la consola aparece 8."
  },
  {
    line: 7,
    vars: { x: 5, y: 3, total: 8 },
    console: "8",
    text: "Fin. main termina. El programa ha acabado y vimos cada paso por dentro."
  }
];

let i = 0;
let timer = null;

const codeLines = document.querySelectorAll(".code .line");
const varsBody = document.getElementById("vars-body");
const consoleEl = document.getElementById("console");
const explainEl = document.getElementById("explain");

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnPlay = document.getElementById("btn-play");
const btnReset = document.getElementById("btn-reset");

function render() {
  const step = STEPS[i];

  // Línea actual
  codeLines.forEach((el) => {
    const n = Number(el.dataset.line);
    el.classList.toggle("current", step.line === n);
    el.classList.toggle("breakpoint", step.breakpoint === n);
  });

  // Variables
  const names = Object.keys(step.vars);
  if (names.length === 0) {
    varsBody.innerHTML = '<tr><td colspan="2" class="empty">— aún nada —</td></tr>';
  } else {
    varsBody.innerHTML = names
      .map((n) => `<tr class="flash"><td>${n}</td><td>${step.vars[n]}</td></tr>`)
      .join("");
  }

  // Consola
  consoleEl.textContent = step.console || "";

  // Explicación
  explainEl.textContent = step.text;

  // Botones
  btnPrev.disabled = i === 0;
  btnNext.disabled = i === STEPS.length - 1;
}

function next() {
  if (i < STEPS.length - 1) { i++; render(); }
}
function prev() {
  if (i > 0) { i--; render(); }
}
function reset() {
  stopAuto();
  i = 0;
  render();
}

function stopAuto() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    btnPlay.textContent = "▶ Auto";
  }
}
function toggleAuto() {
  if (timer) { stopAuto(); return; }
  btnPlay.textContent = "⏸ Pausa";
  timer = setInterval(() => {
    if (i >= STEPS.length - 1) { stopAuto(); return; }
    next();
  }, 1800);
}

btnNext.addEventListener("click", () => { stopAuto(); next(); });
btnPrev.addEventListener("click", () => { stopAuto(); prev(); });
btnPlay.addEventListener("click", toggleAuto);
btnReset.addEventListener("click", reset);

render();
