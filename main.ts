import GPIO from "rpi-gpio";

console.log('running');

GPIO.setup(7, GPIO.DIR_OUT);

let val = true;

setInterval(() => {
    val = !val;
    GPIO.write(7, val);
}, 1000)