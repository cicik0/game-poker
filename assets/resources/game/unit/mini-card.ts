import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mini_card')
export class mini_card extends Component {
    card: number = 0;
    type: number = 0;
    color: string = "#FFFFFF";
    
    setCard(card, type){
        this.card = card;
        this.type = type;
    }

    setColor(strColor: string){
        this.color = strColor;
    }
}


