import GPIO from "rpi-gpio";

console.log('running');

// True Forward - False Backwards

let lDir = true;
let rDir = true; 

const lFwdPin = 35;
const lBwdPin = 37;

const rFwdPin = 36;
const rBwdPin = 38;

const pins = [lFwdPin, lBwdPin, rFwdPin, rBwdPin];

// Enable pins and set to off
pins.forEach(pin => {
    GPIO.setup(pin, GPIO.DIR_OUT);
    GPIO.write(pin, false);
})

let stdin = process.openStdin();

stdin.addListener('data', d => {
    console.log(d);
})