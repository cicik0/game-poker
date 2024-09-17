import { _decorator, Component, Node } from 'cc'

const { ccclass, property } = _decorator

@ccclass('home_ctrl')
export class home_ctrl extends Component {
    @property({ type: Node, displayName: '' })
    private shop: Node = null

    @property({ type: Node, displayName: '' })
    private tabhome: Node = null

    @property({ type: Node, displayName: '' })
    private nap: Node = null

    public static instance

    onLoad() {
        home_ctrl.instance = this
    }

    protected onDestroy() {
        home_ctrl.instance = null
    }

    showTab(num) {
        console.log('tnq 89', num)
        if (this.tabhome) this.tabhome.active = false
        if (this.nap) this.nap.active = false
        if (this.shop) this.shop.active = false
        if (num === 0) {
            this.tabhome.active = true
        } else if (num === 10) {
            this.nap.active = true
        } else if (num === 1) {
            this.shop.active = true
        }
    }
}
