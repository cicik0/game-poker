import { _decorator, Component, Sprite, SpriteFrame } from 'cc'

const { ccclass, property } = _decorator

@ccclass('BoardBG')
export class BoardBG extends Component {
    @property(SpriteFrame)
    sprSkin = []

    setSkin(id) {
        this.node.getComponent(Sprite).spriteFrame = this.sprSkin[id]
    }
}
