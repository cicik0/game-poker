import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    start() {}

    touchShowDialog() {
        utils.dialogNotify('Test thong bao o day');
    }
}
