
export function soundDriver(sound$) {
    sound$.addListener({
        next: sounds => {
            sounds.map(sound => {
                sound.currentTime = 0;
                sound.play();
            })
        }
    });
}

export function oscillatorSoundDriver(sound$) {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    sound$.addListener({
        next: sounds => {
            sounds.map(sound => {
            console.log(sound);
                var osc = context.createOscillator();
                osc.connect(context.destination);
                osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
                osc.frequency.value = sound.frequency;
                osc.start(sound.start);
                osc.stop(sound.stop);
            })
        }
    });
}
