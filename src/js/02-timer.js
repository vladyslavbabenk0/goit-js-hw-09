import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector("button[data-start]");
let daysEl = document.querySelector("[data-days]");
let hoursEl = document.querySelector("[data-hours]");
let minutesEl = document.querySelector("[data-minutes]");
let secondsEl = document.querySelector("[data-seconds]");

btnStart.disabled = true;
let timerID;
btnStart.addEventListener("click", onClickStartTime);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        let pickedDate = selectedDates[0].getTime();
        // const nowDate = new Date();

        if (pickedDate < Date.now()) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            btnStart.disabled = false;
        };
    },
};

const calendarFP = flatpickr(inputEl, options);


function onClickStartTime() {
    let pickedDate = calendarFP.selectedDates[0].getTime();
    timerID = setInterval(() => {
        let delta = pickedDate - Date.now();
        console.log(convertMs(delta));

        if (delta < 1000 && delta > 0) {
            clearInterval(timerID);
        }
    }, 1000);

};


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    let days = Math.floor(ms / day);
    daysEl.innerText = days.toString().padStart(2, '0');
    // Remaining hours
    let hours = Math.floor((ms % day) / hour);
    hoursEl.innerText = hours.toString().padStart(2, '0');
    // Remaining minutes
    let minutes = Math.floor(((ms % day) % hour) / minute);
    minutesEl.innerText = minutes.toString().padStart(2, '0');
    // Remaining seconds
    let seconds = Math.floor((((ms % day) % hour) % minute) / second);
    secondsEl.innerText = seconds.toString().padStart(2, '0');

    return { days, hours, minutes, seconds };
};
