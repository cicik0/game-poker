import { _decorator, Component, Node, Tween, tween, UIOpacity, Vec3 } from "cc"

const { ccclass, property } = _decorator

const DURATION = 0.3
const DURATION_HIDE = 0.2

const easingIn = {
    easing: "cubicIn",
}

const easingOut = {
    easing: "cubicOut",
}

@ccclass("BasePopUp")
export class BasePopUp extends Component {
    @property({
        type: Node,
    })
    content: Node | null = null

    @property({
        type: Node,
    })
    background: Node | null = null

    backgroundUIOpacity: UIOpacity = null
    isHide = false

    start() {
        if (!this.background.getComponent(UIOpacity))
            this.background.addComponent(UIOpacity)
        this.backgroundUIOpacity = this.background.getComponent(UIOpacity)
        this.backgroundUIOpacity.opacity = 0

        this.show()
    }

    show() {
        tween(this.backgroundUIOpacity)
            .to(
                0.2,
                { opacity: 255 },
                {
                    // easing: "bounceOut",
                },
            )
            .start()
        if (this.content) {
            this.content.addComponent(UIOpacity)
            this.content.getComponent(UIOpacity).opacity = 0
        }
        if (this.content) {
            tween(this.content.getComponent(UIOpacity))
                .to(0.2, { opacity: 255 }, {})
                .start()
            this.content.setScale(app.scaleVec3(0))
            tween(this.content)
                .to(
                    DURATION,
                    { scale: app.scaleVec3(1) },
                    {
                        easing: app.config.EASING,
                    },
                )
                .start()
        }
    }

    hide() {
        if (this.isHide) return
        this.isHide = true
        Tween.stopAllByTarget(this.backgroundUIOpacity)
        tween(this.backgroundUIOpacity)
            .to(DURATION_HIDE, { opacity: 0 })
            .call(() => {
                this.node.destroy()
            })
            .start()
        if (this.content) {
            Tween.stopAllByTarget(this.content)
            tween(this.content.getComponent(UIOpacity))
                .to(
                    DURATION_HIDE,
                    { opacity: 0 },
                    {
                        easing: "cubicIn",
                    },
                )
                .start()
            tween(this.content)
                .to(
                    DURATION_HIDE,
                    { scale: app.scaleVec3(0) },
                    {
                        easing: "cubicIn",
                    },
                )

                .start()
        }
    }

    touchBtnClose() {
        this.hide()
    }
}
