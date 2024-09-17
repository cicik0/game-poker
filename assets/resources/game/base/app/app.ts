import {director, instantiate, js, Label, native, Node, Prefab, resources, sys, tween, UIOpacity, Vec3} from "cc";

declare global {
    var app: any
}
window.app = {};

app.user = {

}

app.setting = {
    isSoundOn: true,
    isMusicOn: true,
    isVibrate: true
}

app.vec3 = function (x, y) {
    return new Vec3(x, y, 0)
}

app.scaleVec3 = function (scale) {
    return new Vec3(scale, scale, scale)
}

app.loadSetting = () => {
    const setting = sys.localStorage.getItem('Setting')
    if (setting) {
        const obj = JSON.parse(setting)
        app.setting = obj
    }
}

app.saveSetting = () => {
    sys.localStorage.setItem('Setting', JSON.stringify(app.setting))
}
app.config = {
    TRANSITION_DURATION: 0.15
}
app.log = console.log

app.EVENT = {
    ON_MESSAGE: 'WSS_ON_MESSAGE'
}



