import {_decorator, Component, Node} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('ItemSetting')
export class ItemSetting extends Component {
    @property(Node)
    disable

    start() {

    }

    setEnable(b) {
        this.disable.active = !b
    }

    update(deltaTime: number) {

    }
}

