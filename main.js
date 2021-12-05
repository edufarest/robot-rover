"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
console.log('running');
rpi_gpio_1.default.setup(7, rpi_gpio_1.default.DIR_OUT);
let val = true;
setInterval(() => {
    val = !val;
    rpi_gpio_1.default.write(7, val);
}, 1000);
