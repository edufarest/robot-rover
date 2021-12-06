import GPIO from "rpi-gpio";

console.log('running');

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

let stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key.toString() === '\u0003' ) {
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
        
  }

  // write the key to stdout all normal like
  process.stdout.write( key );
  console.log(key);
});

const move = (left: boolean, right: boolean) => {
    console.log('start');
    // Left
    GPIO.write(lFwdPin, left);
    GPIO.write(lBwdPin, !left);
    // Right
    GPIO.write(rFwdPin, right);
    GPIO.write(rBwdPin, !right);
    setTimeout(() => {
        console.log('stop');
        GPIO.write(lFwdPin, false);
        GPIO.write(lBwdPin, false);
        GPIO.write(rFwdPin, false);
        GPIO.write(rBwdPin, false);
    }, 200)
}