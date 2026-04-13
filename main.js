const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(mode) {
  document.documentElement.className = mode;
  localStorage.setItem("theme", mode);
  themeIcon.className = mode === "dark" ? "ri-sun-line" : "ri-moon-clear-line";
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const nextTheme = document.documentElement.className === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

const lines = [
  "$ audit --target empresa.com",
  "> superficie relevada: sitio web, login, formularios y panel admin",
  "> hallazgos detectados: configuraciones debiles y puntos de exposicion",
  "> informe generado: impacto, prioridad y plan de mejora",
  "> opcion habilitada: correccion tecnica y desarrollo de nuevas soluciones",
  "> estado: listo para presentar propuesta comercial"
];

let lineIndex = 0;
let charIndex = 0;
const terminal = document.getElementById("terminalContent");

function typeTerminal() {
  if (lineIndex >= lines.length) {
    return;
  }

  if (charIndex === 0) {
    terminal.innerHTML += `<div id="line-${lineIndex}"></div>`;
  }

  const lineElement = document.getElementById(`line-${lineIndex}`);
  lineElement.textContent = lines[lineIndex].slice(0, charIndex + 1);
  charIndex += 1;

  if (charIndex < lines[lineIndex].length) {
    setTimeout(typeTerminal, 24);
    return;
  }

  charIndex = 0;
  lineIndex += 1;
  setTimeout(typeTerminal, 280);
}

typeTerminal();
