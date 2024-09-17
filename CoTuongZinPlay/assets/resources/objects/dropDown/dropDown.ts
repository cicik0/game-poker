import { _decorator, Component, instantiate, Label, Node } from "cc"

const { ccclass, property } = _decorator

@ccclass("dropDown")
export class dropDown extends Component {
    @property(Node)
    nodeDropDown

    @property(Node)
    option

    @property(Label)
    lblValue

    selectedOption = null

    onLoad() {
        this.nodeDropDown.active = false
        this.option.active = false
    }

    updateValue(value) {
        this.lblValue.string = value
    }

    setOptions(data) {
        for (let i = 0; i < data?.length; i++) {
            const info = data[i]
            if (info) {
                const option: Node = instantiate(this.option)
                option.getComponent(Label).string = info.title
                option.active = true
                this.nodeDropDown.addChild(option)

                option.on(Node.EventType.TOUCH_END, (event) => {
                    // Your touch start event handling code here
                    this.showDropDown()
                    this.updateValue(info?.title)
                    this.selectedOption = info
                })
            }
        }

        this.updateValue(data[0]?.title)
        this.selectedOption = data[0]
    }

    showDropDown() {
        this.nodeDropDown.active = !this.nodeDropDown.active
    }

    touchOption() {}
}
