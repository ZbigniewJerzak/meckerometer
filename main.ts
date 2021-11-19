input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P2, 29)
})
let avgLautstaerke = 0
let list: number[] = []
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
_4digit.set(7)
_4digit.clear()
let winkel = 30
pins.servoWritePin(AnalogPin.P2, winkel)
let laenge = 5
for (let Index = 0; Index <= laenge; Index++) {
    list.push(input.soundLevel())
}
for (let Wert of list) {
    avgLautstaerke += Wert / laenge
}
_4digit.show(Math.trunc(avgLautstaerke))
basic.forever(function () {
    list.pop()
    list.push(Math.ceil(input.soundLevel()))
    avgLautstaerke = 0
    for (let Wert2 of list) {
        avgLautstaerke += Wert2 / laenge
    }
    avgLautstaerke = Math.ceil(avgLautstaerke)
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
            music.playTone(262, music.beat(BeatFraction.Sixteenth))
            winkel = 150
            pins.servoWritePin(AnalogPin.P2, winkel)
        }
    }
})
