const circle1 = document.querySelector('.ring1');
const circle2 = document.querySelector('.ring2');
const wrapper = document.querySelector('.wrapper');
const failDiv = document.querySelector('.fail-div');
const restartBtn = document.querySelector('#restart-btn');

let keyEvents = [];
let firstKeyPressTime1 = null;
let firstKeyPressTime2 = null;
let cnt = 0;

const handleKeydown = (event) => {
    if (event.key === 'Shift' && event.location === 1) {
        circle1.style.transform = 'scale(1.5)';
        firstKeyPressTime2 = null;
        if (firstKeyPressTime1 === null) {
            keyEvents = [];
            // Record the timestamp of the first key press
            firstKeyPressTime1 = new Date().getTime();
            cnt = 0;
        } else {
            // Calculate the time difference
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - firstKeyPressTime1;
            keyEvents[cnt] = timeDifference;
            console.log('Time difference1:', timeDifference, 'ms');
            console.log(keyEvents);

            // Reset the firstKeyPressTime1 for the next key press
            firstKeyPressTime1 = currentTime;
            cnt ++;
        }
    } else if (event.key === 'Shift' && event.location === 2) {
        circle2.style.transform = 'scale(1.5)';
        firstKeyPressTime1 = null;
        if (firstKeyPressTime2 === null) {
            // Record the timestamp of the first key press
            firstKeyPressTime2 = new Date().getTime();
            cnt = 0;
        } else {
            // Calculate the time difference
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - firstKeyPressTime2;
            console.log('Time difference2:', timeDifference, 'ms');
            console.log(keyEvents);
            console.log(keyEvents[cnt], timeDifference);
            if (keyEvents[cnt]+40 < timeDifference || keyEvents-40 > timeDifference) {
                wrapper.style.display = 'none';
                failDiv.style.display = 'block';
            }
            // Reset the firstKeyPressTime2 for the next key press
            firstKeyPressTime2 = currentTime;
            cnt ++;
        }
    }
}

const handleKeyUp = (event) => {
    if (event.key === 'Shift' && event.location === 1) {
        circle1.style.transform = 'scale(1)';
    } else if (event.key === 'Shift' && event.location === 2) {
        circle2.style.transform = 'scale(1)';
    }
}

const restart = () => {
    wrapper.style.display = 'block';
    failDiv.style.display = 'none';
}

document.addEventListener('keydown', handleKeydown);
document.addEventListener('keyup', handleKeyUp);

restartBtn.addEventListener('click', restart);