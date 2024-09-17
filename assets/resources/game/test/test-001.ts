import { _decorator, Component, director, find, Label, labelAssembler, Node, ProgressBar, Quat, Slider, Sprite, tween, UITransform, Vec3 } from 'cc';
import { card } from '../unit/helper/card';
import { heper_until } from '../unit/helper/heper-until';

const { ccclass, property } = _decorator;

@ccclass('test-001')
export class test extends Component {

    @property({type: Label}) labelBet: Label|null;
    @property({type: Label}) labelMin: Label|null;
    @property({type: Label}) labelMax: Label|null;

    @property({type: ProgressBar}) progressNap: ProgressBar|null;
    @property({type: Slider}) sliderNap: Slider|null;

    raitoMin: number = 20;
    raitoMax: number = 200;
    currentPorgress: number = 0;
    raito: number = 1/9;

    protected start(): void {
        this.onInit(500);
    }

    protected update(dt: number): void {
        if(this.currentPorgress != this.sliderNap.progress){
            // console.log(this.labelBet.string);
            this.progressNap.progress = this.sliderNap.progress;
            // console.log(this.sliderNap.progress % this.raito);
            const bet = this.sliderNap.progress * (this.takeNumber(this.labelMax.string) - this.takeNumber(this.labelMin.string))  
            
            const increatBet = Math.floor(bet/parseInt(heper_until.getOnlyNumberInString(this.labelMin.string)))
            this.labelBet.string = heper_until.numberWithCommas(increatBet * this.takeNumber(this.labelMin.string) + this.takeNumber(this.labelMin.string));
            this.currentPorgress = this.sliderNap.progress;
        }

    }

    onInit(betString: number){
        this.progressNap.progress = 0;
        this.sliderNap.progress = 0;
        this.labelMax.string = heper_until.numberWithCommas((betString * this.raitoMax));
        this.labelMin.string = heper_until.numberWithCommas((betString * this.raitoMin));
        this.labelBet.string = this.labelMin.string;
    }

    takeNumber(text: string): number{
        return parseInt(heper_until.getOnlyNumberInString(text));
    }
    
}


