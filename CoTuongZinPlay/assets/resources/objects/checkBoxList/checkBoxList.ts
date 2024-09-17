import { _decorator, Component, instantiate, Label, Node } from "cc"

const { ccclass, property } = _decorator

@ccclass("checkBoxList")
export class checkBoxList extends Component {
    @property(Node)
    list

    @property(Node)
    option

    selectedOption = null

    data = []
    arrOptions = []

    onLoad() {
        this.list.removeAllChildren()
        this.option.active = false
    }

    setOptions(data) {
        this.data = data
        for (let i = 0; i < data?.length; i++) {
            const info = data[i]
            if (info) {
                const option: Node = instantiate(this.option)
                option.getChildByName("title").getComponent(Label).string =
                    info.title
                option.active = true
                this.list.addChild(option)

                this.arrOptions.push(option)

                option.on(Node.EventType.TOUCH_END, (event) => {
                    // Your touch start event handling code here
                    this.selectedOption = info
                    this.updateSelected()
                })
            }
        }

        this.selectedOption = data[0]
        this.updateSelected()
    }

    updateSelected() {
        for (let i = 0; i < this.data?.length; i++) {
            const info = this.data[i]
            if (info) {
                const option: Node = this.arrOptions[i]
                if (info.value === this.selectedOption?.value) {
                    option.getChildByName("selected").active = true
                } else {
                    option.getChildByName("selected").active = false
                }
            }
        }
    }
}
