// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';


// class Timer {
//   constructor() {
//     this.intervalId = null;
//     this.isActive = false;
//   }

//   start(selectedDate, currentDate) {
//     this.isActive = true;
//     updateTimer(selectedDate - currentDate);
//     currentDate += 1000;


//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   }

//   convertMs(ms) {


//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;


// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     refs.startBtn.setAttribute('disabled', 'disabled');
//     selectedDate = selectedDates[0].getTime();
//     currentDate = new Date().getTime();

//     if (selectedDate < currentDate) {
      
//       Notiflix.Notify.failure('Please choose a date in the future');
//       return;
//     }

//     refs.startBtn.removeAttribute('disabled');
//   },
// };


// const onStartBtnClick = () => {
 
//   timer.start(selectedDate, currentDate);
//   refs.stopBtn.textContent = 'Stop';

 
// };
// const addLeadingZero = value => {
//   return String(value).padStart(2, '0');
// };

// flatpickr('#datetime-picker', options);
// refs.startBtn.addEventListener('click', onStartBtnClick);
// refs.stopBtn.addEventListener('click', onStopBtnClick);

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notiflix.Notify.init({ position: 'center-top' });

const dateInputEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const daysFieldEl = document.querySelector('[data-days]');
const hoursFieldEl = document.querySelector('[data-hours]');
const minutesFieldEl = document.querySelector('[data-minutes]');
const secondsFieldEl = document.querySelector('[data-seconds]');
let selectedDate;
let timerId;

startButtonEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      if (selectedDate.getTime() > options.defaultDate.getTime()) {
        startButtonEl.disabled = false;
      } else {
        startButtonEl.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
      }
    },
  };

const fp = flatpickr(dateInputEl, options);

const handleOnStartClick = () => {
    timerId = setInterval(() => {
    const currentDate = new Date();
    const ms = selectedDate.getTime() - currentDate.getTime();
    if (selectedDate.getTime() <= currentDate.getTime()) {
        clearInterval(timerId);
        return;
    }
    const timeLeft = convertMs(ms);
    daysFieldEl.textContent = addLeadingZero(timeLeft.days);
    hoursFieldEl.textContent = addLeadingZero(timeLeft.hours); 
    minutesFieldEl.textContent = addLeadingZero(timeLeft.minutes);
    secondsFieldEl.textContent = addLeadingZero(timeLeft.seconds);   
    }, 1000)
    startButtonEl.setAttribute("disabled","");
}

startButtonEl.addEventListener('click', handleOnStartClick);

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

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
  }



// let selectedDate = null;
// let currentDate = null;
// let intervalId = null;
// let isActive = false;

// const convertMs = ms => {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// };

// const timer = (begin, end) => {
//   intervalId = setInterval(() => {
//     let remainder = end - begin;
//     begin += 1000;
//     if (remainder <= 0) {
//       clearInterval(intervalId);
//       return;
//     }

//     const time = convertMs(remainder);
//     refs.days.textContent = addLeadingZero(time.days);
//     refs.hours.textContent = addLeadingZero(time.hours);
//     refs.minutes.textContent = addLeadingZero(time.minutes);
//     refs.seconds.textContent = addLeadingZero(time.seconds);
//   }, 1000);
// };