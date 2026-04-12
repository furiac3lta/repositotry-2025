/* THEME */
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(mode) {
  document.documentElement.className = mode;
  localStorage.setItem("theme", mode);
  themeIcon.className = mode === "dark" ? "ri-sun-fill" : "ri-moon-clear-fill";
}

let savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  savedTheme = savedTheme === "light" ? "dark" : "light";
  applyTheme(savedTheme);
});


/* TRANSLATIONS */
const translations = {
  es: {
    titleDev: "ColumTech",
    subtitle: "Portal principal para centralizar proyectos y accesos bajo columtech.com.ar."
  },
  en: {
    titleDev: "ColumTech",
    subtitle: "Main portal to centralize projects and access points under columtech.com.ar."
  }
};

let lang = localStorage.getItem("lang") || "es";

function applyLang(l) {
  document.querySelectorAll("[data-key]").forEach(el => {
    el.textContent = translations[l][el.dataset.key];
  });
  localStorage.setItem("lang", l);
}

applyLang(lang);

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "es" ? "en" : "es";
  applyLang(lang);
});


/* TERMINAL */
const lines = [
  "$ run columtech",
  "> nginx: publicando columtech.com.ar...",
  "> rutas: cargando /proyectos...",
  "> municipio: montando /proyecto/municipio/...",
  "> sistema listo ✔",
  "> iniciando portal..."
];

let i = 0, j = 0;
const term = document.getElementById("terminalContent");

function type() {
  if (i >= lines.length) return;

  if (j === 0) term.innerHTML += `<div id="l${i}"></div>`;

  const el = document.getElementById(`l${i}`);
  el.textContent = lines[i].slice(0, j + 1);
  j++;

  if (j < lines[i].length) {
    setTimeout(type, 40);
  } else {
    j = 0;
    i++;
    setTimeout(type, 200);
  }
}

type();
