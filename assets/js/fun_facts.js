const terminalElement = document.getElementById("funFact");

const frasesPorHora = {
  manana: "🟢 Iniciando el día con café y código...",
  tarde: "💾 Hora de debuggear la vida y compilar sueños.",
  noche: "🌙 Noche de commits, cómics y curiosidades."
};

const comandos = [
  "> Carlos@portfolio:~$ python skills.py",
  "> Cargando habilidades...",
  "> Python | Docker | Linux | Git | Comics | Buenas_conversaciones = True",
  "> Carlos@portfolio:~$ echo \"Siempre aprendiendo, siempre creando.\"",
  "> Siempre aprendiendo, siempre creando."
];

function obtenerFrasePorHora() {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 12) return frasesPorHora.manana;
  if (hora >= 12 && hora < 20) return frasesPorHora.tarde;
  return frasesPorHora.noche;
}

function escribirLinea(texto, delay = 50) {
  return new Promise(resolve => {
    let i = 0;
    const linea = document.createElement("div");
    terminalElement.appendChild(linea);

    const intervalo = setInterval(() => {
      linea.textContent += texto.charAt(i);
      i++;
      if (i === texto.length) {
        clearInterval(intervalo);
        resolve();
      }
    }, delay);
  });
}

async function mostrarTerminal() {
  terminalElement.innerHTML = "";
  const intro = document.createElement("div");
  intro.textContent = obtenerFrasePorHora();
  intro.classList.add("mb-3");
  terminalElement.appendChild(intro);
  for (const comando of comandos) {
    await escribirLinea(comando);
  }

  const cursor = document.createElement("span");
  cursor.className = "blinking-cursor";
  cursor.textContent = "_";
  terminalElement.appendChild(cursor);
}

window.onload = mostrarTerminal;
