import { _decorator, Color, color, Component, director, find, game, instantiate, Label, log, Node, Prefab, ProgressBar, resources, Sprite, SpriteAtlas, SpriteFrame, tween, UITransform, Vec3 } from 'cc';
import { heper_until } from '../../../unit/helper/heper-until';
import { spiteframe_util } from '../../../unit/spiteframe_util';
import { card } from '../../../unit/helper/card';
import { mini_card } from '../../../unit/mini-card';
import { game_play } from '../../game-play/game-play';

const { ccclass, property } = _decorator;

@ccclass('poker_player')
export class poker_player extends Component {

    @property({
        type: Label
    })
    nickname: Label|null;

    @property({
        type: Label
    })
    balans: Label|null = null;

    @property({
        type: Label
    })
    bet: Label|null;

    @property({
        type: Node
    })
    card: Node|null;

    @property({
        type: Node
    })
    status: Node|null;

    @property({
        type: Node
    })
    notice: Node|null;

    @property({
        type: Node
    })
    bgWin: Node|null;

    @property({
        type: ProgressBar
    })
    Progress: ProgressBar|null;

    @property({
        type: Sprite
    })
    Avatar: Sprite|null;

    @property({
        type: Sprite
    })
    titleCard: Sprite|null;

    @property({
        type: Sprite
    })
    items: Sprite[]|null = [];
    @property({type: Node}) items_node:Node|null;

    spriteFrameCard:card|null; //spriteframe cho các lá bài
    boBai_onTable: Node|null;

    isOpen: boolean = false;
    isAll: boolean 
    isHuy: boolean;
    playerMap: number; //vị trí ghế player khi tham gia một game

    isUpdate: boolean //hàm check điều kiện update cho progress bar

    //các biến điều khiển progress bar
    oldTime: number;
    progressTime: number;
    canvasControll: game_play;

    protected onLoad(): void {
        game.on('WS_ON_MESSAGE', this.onMessage, this)
    } 

    protected onDestroy(): void {
        game.off('WS_ON_MESSAGE', this.onMessage, this)
    }
    
    start() {
        ws.start();
        const scene = director.getScene();
        if(scene){
            const canvas = scene.getChildByName("Canvas");
            if(canvas){
                this.canvasControll = canvas.getComponent(game_play);
                this.spriteFrameCard = canvas.getChildByName("Card").getComponent(card);
                this.boBai_onTable = find("game-gb-gold/bobai", canvas);
            }
        }
    }

    initPlayer(){
        console.log("init player");      
        this.isAll = false;
        this.isHuy = false;
        // this.items.forEach((item, index)=>{
            
        // })
    }

