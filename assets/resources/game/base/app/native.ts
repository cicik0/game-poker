import {director, instantiate, js, Label, native, Node, Prefab, resources, sys, tween, UIOpacity, Vec3} from "cc";

declare global {

    var native: any

}
window.native = {};

native.getDeviceID = function () {
    var r = "TestGame123";
    if (sys.os == sys.OS.ANDROID && sys.isNative) {
        r = native.reflection.callStaticMethod(
            "com/cocos/game/AppActivity",
            "getDeviceID",
            "()Ljava/lang/String;"
        );
    } else if (sys.os == sys.OS.IOS && sys.isNative) {
        r = native.reflection.callStaticMethod(
            "ViewController",
            "getDeviceID:",
            "cocos2d-js"
        );
    }
    return r;
}