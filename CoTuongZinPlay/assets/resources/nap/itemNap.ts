import { _decorator, Component, Label } from 'cc';
import { nap } from 'db://assets/resources/nap/nap';

const { ccclass, property } = _decorator;

@ccclass('itemNap')
export class itemNap extends Component {
    @property({ type: Label, displayName: '' })
    private lblPrice: Label = null;

    @property({ type: Label, displayName: '' })
    private lblGold: Label = null;

    id = null;
    gold = null;

    init({ gold, price, id }) {
        this.id = id;
        this.gold = gold;
        this.lblGold.string = app.formatMoney(gold);
        this.lblPrice.string = app.formatMoney(price) + ' vnđ';
    }

    touchItemNap() {
        nap.i.touchItemNap(this.id, this.gold);
    }
}
