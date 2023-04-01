/**
 * use for RGB-LED
 */
enum COLOR {
    //% block=red
    red,
    //% block=green
    green,
    //% block=blue
    blue,
    //% block=white
    white,
    //% block=black
    black
}
/**
  * Pre-Defined LED colours
  */
enum vColors {
    //% block=red
    Red = 0xff0000,
    //% block=orange
    Orange = 0xffa500,
    //% block=yellow
    Yellow = 0xffff00,
    //% block=green
    Green = 0x00ff00,
    //% block=blue
    Blue = 0x0000ff,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xff00ff,
    //% block=white
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}
/**
 * use for control motor
 */
enum DIR {
    //% block="Run_forward"
    Run_forward = 0,
    //% block="Run_back"
    Run_back = 1,
    //% block="Turn_Left"
    Turn_Left = 2,
    //% block="Turn_Right"
    Turn_Right = 3
}
enum LR {
    //% block="Upper_left"
    Upper_left = 0,
    //% block="Lower_left"
    Lower_left = 1,
    //% block="Upper_right"
    Upper_right = 2,
    //% block="Lower_right"
    Lower_right = 3,
}
enum MotorState {
    //% block="stop"
    stop = 0,
    //% block="brake"
    brake = 1
}
enum MD {
    //% block="Forward"
    Forward = 0,
    //% block="Back"
    Back = 1
}

enum LT {
    //% block="Left"
    Left,
    //% block="Right"
    Right,
    //% block="Center"
    Center
}

enum LedCount {
    //% block="Left"
    Left = 12,
    //% block="Right"
    Right = 13
}

enum LedState {
    //% block="ON"
    ON = 4095,
    //% block="OFF"
    OFF = 0
}

enum Servo_num {
    D14,
    D15
}

//% color="#ff6800" icon="\uf1b9" weight=15
//% groups="['General', 'Motor', 'Servo', 'led', 'Neo-pixel', 'Sensor', 'Tone']"
namespace mecanumRobotV2 {
    /**
     * use for control PCA9685
     */
    export enum Servos {
        D14 = 14,
        D15 = 15
    }

    const STC15_ADDRESS = 0x30;   //device address

    // function i2cRead(addr: number, reg: number) {
    //     pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
    //     let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
    //     return val;
    // }

    function i2cWrite(STC15_ADDRESS: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(STC15_ADDRESS, buf)
    }

    /**
    * Initialize robot
    */
    //% group="General" weight=96
    //% block="Initialize robot"
    export function initializeRobot() {
        irRemote.connectInfrared(DigitalPin.P0)
    }

    /**
    * Create led strip
    */
    //% block="Create led strip"
    //% group="General" weight=96
    //% blockSetVariable=leds
    export function createLedStrip(): neopixel.Strip {
        led.enable(false)
        let neopixelPin = neopixel.create(DigitalPin.P7, 4, NeoPixelMode.RGB)
        neopixelPin.clear()
        return neopixelPin
    }

    /**
     * set speed of motor
     */
    //% block="Motor $M run $D speed: $speed \\%"
    //% speed.min=0 speed.max=100
    //% group="Motor" weight=95
    export function Motor(M: LR, D: MD, speed: number) {
        // if (!PCA9685_Initialized) {
        //     init_PCA9685();
        // }
        let speed_value = Math.map(speed, 0, 100, 0, 255);
        //电机1
        //正转
        if (M == 2 && D == 1) {
            i2cWrite(0x30, 0x01, speed_value); //M1A
            i2cWrite(0x30, 0x02, 0); //M1B
        }
        //反转
        if (M == 2 && D == 0) {
            i2cWrite(0x30, 0x01, 0); //M1A
            i2cWrite(0x30, 0x02, speed_value); //M1B
        }

        //电机2
        if (M == 0 && D == 0) {
            i2cWrite(0x30, 0x03, 0); //M2A
            i2cWrite(0x30, 0x04, speed_value); //M2B
        }
        if (M == 0 && D == 1) {
            i2cWrite(0x30, 0x03, speed_value); //M2A
            i2cWrite(0x30, 0x04, 0); //M2B
        }
        //电机3
        if (M == 3 && D == 1) {
            i2cWrite(0x30, 0x05, speed_value); //M3A
            i2cWrite(0x30, 0x06, 0); //M3B
        }
        if (M == 3 && D == 0) {
            i2cWrite(0x30, 0x05, 0); //M3A
            i2cWrite(0x30, 0x06, speed_value); //M3B
        }
        //电机4
        if (M == 1 && D == 0) {
            i2cWrite(0x30, 0x07, 0); //M4A
            i2cWrite(0x30, 0x08, speed_value); //M4B
        }
        if (M == 1 && D == 1) {
            i2cWrite(0x30, 0x07, speed_value); //M4A
            i2cWrite(0x30, 0x08, 0); //M4B
        }

    }


    /**
     * set car state
     */
    //% block="car Stop"
    //% group="Motor" weight=94
    export function state() {
        //if (!PCA9685_Initialized) {
        //init_PCA9685();
        //}

        //stop
        i2cWrite(0x30, 0x01, 0); //M1A
        i2cWrite(0x30, 0x02, 0); //M1B
        i2cWrite(0x30, 0x03, 0); //M1A
        i2cWrite(0x30, 0x04, 0); //M1B
        i2cWrite(0x30, 0x05, 0); //M1A
        i2cWrite(0x30, 0x06, 0); //M1B
        i2cWrite(0x30, 0x07, 0); //M1A
        i2cWrite(0x30, 0x08, 0); //M1B
    }


    /**
     * turn off all rgb-led
     */
    //% block="$LedC Colorful LED turn $LedS"
    //% group="led" weight=76
    export function setLed(LedC: LedCount, LedS: LedState) {
        i2cWrite(0x30, LedC, LedS);
    }

    //% block="set servo to angle %angle"
    //% group="Servo" weight=70
    //% angle.min=-90 angle.max.max=90
    export function setServo(angle: number): void {
        pins.servoWritePin(AnalogPin.P14, angle)
    }




    /////////////////////////////////////////////////////
    //% block="$LT_val LineTracking"
    //% group="Sensor" weight=69
    export function LineTracking(LT_val: LT): boolean {
        let val = 0;
        let lt = LT_val;
        switch (lt) {
            case LT.Left:
                val = pins.digitalReadPin(DigitalPin.P3);
                break;
            case LT.Right:
                val = pins.digitalReadPin(DigitalPin.P10);
                break;
            case LT.Center:
                val = pins.digitalReadPin(DigitalPin.P4);
                break;
        }
        // val = (pins.digitalReadPin(DigitalPin.P14)<<2) + 
        //       (pins.digitalReadPin(DigitalPin.P15)<<1) +
        //       (pins.digitalReadPin(DigitalPin.P16));
        return val == 1;
    }
    /**
     * Ultrasonic sensor
     */
    let lastTime = 0;
    //% block="Ultrasonic"
    //% group="Sensor" weight=68
    export function ultra(): number {
        //send trig pulse
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0)
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1)
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0)

        // read echo pulse  max distance : 6m(35000us)  
        let t = pins.pulseIn(DigitalPin.P16, PulseValue.High, 35000);
        let ret = t;

        //Eliminate the occasional bad data
        if (ret == 0 && lastTime != 0) {
            ret = lastTime;
        }
        lastTime = t;

        return Math.round(ret / 58);
    }

}
