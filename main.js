"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
console.log('running');
const lFwdPin = 35;
const lBwdPin = 37;
const rFwdPin = 36;
const rBwdPin = 38;
const pins = [lFwdPin, lBwdPin, rFwdPin, rBwdPin];
// Enable pins and set to off
pins.forEach(pin => {
    rpi_gpio_1.default.setup(pin, rpi_gpio_1.default.DIR_OUT);
    // GPIO.write(pin, false); This doesnt work
});
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
    switch (key.toString()) {
        case 'w':
            move(true, true);
            break;
        case 's':
            move(false, false);
            break;
        case 'a':
            move(true, false);
            break;
        case 'd':
            move(false, true);
            break;
        case ' ':
            stop();
            break;
    }
    // write the key to stdout all normal like
    process.stdout.write(key);
    console.log(key);
});
const move = (left, right) => {
    console.log('start');
    // Left
    rpi_gpio_1.default.write(lFwdPin, left);
    rpi_gpio_1.default.write(lBwdPin, !left);
    // Right
    rpi_gpio_1.default.write(rFwdPin, right);
    rpi_gpio_1.default.write(rBwdPin, !right);
    setTimeout(() => {
        if (left !== right) {
            stop();
        }
    }, 200);
};
const stop = () => {
    rpi_gpio_1.default.write(lFwdPin, false);
    rpi_gpio_1.default.write(lBwdPin, false);
    rpi_gpio_1.default.write(rFwdPin, false);
    rpi_gpio_1.default.write(rBwdPin, false);
};
