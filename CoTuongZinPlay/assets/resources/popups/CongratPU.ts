import { _decorator, Component, instantiate, Label, Node, tween } from 'cc';
import { AudioUtils } from 'db://assets/resources/scripts/utils/AudioUtils';

const { ccclass, property } = _decorator;

@ccclass('CongratPU')
export class CongratPU extends Component {
    @property(Node)
    coinPrefab;

    @property(Label)
    lblMessage;

    setMessage(msg) {
        if (msg) this.lblMessage.string = msg;
    }

    start() {
        const amountTmp = 30;

        for (let i = 0; i < 35; i++) {
            setTimeout(() => {
                const coin = instantiate(this.coinPrefab);
                const pos = app.vec3(
                    Math.random() * 700 - 350,
                    Math.random() * 200 - 100 + 200,
                );
                coin.setPosition(pos);
                coin.active = true;
                // coin.scale = 1.5;

                tween(coin)
                    .set({ scale: app.scaleVec3(0) })
                    .to(0.3, { scale: app.scaleVec3(1) }, { easing: 'backOut' })
                    .delay(Math.random() * 0.5)
                    .to(1, { position: app.vec3(pos.x, pos.y + 1800) })
                    .destroySelf()
                    .start();

                this.node.addChild(coin);
            }, i * 20);
            // tween(coin).to(0.5, { position: app.vec3(pos.x, pos.y - 500) });
        }

        setTimeout(() => {
            AudioUtils.playSound('coinCongrat');
        }, 200);
    }
}
