import { _decorator, Button, Component, EventTouch, Label, Node, ProgressBar, Slider, Vec3 } from 'cc';
import { heper_until } from '../unit/helper/heper-until';
const { ccclass, property } = _decorator;

@ccclass('tocontroll_test')
export class tocontroll_test extends Component {
    @property({type: Label}) min: Label|null;
    @property({type:Label}) max: Label|null;
    @property({type: Label}) bet: Label|null;

    @property({type: Slider}) sliderTo: Slider|null;
    @property({type: ProgressBar}) progressBarTo: ProgressBar|null;
    @property({type: Button}) button_money: Button|null;

    currentProgress: number = 0;
    ratio: number|null;
    betMin: number|null;

    onLoad(){
        this.sliderTo.progress = 0;
        this.progressBarTo.progress = 0;
        this.bet.string = this.min.string; 
        this.betMin = 100;
        this.ratio = this.betMin <= 100 ? 50 : (this.betMin <= 1000 ? 500 : (this.betMin <= 10000 ? 1000 : (this.betMin <= 100000 ? 10000: 1000000)));
    }

    start() {
    }

    update(deltaTime: number) {
        this.progressBarTo.progress = this.sliderTo.progress;
        let bet;
        if(this.progressBarTo.progress >= this.currentProgress + (1/18)){
            bet = (this.currentProgress + (1/18)) * (parseInt(heper_until.getOnlyNumberInString(this.max.string))/this.ratio - parseInt(heper_until.getOnlyNumberInString(this.min.string))/this.ratio )+ parseInt(heper_until.getOnlyNumberInString(this.min.string))/this.ratio;
            this.bet.string = heper_until.numberWithCommas(bet);
            this.currentProgress += (1/18);
        }

        if(this.currentProgress>(1/18) && this.progressBarTo.progress<=this.currentProgress-(1/18)){
            bet = (this.currentProgress - (1/18)) * (parseInt(heper_until.getOnlyNumberInString(this.max.string)) - parseInt(heper_until.getOnlyNumberInString(this.min.string)) )+ parseInt(heper_until.getOnlyNumberInString(this.min.string));
            this.bet.string = heper_until.numberWithCommas(bet);
            this.currentProgress -= (1/18);
        }

        if(this.progressBarTo.progress == 0){
            this.bet.string = heper_until.numberWithCommas(this.min.string);
        }

        if(this.progressBarTo.progress == 1){
            this.bet.string = this.max.string;
        }       
    }

    onConfirmClick(){
        ws.send({g:{poker: {to: heper_until.getOnlyNumberInString(this.bet.string)}}});
    }
}


