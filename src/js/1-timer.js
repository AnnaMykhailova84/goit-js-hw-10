/* Описаний в документації */
import flatpickr from 'flatpickr';
/* Додатковий імпорт стилів */
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = new Date();
    const selectedDate = selectedDates[0];
    if (selectedDate <= now) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        close: false,
        progressBar: false,
        timeout: '3000',
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: '20',
        icon: 'material-icons',
        iconText: 'X',
        iconColor: 'white',
      });
      userSelectedDate = null;
      return;
    }
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(dateInput, options);

let timerId = null;

startBtn.disabled = true;

startBtn.addEventListener('click', start);

function start() {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  dateInput.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const deltaTime = userSelectedDate - now;
    console.log(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimer(0);
      dateInput.disabled = false;
      return;
    }

    updateTimer(deltaTime);
  }, 1000);
  // console.log(`timerId = ${timerId}`);
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
