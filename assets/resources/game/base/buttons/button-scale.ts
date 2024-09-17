import {_decorator, Button as CCButton, Component, Node, tween} from "cc";


const {ccclass, property} = _decorator;

const DURATION = 0.1;

class Vec3 {
}

@ccclass("Button")
export class Button extends Component {
    @property({type: Number})
    customScale: Number = 0;

    start() {
        // this.node.on(
        //     Button.EventType.CLICK,
        //     ()=>{
        //         console.log('oke bttn')
        //     }
        // );
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    }

    onDisable() {
        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    }

    touchStart() {
        tween(this.node).stop();
        tween(this.node)
            .to(DURATION, {
                scale: app.scaleVec3(this.customScale || 0.98),
            })
            .start();
    }

    touchEnd() {
        if (!this.node)
            return;
        tween(this.node).stop();
        tween(this.node)
            .to(DURATION, {scale: app.scaleVec3(1)})
            .start();

		audioUtils.playSound('button_click')

        // prevent double touch
        if (this.node && this.node.getComponent(CCButton))
            this.node.getComponent(CCButton).interactable = false;
        setTimeout(() => {
            if (this.node && this.node.getComponent(CCButton))
                this.node.getComponent(CCButton).interactable = true;
        }, 500);
    }
}
