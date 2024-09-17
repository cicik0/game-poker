import { _decorator, Component, director, game, Label, labelAssembler, Node, ProgressBar, Slider } from 'cc';
import { game_play } from '../game-play';
import { heper_until } from '../../../unit/helper/heper-until';
const { ccclass, property } = _decorator;

@ccclass('pokerTo')
export class pokerTo extends Component {

    @property({type: Slider}) sliderTo: Slider|null;
    @property({type: ProgressBar}) progressBarTo: ProgressBar|null;
    @property({type: Label}) labelBet: Label|null;
    @property({type: Label}) lableMin: Label|null;
    @property({type: Label}) labelMax: Label|null;

    canvas:game_play|null;
    meMap: number|null;
    betMax: number;
    betMin: number;
    ratio: number;
    progressPlus: number|null;

    currentProgress: number = 0;

    protected onLoad(): void {

        const scene = director.getScene();
        if(scene){
            this.canvas = scene.getChildByName("Canvas").getComponent(game_play);
            if(this.canvas){
                this.meMap = this.canvas.meMap;
            }
        }

        this.progressBarTo.progress = 0;
        this.sliderTo.progress = 0;

        game.on('WS_ON_MESSAGE', this.onMessage, this);
    } 

    protected onDestroy(): void {
        game.off('WS_ON_MESSAGE', this.onMessage, this);
    }

    onEnable(){
        this.progressBarTo.progress = 0;
        this.sliderTo.progress = 0;
        let player = this.canvas.players[this.meMap];
        //console.log("player", this.meMap);
        
        let gameBet = parseInt(heper_until.getOnlyNumberInString(this.canvas.mainBet.string));
        let playerBet = parseInt(heper_until.getOnlyNumberInString(player.bet.string));
        //console.log("PLAYER_BET: ", player.bet.string);
        
        let playerBalans = parseInt(heper_until.getOnlyNumberInString(player.balans.string));
        let debit = gameBet - playerBet; //số lượng người trước đã cược
        this.betMax = playerBalans - debit; //giới hạn cược của người chơi
        if(this.betMax < 1){ //check xem người chơi còn tiền hay không
            this.node.active = false;
            this.canvas.btnTo.active = false;
            return;
        }

        let bet = parseInt(heper_until.getOnlyNumberInString(this.canvas.labelRoom.string));
        //console.error("room balans: ", this.canvas.labelRoom.string, gameBet, playerBet, playerBalans);
        
        this.betMin = bet;
        this.ratio = this.betMin <= 100 ? 50 : (this.betMin <= 1000 ? 500 : (this.betMin <= 10000 ? 1000 : (this.betMin <= 100000 ? 10000: 1000000)));

        this.labelBet.string = heper_until.numberWithCommas(this.betMin.toString());
        this.lableMin.string = this.labelBet.string;
        this.labelMax.string = heper_until.numberWithCommas(this.betMax.toString());
        this.betMin = this.betMin/this.ratio;
        this.betMax = this.betMax/this.ratio;
    }

    start() {
        ws.start();
        console.error(this.ratio);
        
    }

    onMessage(data){

    }

    update(deltaTime: number) {
        this.progressBarTo.progress = this.sliderTo.progress;
        this.progressPlus = (1/(this.betMax-this.betMin));
        let bet;
        if(this.progressBarTo.progress >= (this.currentProgress + this.progressPlus)){
            bet = (this.currentProgress + this.progressPlus) * (this.betMax - this.betMin) + this.betMin;
            let betString = bet * this.ratio;
            this.labelBet.string = heper_until.numberWithCommas(betString.toString());
            this.currentProgress += this.progressPlus;
        }

        if(this.currentProgress > this.progressPlus && this.progressBarTo.progress <= this.currentProgress - this.progressPlus){
            bet = (this.currentProgress + this.progressPlus) * (this.betMax - this.betMin) + this.betMin;
            let betString = bet * this.ratio;
            this.labelBet.string = heper_until.numberWithCommas(betString.toString());
            this.currentProgress -= this.progressPlus;
        }

        if(this.progressBarTo.progress == 0){
            let betString = this.betMin * this.ratio;
            this.labelBet.string = heper_until.numberWithCommas(betString.toString());
            this.currentProgress = 0;
        }

        if(this.progressBarTo.progress == 1){
            let betString = this.betMax * this.ratio;
            this.labelBet.string = heper_until.numberWithCommas(betString.toString());
            this.currentProgress = 1;
        }
              
    }

    onConfirmClick(){
        ws.send({g:{poker: {to: heper_until.getOnlyNumberInString(this.labelBet.string)}}});
    }
}


