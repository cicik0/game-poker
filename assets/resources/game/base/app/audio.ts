import { AudioClip, error, log, resources } from "cc";


declare global {
    var audioUtils: any;
    var sounds: any;
    var musics: any;
}
window.audioUtils = {}
window.sounds = {
    buttonSound: null,
    btnBackSound: null,
    btnSelectSound: null,
};

window.musics = {
    homeMusic: null,
    findMatchMusic: null,
    inGameMusic: null,
    resultMusic: null,
};

audioUtils.playSound= (name)=>{
    if (!app.setting.isSoundOn) return;

    resources.load("game/base/sounds/" + name, AudioClip, (err, clip) => {
        if (err) {
            console.error("Failed to load sound:", err);
            return;
        }
        if (clip) {
            clip.play();
        }
    });
}
export namespace soundUtils {
    export function playHomeMusic() {
        if (!app.setting.isMusicOn) return;
        if (musics.homeMusic) {
            musics.homeMusic.stop();
            musics.homeMusic = null;
            return;
        }
        resources.load("sounds/nhacnen", AudioClip, (err, clip) => {
            if (err) {
                console.error("Failed to load sound:", err);
                return;
            }

            if (clip) {
				console.log('tnq 111')
                musics.homeMusic = clip;
                clip.setLoop(true);
                clip.play();
            }
        });
    }

    export function stopHomeMusic() {
        musics.homeMusic?.stop();
        musics.homeMusic = null;
    }


    export function playSound(name) {
        if (!app.setting.isSoundOn) return;

		resources.load("sounds/" + name, AudioClip, (err, clip) => {
            if (err) {
                console.error("Failed to load sound:", err);
                return;
            }
            if (clip) {
                clip.play();
            }
        });
    }

}
