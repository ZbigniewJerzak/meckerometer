input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P2, 0)
})
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P2, 180)
})
let avgLaut = 0
let currLaut = 0
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
_4digit.set(7)
_4digit.clear()
let winkel = 30
pins.servoWritePin(AnalogPin.P2, winkel)
_4digit.show(Math.trunc(input.soundLevel()))
basic.forever(function () {
    currLaut = input.soundLevel()
    if (currLaut >= avgLaut) {
        avgLaut = currLaut
    } else {
        avgLaut += 0 - 1
    }
    _4digit.show(avgLaut)
    if (avgLaut < 20) {
        if (winkel != 30) {
            winkel = 30
            pins.servoWritePin(AnalogPin.P2, winkel)
        }
    } else if (avgLaut >= 20 && avgLaut <= 60) {
        if (winkel != 90) {
            winkel = 90
            pins.servoWritePin(AnalogPin.P2, winkel)
        }
    } else if (avgLaut > 60) {
        if (winkel != 150) {
            winkel = 150
            pins.servoWritePin(AnalogPin.P2, winkel)
        }
    }
})
