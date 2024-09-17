import { _decorator, Component, Node } from "cc"
const { ccclass, property } = _decorator

@ccclass("CauHoaPU")
export class CauHoaPU extends Component {
    start() {}

    touchBtnCauHoa(deltaTime: number) {
        app.send("CauHoa", [true])
    }

    touchBtnHuy(deltaTime: number) {
        app.send("CauHoa", [false])
    }
}
