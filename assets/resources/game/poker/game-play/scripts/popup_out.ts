import { _decorator, Button, Component, director, Node } from 'cc';
import { BasePopUp_unDestroy } from '../../../base/popup-base/BasePopUp-unDestroy';
import { game_play } from '../game-play';
const { ccclass, property } = _decorator;

@ccclass('popup_out')
export class popup_out extends BasePopUp_unDestroy {
    @property({type: Button}) btnConfirm: Button|null;
    @property({type: Button}) btnCancel: Button|null;

    canvas: game_play;

    onLoad(){
        const scene = director.getScene();
        if(scene){
            this.canvas = scene.getChildByName("Canvas").getComponent(game_play);
            if(this.canvas){
                this.canvas.nodeOut = this.node;
                this.btnConfirm.node.on(Node.EventType.TOUCH_START, this.canvas.backGame, this);
                //this.btnCancel.node.on(Node.EventType.TOUCH_START, , this);
            }
        }
    }

    onDestroy(){
        //this.btnConfirm.node.off(Node.EventType.TOUCH_START, this.canvas.backGame, this);
        //this.btnCancel.node.off(Node.EventType.TOUCH_START, this.canvas.toggleOut, this);
    }
}


