// Importăm modulul Notiflix și îl atribuim variabilei notiflix:
import Notiflix from 'notiflix';

// Eliminăm iconița implicită din cartușul de afișare Notiflix:
Notiflix.Notify.init({
  useIcon: false,
});

// Selecționăm elementul cu clasa '.form' și îl atribuim variabilei form:
const form = document.querySelector('.form');

// Adăugăm un EventListener pentru evenimentul de submit al formularului:
form.addEventListener('submit', function (event) {
  // Oprim comportamentul implicit al formularului (trimiterea și reîncărcarea paginii):
  event.preventDefault();

  // Extragem și transformam în numere întregi valorile din câmpurile formularului:
  const firstDelay = parseInt(document.querySelector('[name="delay"]').value);
  const step = parseInt(document.querySelector('[name="step"]').value);
  const amount = parseInt(document.querySelector('[name="amount"]').value);

  // Iterăm prin numărul specificat de promisiuni:
  for (let i = 1; i <= amount; i++) {
    // Calculăm delay-ul curent bazat pe primul delay și pe pas:
    const currentDelay = firstDelay + (i - 1) * step;

    // Creăm o promisiune utilizând funcția createPromise și atașăm funcțiile de rezolvare și respingere:
    createPromise(i, currentDelay)
      .then(handleFulfilledPromise)
      .catch(handleRejectedPromise);
  }
});

// Definim o funcție care returnează o promisiune:
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Generăm aleatoriu dacă promisiunea ar trebui să fie rezolvată sau respinsă:
    const shouldResolve = Math.random() > 0.3;

    // Stabilim un timeout pentru a simula o operațiune asincronă:
    setTimeout(() => {
      // Rezolvăm sau respingem promisiunea în funcție de valoarea generată aleatoriu:
      shouldResolve
        ? resolve({ position, delay })
        : reject({ position, delay });
    }, delay);
  });
}

// Funcție pentru gestionarea promisiunilor rezolvate cu succes:
function handleFulfilledPromise({ position, delay }) {
  // Afișăm o notificare de succes utilizând Notiflix:
  Notiflix.Notify.success(`✔️ Fulfilled promise ${position} in ${delay}ms`);
}

// Funcție pentru gestionarea promisiunilor respinse:
function handleRejectedPromise({ position, delay }) {
  // Afișăm o notificare de eșec utilizând Notiflix:
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
