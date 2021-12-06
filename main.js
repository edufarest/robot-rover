"use strict";
// import GPIO from "rpi-gpio";
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
// pins.forEach(pin => {
//     GPIO.setup(pin, GPIO.DIR_OUT);
//     GPIO.write(pin, false);
// })
let stdin = process.stdin;
// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);
// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
// i don't want binary, do you?
stdin.setEncoding('utf8');
// on any data into stdin
stdin.on('data', function (key) {
    // ctrl-c ( end of text )
    if (key.toString() === '\u0003') {
        process.exit();
    }
    // write the key to stdout all normal like
    process.stdout.write(key);
});
