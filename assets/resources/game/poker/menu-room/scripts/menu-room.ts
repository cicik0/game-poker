import { _decorator, Component, director, game, Node, Prefab, Sprite, sys } from 'cc';
import { ui_unit } from '../../../unit/ui_unit';
import { poker_nap } from './poker_nap';
import { heper_until } from '../../../unit/helper/heper-until';
const { ccclass, property } = _decorator;

@ccclass('menu_room')
export class menu_room extends Component {

    @property({
        type: Node
    })
    bgSprite: Node|null = null;

    @property({
        type: Node
    })
    rooms: Node|null = null;

    @property({
        type: Node
    })
    btnBack: Node|null = null;


    protected onLoad(): void {
        game.on('WS_ON_MESSAGE', this.onMessage, this)
    } 

    protected onDestroy(): void {
        game.off('WS_ON_MESSAGE', this.onMessage, this)
    }

    start() {

    }

    onMessage(data) {
        console.log('tnq7777', data);
        
        if (data?.Authorized === true) {
            // login thanh cong
            director.loadScene('game-play');
            console.log("load game-play-scene");
            
            sys.localStorage.setItem('user', JSON.stringify(data?.user))
        }
    }

    onClickRoom(dt, customData){
        console.log("click in a room");
        ui_unit.loadPopUp("game/poker/menu-room/prefabs/popup-nap", (nodeLoading) => {
            const nodeLoadingCtrl = nodeLoading.getComponent(poker_nap);
            if(nodeLoadingCtrl){
                console.log("DO SOME THING", customData);                
                nodeLoadingCtrl.labelBet.sting = heper_until.numberWithCommas(customData);
            }
        });
    }

}


