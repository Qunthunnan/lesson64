export default function timers({days, hours, minutes, seconds, endDate}) {
    //Timer
    function zeroTime(num) {
        if(num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getTimeDifference(endTime) {
        const difference = new Date(endTime.getTime() - new Date().getTime());
        if(difference > 0) {
            return {
                days: zeroTime(difference.getDate()),
                hours: zeroTime(difference.getHours()),
                minutes: zeroTime(difference.getMinutes()),
                seconds: zeroTime(difference.getSeconds()),
            }
        } else {
            return {
                days: '0',
                hours: '0',
                minutes: '0',
                seconds: '0',
            }
        }
    }

    function timeUpdater(endTime) {
        const dayElem = document.querySelector(days),
            hourElem = document.querySelector(hours),
            minuteElem = document.querySelector(minutes),
            secondElem = document.querySelector(seconds);

        document.querySelector('[data-endday]').innerText = endTime.toLocaleTimeString('ua-UA', {
            day: '2-digit',
            month: 'long'
        });

        updateTime();
        let intervalId = setInterval(updateTime, 1000);

        function updateTime() {
            let resultTimer = getTimeDifference(endTime);
            if(resultTimer.days === '0' && resultTimer.hours === '0' && resultTimer.minutes === '0' && resultTimer.seconds === '0') {
                clearInterval(intervalId);
            }

            dayElem.innerText = resultTimer.days;
            hourElem.innerText = resultTimer.hours;
            minuteElem.innerText = resultTimer.minutes;
            secondElem.innerText = resultTimer.seconds;
        }
    }

    let endTime = new Date(endDate);
    timeUpdater(endTime);
}