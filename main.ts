/**
 * use for RGB-LED
 */
enum COLOR {
    red,
    green,
    blue,
    white,
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
    Run_forward = 0,
    Run_back = 1,
    Turn_Left = 2,
    Turn_Right = 3
}
enum LR {
    Upper_left = 0,
    Lower_left = 1,
    Upper_right = 2,
    Lower_right = 3,
}
enum MotorState {
    stop = 0,
    brake = 1
}
enum MD {
    Forward = 0,
    Back = 1
}

enum LT {
    Left,
    Right
}

enum LedCount {
    Left = 0x09,
    Right = 0x0a
}

enum LedState {
    ON = 4095,
    OFF = 0
}

enum Servo_num {
    D14,
    D15
}

//% color="#ff6800" icon="\uf1b9" weight=15
//% groups="['Motor', 'Servo', 'led', 'Neo-pixel', 'Sensor', 'Tone']"
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
     * set speed of motor
     */
    //% block="Motor $M run $D speed: $speed \\%"
    //% speed.min=0 speed.max=100
    //% group="Motor" weight=97
    export function Motor(M: LR, D: MD, speed: number) {
        // if (!PCA9685_Initialized) {
        //     init_PCA9685();
        // }
        let speed_value = Math.map(speed, 0, 100, 0, 255);
        //电机1
        //正转
        if (M == 2 && D == 1) {
            i2cWrite(0x30, 0x01, 0); //M1A
            i2cWrite(0x30, 0x02, speed_value); //M1B
        }
        //反转
        if (M == 2 && D == 0) {
            i2cWrite(0x30, 0x01, speed_value); //M1A
            i2cWrite(0x30, 0x02, 0); //M1B
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
            i2cWrite(0x30, 0x05, 0); //M3A
            i2cWrite(0x30, 0x06, speed_value); //M3B
        }
        if (M == 3 && D == 0) {
            i2cWrite(0x30, 0x05, speed_value); //M3A
            i2cWrite(0x30, 0x06, 0); //M3B
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
     * set cat state
     */
    //% block="car $sta"
    //% group="Motor" weight=98
    export function state(sta: MotorState) {
        //if (!PCA9685_Initialized) {
        //init_PCA9685();
        //}

        if (sta == 0) {           //stop
            i2cWrite(0x30, 0x01, 0); //M1A
            i2cWrite(0x30, 0x02, 0); //M1B
            i2cWrite(0x30, 0x03, 0); //M1A
            i2cWrite(0x30, 0x04, 0); //M1B
            i2cWrite(0x30, 0x05, 0); //M1A
            i2cWrite(0x30, 0x06, 0); //M1B
            i2cWrite(0x30, 0x07, 0); //M1A
            i2cWrite(0x30, 0x08, 0); //M1B
        }

        if (sta == 1) {           //brake
            i2cWrite(0x30, 0x01, 0); //M1A
            i2cWrite(0x30, 0x02, 0); //M1B
            i2cWrite(0x30, 0x03, 0); //M1A
            i2cWrite(0x30, 0x04, 0); //M1B
            i2cWrite(0x30, 0x05, 0); //M1A
            i2cWrite(0x30, 0x06, 0); //M1B
            i2cWrite(0x30, 0x07, 0); //M1A
            i2cWrite(0x30, 0x08, 0); //M1B
        }
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
    export function LineTracking(LT_val: LT) {
        let val = 0;
        let lt = LT_val;
        switch (lt) {
            case LT.Left:
                val = pins.digitalReadPin(DigitalPin.P1);
                break;
            case LT.Right:
                val = pins.digitalReadPin(DigitalPin.P2);
                break;
        }
        // val = (pins.digitalReadPin(DigitalPin.P14)<<2) + 
        //       (pins.digitalReadPin(DigitalPin.P15)<<1) +
        //       (pins.digitalReadPin(DigitalPin.P16));
        return val;
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
