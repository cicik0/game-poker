import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('card')
export class card extends Component {

    @property({
        type: SpriteFrame
    })
    card1: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card2: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card3: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card4: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card5: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card6: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card7: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card8: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card9: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card10: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card11: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card12: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    card13: SpriteFrame[]|null = [];

    @property({
        type: SpriteFrame
    })
    cardB1: SpriteFrame|null;

    @property({
        type: SpriteFrame
    })
    cardB2: SpriteFrame|null;

    red: boolean = false;

    card;

    onLoad(){
        this.card = [
            this.card1,
            this.card2,
            this.card3,
            this.card4,
            this.card5,
            this.card6,
            this.card7,
            this.card8,
            this.card9,
            this.card10,
            this.card11,
            this.card12,
            this.card13,
        ];
    }

    getCard(card: number = 0, type: number = 0){
        return this.card[card][type];
    }

    random(num: number = 13){
        return this.card[~~(Math.random()*num)][~~(Math.random()*4)];
    }

}


