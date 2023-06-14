import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", formSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
};


function formSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount }
  } = evt.currentTarget;

  let amountValue = Number(amount.value);
  let delayValue = Number(delay.value);
  console.log(amountValue);
  console.log(delayValue);
  for (let i = 0; i < amountValue; i++) {

    createPromise(i + 1, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        return delay + step.value;
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += Number(step.value);
  };

  evt.currentTarget.reset();
};


// Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Попередження');
// Notiflix.Notify.info('Інфо');
