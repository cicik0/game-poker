import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NotifyPU')
export class NotifyPU extends Component {
    @property(Node)
    ask
    @property(Node)
    confirmOnly
    @property(Label)
    lblMessage

    _cb
    start() {
        //this.node.active = false;
    }

    setMessage(str, isAsk?, cbConfirm?) {
        this.lblMessage.string = str
        if  (isAsk) {
            this.ask.active = true
            this.confirmOnly.active = false
        }
        this._cb= cbConfirm
    }

    touchBtnConfirm() {
        this._cb?.();
    }

}

