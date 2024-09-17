import { _decorator, CCInteger, Component, director, game, Label, Node } from 'cc';
import { heper_until } from '../../../unit/helper/heper-until';
import { BasePopUp_unDestroy } from '../../../base/popup-base/BasePopUp-unDestroy';
import { BasePopUp } from '../../../base/popup-base/BasePopUp';
const { ccclass, property } = _decorator;

@ccclass('poker_nap')
export class poker_nap extends BasePopUp {

    @property({type: Label}) labelBet: Label;
    @property({type: Label}) labelMin: Label;
    @property({type: Label}) labelMax: Label;
    @property({type: CCInteger}) min:number;
    @property({type: CCInteger}) max: number;

    protected onLoad(): void {
        game.on('WS_ON_MESSAGE', this.onMessage, this)
    } 

    protected onDestroy(): void {
        game.off('WS_ON_MESSAGE', this.onMessage, this)
    }

    start() {
        //ws.start();
    }

    onMessage(data){
        console.log("ingame", data);
        if(data?.toGame === "Poker"){
            director.loadScene("game-play");
        }

    }

    onInit(bet: number){
        this.labelBet.string =  heper_until.numberWithCommas(bet);
    }

    onConfirmClick(){
        console.log('send mesage');
        //const smg = {"g":{"poker":{"reg":{"room":"100","balans":"2000","auto":true}}}}
        const smg = {g:{"poker":{reg:{room:"100",balans:"2000",auto:true}}}}
        ws.send(smg);
    }
}


