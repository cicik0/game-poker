import {
    _decorator,
    Component,
    game,
    instantiate,
    Node,
    Prefab,
    Sprite,
    SpriteFrame,
    Vec3,
} from 'cc';
import { GateNativeBridge } from '../scripts/utils/NativeBridge';
import { itemNap } from './itemNap';
import { CongratPU } from 'db://assets/resources/popups/CongratPU';

const { ccclass, property } = _decorator;

const DATA = [
    {
        id: 'com.zinplay.cotuong.20K',
        gold: 20000,
        price: 24000,
    },
    {
        id: 'com.zinplay.cotuong.40K',
        gold: 40000,
        price: 48000,
    },
    {
        id: 'com.zinplay.cotuong.100K',
        gold: 100000,
        price: 120000,
    },
    {
        id: 'com.zinplay.cotuong.200K',
        gold: 200000,
        price: 240000,
    },
    {
        id: 'com.zinplay.cotuong.1000K',
        gold: 1000000,
        price: 1200000,
    },
    {
        id: 'com.zinplay.cotuong.2000K',
        gold: 2000000,
        price: 2000000,
    },
];

@ccclass('nap')
export class nap extends Component {
    @property({ type: Prefab, displayName: '' })
    private itemNap: Prefab = null;
    @property(SpriteFrame)
    spr = [];

    @property(Node)
    container;

    public static i;

    gold = null;

    onLoad() {
        nap.i = this;

        game.on('ON_NATIVE_MESSAGE', this.handleIap, this);
    }

    protected onDestroy() {
        game.off('ON_NATIVE_MESSAGE', this.handleIap, this);
    }

    handleIap(data) {
        const key = data.key;
        if (key === 'iap') {
            const value = data.value;
            if (value?.state === 'success') {
                //     thanh toan thanh cong

                this.handlePurchaseSuccess(value.productId);
                //     update to server
            } else if (value?.state === 'cancel') {
                //     thanh toan thanh cong
                // app.dialogNotify("");
                //     update to server
            } else if (value?.state === 'error') {
                //     thanh toan thanh cong
                app.dialogErrorHappened();
                //     update to server
            }
        }
    }

    handlePurchaseSuccess(productId) {
        this.callPurchaseBE();
    }

    async callPurchaseBE() {
        const data = await app.fetchData(
            app.BASE_URL_API + 'shop/IAP',
            'POST',
            {
                amount: this.gold,
            },
        );
        if (data.isOk) {
            const json = data.json;
            if (json?.knbCoin) {
                app.user.balanceGold = json?.knbCoin;
                game.emit('UPDATE_BALANCE');
                app.showPopUp('CongratPU', (congrat) => {
                    congrat
                        ?.getComponent(CongratPU)
                        .setMessage(
                            'Chúc mừng, bạn đã nạp thành công ' +
                                app.formatMoney(this.gold) +
                                ' KNB!',
                        );
                });
            } else {
                app.dialogNotify('Không thành công, vui lòng thử lại!');
            }
        } else {
            app.dialogErrorHappened();
        }
    }

    touchItemNap(id, gold) {
        console.log('aaaaa ', id);

        this.gold = gold;
        GateNativeBridge.purchaseProduct(id);

        // this.callPurchaseBE();
    }

    start() {
        for (let i = 0; i < DATA.length; i++) {
            let val = DATA[i];
            const item: Node = instantiate(this.itemNap);
            item.getComponent(itemNap).init(val);
            this.container.addChild(item);
            const j = i >= 3 ? i - 3 : i;
            item.setPosition(
                new Vec3(j * 350 - 350, 20 + (i >= 3 ? 0 : 500), 0),
            );
            item.getChildByName('sprGold').getComponent(Sprite).spriteFrame =
                this.spr[i];
        }
    }
}
