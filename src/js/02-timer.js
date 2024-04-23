// Importă biblioteca 'flatpickr' și o denumește flatpickr:
import flatpickr from 'flatpickr';
// Importă fișierul CSS asociat bibliotecii Flatpickr pentru a aplica stiluri componente:
import 'flatpickr/dist/flatpickr.min.css';
// Importă Notiflix pentru a afișa notificări:
import Notiflix from 'notiflix';
// Folosim calendar românesc:
import { Romanian } from 'flatpickr/dist/l10n/ro';
flatpickr.localize(Romanian);

// Selectăm elementul în document care are atributul data-start:
const startButton = document.querySelector('[data-start]');

// Funcție pentru adăugarea de zero în fața valorii dacă aceasta este mai mică decât 10:
function addLeadingZero(value) {
  // Folosim metoda padStart pentru a adăuga zero-uri la începutul șirului până când acesta are lungimea 2:
  return String(value).padStart(2, '0');
}

// Configurarea opțiunilor pentru Flatpickr:
const options = {
  enableTime: true, // Activează selecția orei în calendar.
  time_24hr: true, // Folosește formatul de 24 de ore.
  defaultDate: new Date(), // Setează data implicită la data și ora curentă.
  minuteIncrement: 1, // Setează incrementul de minute la 1.

  // Funcție apelată când se închide calendarul, primește lista de date selectate:
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Verificăm dacă data selectată este în viitor:
    if (selectedDate < new Date()) {
      // Afișează notificare de eroare și dezactivează butonul de start:
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.setAttribute('disabled', 'true');
    } else {
      // Activează butonul de start dacă data selectată este în viitor:
      startButton.removeAttribute('disabled');

      // Dezactivăm calendarul după ce a fost selectată o dată validă:
      flatpickr('#datetime-picker').destroy();
    }
  },
};

// Inițializăm Flatpickr pe elementul cu id-ul datetime-picker folosind opțiunile configurate:
const fp = flatpickr('#datetime-picker', options);

// Adaugăm un EventListener care apelează funcția startTimer când butonul de start este apăsat:
startButton.addEventListener('click', startTimer);

// Funcție apelată atunci când butonul de start este apăsat:
function startTimer() {
  // Obține data selectată în milisecunde:
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  ).getTime();

  // Inițializăm intervalul de actualizare a cronometrului la fiecare secundă:
  const timerInterval = setInterval(updateTimer, 1000);

  // Dezactivăm butonul de start după ce a fost apăsat:
  startButton.setAttribute('disabled', 'true');

  // Dezactivăm calendarul după ce a fost pornit cronometrul:
  fp.destroy();

  // Funcție apelată la fiecare secundă pentru actualizarea cronometrului:
  function updateTimer() {
    const currentDate = new Date().getTime();
    const timeDifference = selectedDate - currentDate;

    // Dacă diferența de timp este mai mică sau egală cu zero, oprește cronometrul și actualizează interfața:
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      // Converteste diferența de timp în zile, ore, minute și secunde și actualizează interfața:
      const timeObject = convertMs(timeDifference);
      updateInterface(timeObject);
    }
  }

  // Funcție pentru actualizarea interfeței cu valori de zile, ore, minute și secunde:
  function updateInterface({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }

  // Funcție pentru conversia milisecundelor în obiect cu zile, ore, minute și secunde:
  function convertMs(ms) {
    // Numar de milisecunde pe unitatea de timp:
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Zile rămase:
    const days = Math.floor(ms / day);
    // Ore rămase:
    const hours = Math.floor((ms % day) / hour);
    // Minute rămase:
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Secunde rămase:
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}
