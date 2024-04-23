// Funcția care generează o culoare aleatoare în format hex:
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

// Se obțin referințe către butoanele "Start" și "Stop":
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Variabilă pentru a stoca intervalul de schimbare a culorii:
let colorChangeInterval = null;

// Adaugă un ascultător de eveniment pentru clic pe butonul "Start":
startBtn.addEventListener('click', startColorChange);
// Adaugă un ascultător de eveniment pentru clic pe butonul "Stop":
stopBtn.addEventListener('click', stopColorChange);

// Funcția apelată la clic pe butonul "Start":
function startColorChange() {
  // Dezactivează butonul "Start":
  startBtn.disabled = true;
  // Activează butonul "Stop":
  stopBtn.disabled = false;

  // Setează un interval care schimbă culoarea de fundal o dată pe secundă:
  colorChangeInterval = setInterval(changeBackgroundColor, 1000);
}

// Funcția apelată la clic pe butonul "Stop":
function stopColorChange() {
  // Activează butonul "Start":
  startBtn.disabled = false;
  // Dezactivează butonul "Stop":
  stopBtn.disabled = true;

  // Oprește intervalul de schimbare a culorii de fundal:
  clearInterval(colorChangeInterval);
}

// Funcția care schimbă culoarea de fundal la o valoare aleatoare:
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
