// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;
  // console.log(state);  

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        close: false,
        progressBar: false,
        timeout: '3000',
        backgroundColor: '#6fd66f',
        messageColor: 'white',
        messageSize: '18',
        icon: 'material-icons',
        iconText: '✅',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        close: false,
        progressBar: false,
        timeout: '3000',
        backgroundColor: '#e49898',
        messageColor: 'white',
        messageSize: '18',
        icon: 'material-icons',
        iconText: '❌',
      });
    });

  form.reset();
});