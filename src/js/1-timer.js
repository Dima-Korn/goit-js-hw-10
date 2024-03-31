import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.getElementById('datetime-picker');

let userSelectedDate;

function onClose(selectedDates) {
  userSelectedDate = selectedDates[0];
  const now = new Date();
  if (userSelectedDate < now) {
    startBtn.disabled = true;
    iziToast.warning({
      title: 'Warning',
      message: 'Please choose a date in the future'
    });
  } else {
    startBtn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onClose
  });
});

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

function updateTimer() {
  const now = new Date().getTime();
  const selectedDate = userSelectedDate.getTime();
  let difference = selectedDate - now;
  
  if (difference <= 0) {
    clearInterval(timerInterval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);
  
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

let timerInterval;

startBtn.addEventListener('click', function() {
  startBtn.disabled = true;
  datetimePicker.disabled = true;
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
