const terminalElement = document.getElementById("funFact");

const phrasesByTime = {
  morning: "🟢 Starting the day with coffee and code...",
  afternoon: "💾 Time to debug life and compile dreams.",
  night: "🌙 Nights are for commits, comics, and curiosity."
};

const commands = [
  "> Carlos@portfolio:~$ python skills.py",
  "> Loading skills...",
  "> Python | Docker | Linux | Git | Comics | Good_conversations = True",
  '> Carlos@portfolio:~$ echo "Always learning, always creating."',
  "> Always learning, always creating."
];

function getPhraseByTime() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return phrasesByTime.morning;
  if (hour >= 12 && hour < 20) return phrasesByTime.afternoon;
  return phrasesByTime.night;
}

function typeLine(text, delay = 50) {
  return new Promise(resolve => {
    let i = 0;
    const line = document.createElement("div");
    terminalElement.appendChild(line);

    const interval = setInterval(() => {
      line.textContent += text.charAt(i);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, delay);
  });
}

async function showTerminal() {
  terminalElement.innerHTML = "";
  const intro = document.createElement("div");
  intro.textContent = getPhraseByTime();
  intro.classList.add("mb-3");
  terminalElement.appendChild(intro);
  for (const command of commands) {
    await typeLine(command);
  }

  const cursor = document.createElement("span");
  cursor.className = "blinking-cursor";
  cursor.textContent = "_";
  terminalElement.appendChild(cursor);
}

window.onload = showTerminal;