    ChiaBai(bai, card:number, time:number):void{
        //console.log("CHIA BAI_________","bai", bai, "card", card, "time", time);
        // console.log("bai: ", bai.type);
        // console.log("card: ", card);
        // console.log("time: ", time);
            
        let playerItem = this.items[card];
        //console.log("item ", playerItem.node.name);
        
        //console.log("cards: ", this.items);
        
        const item_angle = playerItem.node.angle; 
        const item_positon = playerItem.node.getPosition().clone();
        //console.log("item position: ", item_positon);       
        const item_width = playerItem.node.getComponent(UITransform).width;
        const item_height = playerItem.node.getComponent(UITransform).height;

        const boBai_width = this.boBai_onTable.getComponent(UITransform).width;
        const boBai_height = this.boBai_onTable.getComponent(UITransform).height;
        if(bai.data){
            let data = bai.data[card];

            //tạo vị trí lá bài xuất hiện
            let pos = this.boBai_onTable.parent.getComponent(UITransform).convertToWorldSpaceAR(this.boBai_onTable.position);            
            playerItem.node.setPosition(playerItem.node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos));
            //console.log("playerItem.node.posotion: ", playerItem.node.position);
            
            //item.node.setPosition(pos);
            const newSclae = new Vec3(boBai_width/item_width, boBai_height/item_height);
            playerItem.node.setScale(newSclae);
            playerItem.node.angle = 0;
            playerItem.node.active = true;
            playerItem.getComponent(Sprite).spriteFrame = this.spriteFrameCard.cardB1;

            tween(playerItem.node)
                //.delay(0.5)
                .sequence(
                    tween().to(0.5, {position: item_positon}),
                    tween().to(0.1, {angle: (card == 0)? 10 : -10}),
                    tween().to(0.2, {scale: new Vec3(0, 1)})
                )
                //.to(0.5, {position: item_positon})
                .call(()=>{
                    playerItem.getComponent(Sprite).spriteFrame = this.spriteFrameCard.getCard(data.card, data.type);
                    playerItem.getComponent(mini_card).setCard(data.card, data.type);
                })
                .to(0.1, {scale: new Vec3(1, 1)})
                .start();
        }
        else{
            //tạo vị trí lá bài xuất hiện
            let pos = this.boBai_onTable.parent.getComponent(UITransform).convertToWorldSpaceAR(this.boBai_onTable.position);            
            playerItem.node.setPosition(playerItem.node.parent.getComponent(UITransform).convertToNodeSpaceAR(pos));
            const newSclae = new Vec3(boBai_width/item_width, boBai_height/item_height);
            playerItem.node.setScale(newSclae);
            playerItem.node.angle = 0;
            playerItem.node.active = true;
            playerItem.getComponent(Sprite).spriteFrame = this.spriteFrameCard.cardB1;

            tween(playerItem.node)
                .delay(0.5)
                .sequence(
                    tween().to(0.5, {position: item_positon}),
                    tween().to(0.1, {angle: (card == 0)? 10 : -10}),
                    //tween().to(0.2, {scale: new Vec3(1, 1)})
                )
                .start();

                tween(playerItem.node)      
                    .delay(0.5)         
                    .to(0.1, {scale: new Vec3(1, 1)})
                    .start();

        }
    }

    openCard(bai){
        console.log("LAT BAI", bai);
        this.items.forEach((itemCard, index) => {
            const card = bai[index].card;
            const type = bai[index].type;

            tween(itemCard.node)
                .to(0.2, {scale: new Vec3(0, 1)})
                .call(() => {
                    itemCard.spriteFrame = this.spriteFrameCard.getCard(card, type);
                    itemCard.getComponent(mini_card).setCard(card, type);
                })
                .to(0.2, {scale: new Vec3(1, 1)})
                .start();
        })
        
    }

    onMessage(data){

    }

    setAvatar(data){
        //data = data >> 0; //chuyển đôi dữ liệu sang số nguyên vì data.avatar là kiểu string    
        //console.log("lay avata thay cho: ", this.Avatar.spriteFrame.name, " bang", data);
    }

    setInfo(data, isWin = false){
        console.log("set info player");
        // console.log(data);
        
        if(!!data){
            this.node.active = true;
            if(data.balans !== void 0){
                if(isWin){
                    console.log("Win nha ");                   
                    tween(this.node)
                        .delay(1)
                        .call(() => {
                            this.balans.string = heper_until.numberWithCommas(data.balans);
                            data = null;
                        }) 
                        .start();
                }
                else{
                    //console.log("balans: ", this.balans,this);                   
                    this.balans.string = heper_until.numberWithCommas(data.balans);
                }
            }

            //!!data.name && (this.nickname.string = data.name);
            //cách viết tương tự
            if(!!data.name){
                //console.log("set name: ", data.name);               
                this.nickname.string = data.name;
            }
            if(!!data.progress){
                console.error("START PEOGRESS");
                
                this.startProgress(data.progress);
            }
            if(data.bet != void 0){
                //console.log("set bet: ", data.bet);              
                this.bet.string = heper_until.numberWithCommas(data.bet);
                //console.log("this is bet: ", this.bet.string);
                
            }
            if(data.openCard !== void 0 && this.playerMap){
                this.openCard(data.openCard);
            }
            if(data.avatar !== void 0){
                //console.log("set avatar: ", data.avatar);               
                this.setAvatar(data.avatar);
            }
        }else{
            this.resetGame();
            this.node.active = false;
        }
    }

    infoGame(info, isWin = false){
        console.log("set info game", info);
        
        if(info.nap !== void 0){
            const nap = parseInt(info.nap);
            if(nap > 0){
                //thông báo và làm gì đó để nap
            }
        }
        if(info.hoa !== void 0){
            const hoa = parseInt(info.hoa);
            this.miniStatus(this.canvasControll.miniStatusPrefabs[8]); 
            if(hoa>0){
                //this.noticeBet(hoa, '+', 3.5, 22, this.canvasControll.font1);
            }
        }
        if(info.to !== void 0){
            const to = parseInt(info.to);
            this.miniStatus(this.canvasControll.miniStatusPrefabs[4]);
            if(to>0){
                //this.noticeBet(to, '+', 2.5, 22, this.canvasControll.font1);
            }
        }
        if(info.win !== void 0){
            console.log("Win: ", info.win);           
            tween(this.node)
                .delay(1)
                .call(()=>{
                    const win = parseInt(info.win);
                    this.status.destroyAllChildren();
                    if(win){
                        this.noticeBet(win, '+', 3.5, 22, this.canvasControll.font1);
                    }
                    this.bgWin.active = true;
                    info = null;
                })
                .start();
        }
        if(info.lost !== void 0){
            console.log("LOSE: ", info.lost);
            
            tween(this.node)
                .delay(1)
                .call(()=>{
                    const lose = parseInt(info.lost);
                    this.miniStatus(this.canvasControll.miniStatusPrefabs[7]);
                    if(lose > 0){
                        this.noticeBet(lose, '-', 3.5, 22, this.canvasControll.font2);
                    }
                    info = null;
                })
                .start();

            // setTimeout(() => {
            //     const lose = parseInt(info.lose);
            //         this.miniStatus(this.canvasControll.miniStatusPrefabs[7]);
            //         if(lose > 0){
            //             this.noticeBet(lose, '-', 3.5, 22, this.canvasControll.font2);
            //         }
            //         info = null;
            // }, 1000);
        }
        if(info.theo !== void 0){
            const theo = parseInt(info.theo);
            this.miniStatus(this.canvasControll.miniStatusPrefabs[2]);
            if(theo > 0){
                this.noticeBet(theo, '+', 2.5, 22, this.canvasControll.font1);
            }
        }
        if(info.xem !== void 0){
            const xem = parseInt(info.xem);
            this.miniStatus(this.canvasControll.miniStatusPrefabs[3]);
            if(xem>0){
                this.noticeBet(xem, '+', 2.5, 22, this.canvasControll.font1);
            }
        }
        if(info.huy !== void 0){
            this.isHuy = true;
            this.miniStatus(this.canvasControll.miniStatusPrefabs[1]);
            // this.items.forEach((item) => {
            //     console.log("xet mau cho la bai???");
                
            //     //item.node.getComponent(Sprite).color;
            // })
        }
        if(info.all !== void 0){
            this.isAll = true;
            const all = parseInt(info.all);
            this.miniStatus(this.canvasControll.miniStatusPrefabs[0]);
            if(all > 0){
                this.noticeBet(all, '+', 2.5, 25, this.canvasControll.font1);
            }
        }
    }

    miniStatus(statusPrefab: Prefab){
        console.log("hien thi staus");        
        this.status.destroyAllChildren();
        const status = instantiate(statusPrefab);
        this.status.addChild(status);
        //phần này làm tween và hiệu ứng cho status và hủy status sau 2.5s
        tween(this.status)
            .delay(2.5)
            .call(() => {
                if(this.status.children.length > 0){
                    this.status.destroyAllChildren();
                }
            })
            .start();
    }

    startProgress(time){
        console.log("START PROGRESS");       
        this.Progress.progress = 0;
        this.progressTime = time;
        this.oldTime = new Date().getTime();
        this.isUpdate = true;
    }

    setProgress(time, progress){
        this.Progress.progress = progress;
        this.progressTime = time;
        this.oldTime = new Date().getTime();
        this.isUpdate = true;
    }

    resetGame(){
        this.items.forEach((item) => {
            item.color  = new Color(255,255,255);
			item.node.active = false;
			//item.bai = null;
        });
		this.isAll = false;
		this.isHuy = false;
		this.resetStatus();
		this.bgWin.active = false;
		this.bet.string = '';
		this.isOpen = false;
		this.titleCard.node.active = false;
    }

    resetStatus(){    
        this.status.destroyAllChildren();
        this.notice.destroyAllChildren();
        
    }

    noticeBet(bet, t, time, size, font){
        //hiển thị thống báo, làm sau
    }

    update(deltaTime: number){
        if(this.isUpdate == true){            
            let h = new Date().getTime();
            let progress = ((h-this.oldTime)/1000)/this.progressTime;
            this.Progress.progress = progress + (deltaTime/this.progressTime);
            if (this.Progress.progress >= 1) {
                this.Progress.progress = 0;
                this.progressTime = 0;
                this.isUpdate = false;
            }
        }
    }

}


