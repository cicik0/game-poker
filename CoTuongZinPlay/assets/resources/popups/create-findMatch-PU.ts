import { _decorator, Component, EditBox, Node } from "cc"
import { checkBoxList } from "db://assets/resources/objects/checkBoxList/checkBoxList"
import { dropDown } from "db://assets/resources/objects/dropDown/dropDown"
const { ccclass, property } = _decorator

@ccclass("create_findMatch_PU")
export class create_findMatch_PU extends Component {
    @property(Node)
    timeSelect

    @property(Node)
    dropDownTableValue

    start() {
        this.timeSelect.getComponent(checkBoxList).setOptions([
            {
                title: "30s-5'",
                value: 5000,
                id: 0,
            },
            {
                title: "60s-10'",
                value: 10000,
                id: 1,
            },
        ])

        this.dropDownTableValue.getComponent(dropDown).setOptions([
            {
                title: "1K",
                value: 1000,
                id: 0,
            },
            {
                title: "2K",
                value: 2000,
                id: 1,
            },
            {
                title: "5K",
                value: 5000,
                id: 2,
            },
            {
                title: "10K",
                value: 10000,
                id: 3,
            },
            {
                title: "20K",
                value: 20000,
                id: 4,
            },
        ])
    }

    touchBtnXacNhan(deltaTime: number) {
        const timeConfig =
            this.timeSelect.getComponent(checkBoxList).selectedOption?.id
        const roomId =
            this.dropDownTableValue.getComponent(dropDown).selectedOption?.id
        app.send("FindMatch", [timeConfig, roomId])
    }
}
