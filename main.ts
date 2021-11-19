input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P2, 29)
})
let avgLautstaerke = 0
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
_4digit.set(7)
_4digit.clear()
let winkel = 30
pins.servoWritePin(AnalogPin.P2, winkel)
_4digit.show(Math.trunc(input.soundLevel()))
basic.forever(function () {
    avgLautstaerke = input.soundLevel()
    _4digit.show(avgLautstaerke)
    if (avgLautstaerke < 20) {
        if (winkel != 30) {
            winkel = 30
            pins.servoWritePin(AnalogPin.P2, winkel)
        }
    } else if (avgLautstaerke >= 20 && avgLautstaerke <= 60) {
        if (winkel != 90) {
            winkel = 90
            pins.servoWritePin(AnalogPin.P2, winkel)
        }
    } else if (avgLautstaerke > 60) {
        if (winkel != 150) {
            for (let Index = 0; Index <= 4; Index++) {
                music.playTone(262, music.beat(BeatFraction.Sixteenth))
                music.playTone(392, music.beat(BeatFraction.Sixteenth))
            }
            winkel = 150
            pins.servoWritePin(AnalogPin.P2, winkel)
        }
    }
})
