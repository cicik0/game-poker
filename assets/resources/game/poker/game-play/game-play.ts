import { _decorator, Color, Component, createDefaultPipeline, director, Font, game, instantiate, Label, Layout, log, Node, Prefab, Quat, Sprite, SpriteFrame, tween, UITransform, Vec3 } from 'cc';
import { poker_player } from '../poker-player/scripts/poker-player';
import { heper_until } from '../../unit/helper/heper-until';
import { card } from '../../unit/helper/card';
import { mini_card } from '../../unit/mini-card';
import { ItemSetting } from '../../base/popup-setting/setting/ItemSetting';
import { ui_unit } from '../../unit/ui_unit';
import { poker_nap } from '../menu-room/scripts/poker_nap';
import { popup_out } from './scripts/popup_out';
const { ccclass, property } = _decorator;

@ccclass('game_play')
export class game_play extends Component {

    @property({
        type: poker_nap
    })
    poker_nap: poker_nap|null;

    @property({
        type: Font
    })
    font1: Font|null;

    @property({
        type: Font
    })
    font2: Font|null;

    @property({
        type: Node
    })
    nodeNotice: Node|null;

    @property({
        type: Prefab
    })
    prefabNotice: Prefab|null;

    @property({
        type: Node
    })
    loading: Node|null;

    //redhat

    @property({
        type: Node
    })
    boo_bai: Node|null;

    @property({
        type: Prefab
    })
    outPrefab: Prefab|null;

    //notice node có logic

    @property({
        type: poker_player
    })
    players: poker_player[]|null = [];

    @property({
        type: Label
    })
    labelRoom: Label|null;

    @property({
        type: Label
    })
    mainBet: Label|null;

    @property({
        type: Label
    })
    labelTimeStart: Label|null;

    @property({
        type: Node
    })
    roomCard: Node|null;

    @property({
        type: Prefab
    })
    prefabsCard: Prefab|null;

    @property({
        type: Node
    })
    botton: Node|null;

    @property({
        type: Node
    })
    btnBo: Node|null;

    @property({
        type: Node
    })
    btnXem: Node|null;

    @property({
        type: Node
    })
    btnTheo: Node|null;

    @property({
        type: Node
    })
    btnTo: Node|null;

    @property({
        type: Node
    })
    btnAll: Node|null;

    //node panel card main

    //node btnPane

    @property({
        type: Node
    })
    nodeTo: Node|null;

    // @property({type:SpriteFrame}) spriteAll;
    // @property({type:SpriteFrame}) spriteHuy;
    // @property({type:SpriteFrame}) spriteTheo;
    // @property({type:SpriteFrame}) spriteXem;
    // @property({type:SpriteFrame}) spriteCuoc;
    // @property({type:SpriteFrame}) spriteWin;
    // @property({type:SpriteFrame}) spriteMe_win;
    // @property({type:SpriteFrame}) spriteLose;
    // @property({type:SpriteFrame}) spriteHoa;

    @property({type: Prefab}) miniStatusPrefabs:Prefab|null[] = [];

    @property({type: SpriteFrame}) titleCard:SpriteFrame[]|null = [];

    nodeOut: Node|null;

    dataOn: boolean = true;
    meMap: number;
    timeStop: number;
    card:card;
    currentPlayer: poker_player;

    protected onLoad(): void {

        this.initPlayer();
        this.timeStop = 0;
        game.on('WS_ON_MESSAGE', this.onMessage, this);
        
    } 

    protected onDestroy(): void {
        game.off('WS_ON_MESSAGE', this.onMessage, this);
    }

    start() {
        const scene = director.getScene();
        if(scene){
            const canvas = scene.getChildByName("Canvas");
            if(canvas){
                this.card = canvas.getChildByName("Card").getComponent(card);
            }
        }
        ws.start();
        ws.send({ scene: 'poker', g: { poker: { ingame: true } } });
    }

    //Poker -> ondata game goc
    onMessage(data) {
        if(this.dataOn){
            //console.log("dataon", data);
            
            // if(!!data.viewCard){
            //     console.log("view card", data.viewCard);
            //     //this.viewCard(data.viewCard);
            // }
            // if(!!data.mainCard){
            //     console.log("main card", data.mainCard);
            //     //this.viewMainCard(data.mainCard);                
            // }
            if(!!data.meMap){
                console.log("me map" + data.meMap);
                this.meMap = data.meMap;
            }
            if(!!data.infoGhe){
                console.log("if ghe: " , data.infoGhe);                
                this.infoGhe(data.infoGhe);
                // console.log("if ghe: " , data.infoGhe);                
            }
            if(!!data.infoRoom){
                console.log("if room",  data.infoRoom);
                this.infoRoom(data.infoRoom);     
                //console.log("if room",  data.infoRoom);
            }
            if(!!data.ingame){ //có người vào phòng
                console.log("some one come in room: " + data.ingame);
                this.ingame(data.ingame);              
            }
            if(!!data.outgame){ //có người rời khỏi phòng
                console.log("someone out room: ", data.outgame);
                this.outGame(data.outgame);                
            }
            if(!!data.game){
                //console.log("data game: ", data.game);
                this.game(data.game);
            }
            // if(!!data.kick){
            //     console.log("someone war kicked: " + data.kick);
            //     // this.kick(data.kick);
            // }
            // if(void 0 !== data.notice){
            //     console.log("notice: " + data.notice);
            //     // this.getComponentInChildren.show(data.notice);
            // }
            // if(void 0 !== data.load){
            //     console.log("load: " + data.load);
            //     // this.loading.active = data.load;
            // }
            // if(void 0 != data.nap){
            //     console.log("nap: " + data.nap);
            //     // this.player_nap.node.active = data.nap;
                
            // }
        }
    }

    gamePlayer(data){
        let player = this.players[data.ghe];
        if(data.data !== void 0){ //kiểm tra balans và bet
            console.log("HIEN THI THONG TIN BALANS VA BET");           
            player.setInfo(data.data); //hiển thị lại bet và balans
        }
        if(data.info !== void 0){
            console.log("HIEN INFO GAME");            
            player.infoGame(data.info); //set trạng thái lựa chọn của người chơi, đây là bước đánh bài
        }
    }

    resetGame(){
        this.timeStop = 0;
        this.mainBet.string = '';
        if(this.roomCard.children.length > 0){
            this.roomCard.destroyAllChildren();
        }
        // if(this.nodeNotice.children.length > 0){
        //     this.nodeNotice.destroyAllChildren();
        // }
        this.players.forEach((player) =>{
            console.log("reset player");           
            player.resetGame();
        })
    }

    gameInfo(data){
        //hiển thị thông tin thắng, thua, lật bài
        console.log("game info", data);
        data.data.forEach((infoPlayer) => {
            let player = this.players[infoPlayer.ghe];
            if(infoPlayer.data !== void 0){
                console.log("lat bai kiem tra: ", infoPlayer.ghe);  
                // if(player.playerMap !== infoPlayer.ghe){
                //     console.log("set info de lat bai");                   
                    
                // } 
                player.setInfo(infoPlayer.data, !!data.win);            
            }
            if(infoPlayer.info !== void 0){
                console.log("hien thi status thang thua: ", infoPlayer.info);                
                player.infoGame(infoPlayer.info);
            }
        })

        if(!!data.win){
            console.log("WHO WIN", data.win);
            tween(this.node)
                .delay(0.2)
                .call(() => {
                    this.players.forEach((player) => {
                        player.items.forEach((itemCard) => {
                            itemCard.color = new Color(153, 153, 153) //itemCard.color.fromHEX('999999');
                            //itemCard.getComponent(mini_card).setColor('#999999');
                        });
                    });

                    this.roomCard.children.forEach((itemCard) => {
                        itemCard.children[0].getComponent(Sprite).color = new Color(153, 153, 153)//itemCard.children[0].getComponent(Sprite).color.fromHEX('999999');
                        data.win.bo.forEach((itemBo) => {
                            const itemCardControll = itemCard.children[0].getComponent(mini_card);
                            if(itemCardControll){
                                const itemCard_card = itemCardControll.card;
                                const itemCard_type = itemCardControll.type;
                                if(itemCard_card == itemBo.card && itemCard_type == itemBo.type){
                                    itemCard.children[0].getComponent(Sprite).color = new Color(255,255,255) //itemCard.children[0].getComponent(Sprite).color.fromHEX('FFFFFF');
                                }
                            }
                            else{
                                console.log(itemCard);                                
                            }                                    
                        });
                    })

                    let player = this.players[data.win.ghe];
                    //console.log(player.name);                    
                    player.items.forEach((itemCard) => {
                        const itemCard_Controll = itemCard.getComponent(mini_card);
                        if(itemCard_Controll){
                            data.win.bo.forEach((itemBo) => {
                                if(itemCard_Controll.card == itemBo.card && itemCard_Controll.type == itemBo.type){
                                    itemCard.color = new Color(255,255,255) //itemCard.color.fromHEX('FFFFFF');
                                }
                            })
                        }
                    });

                    if(data.win.code !== void 0){
                        console.log("code: ", data.win.code);
                        
                        const code = parseInt(data.win.code);
                        if(code >= 2 && code <= 10){
                            player.titleCard.node.active = true;
                            player.titleCard.spriteFrame = this.titleCard[code - 2];
                        }
                    }                
                })
                .start();
        }
        
    }

    gameStop(){
        this.offSelect();
        this.labelTimeStart.string = "";
        this.labelTimeStart.node.active = false;
        this.timeStop = 8;
    }

    offSelect(){
        //console.log(this.players[this.meMap].name);
        
        if(this.currentPlayer){
            console.log("current player: ", this.currentPlayer.nickname.string);
            this.currentPlayer.isUpdate = false;
            this.currentPlayer.progressTime = 0;
            this.currentPlayer.Progress.progress = 0;
        }
        this.botton.active = false;
        this.nodeTo.active = false;
    }

    game(data){
        console.log("data game", data);
        
        if(!!data.start){
            console.log("game play start");        
            //this.gameStart(data.start);
        }
        if(!!data.stop){
            this.gameStop();
        }
        if(!!data.finish){
            this.gameStop();
        }
        if(!!data.chia_bai){
            console.log("game play chia bai_____");          
            this.ChiaBai(data.chia_bai);
            console.log("da chia bai");
            
        }
        if(!!data.turn){
            console.log("hien thi luot choi, chon chuc nang");           
            this.LuotChoi(data.turn);
        }
        if(!!data.info){
            console.log("game info", data.info);
            
            this.gameInfo(data.info);
        }
        if(!!data.player){
            this.gamePlayer(data.player);
        }
        if(data.offSelect != void 0){
            console.log("OFFSELECT");
            this.offSelect();
            
        }
        if(!!data.card){
            console.log("MAIN CARD", data.card);
            this.mainCard(data.card);
        }
    }

    LuotChoi(data){
        let player = this.players[data.ghe];
        if(player){
            console.log("RESET PROGRESS");
            
            player.isUpdate = false;
            player.progressTime = 0;
            player.Progress.progress = 0;
        }
        this.currentPlayer = player;
        player.startProgress(data.progress);
        if(data.select !== void 0){
            this.botton.active = true;
            if(data.select.xem){
                this.btnXem.active = true;
            }
            else{
                this.btnXem.active = false;
            }
            if(data.select.theo){
                this.btnTheo.active = true;
            }
            else{
                this.btnTheo.active = false;
            }
            if(data.select.to){
                this.btnTo.active = true;
            }
            else{
                this.btnTo.active = false;
            }
            if(data.select.all){
                this.btnAll.active = true;
            }
            else{
                this.btnAll.active = false;
            }
        }
        else{
            this.botton.active = false;
            this.nodeTo.active = false;
        }

    }

    //chia 5 la bai chinh
    mainCard(data){
        const boBai = this.boo_bai.getComponent(UITransform);
        let pos = this.boo_bai.parent.getComponent(UITransform).convertToWorldSpaceAR(this.boo_bai.getPosition());
        data.forEach((card) => {
            //console.log("card info: ", card);   
            let cardNode = instantiate(this.prefabsCard);
            cardNode.setScale(new Vec3(-1 , 1, 1));
            this.roomCard.addChild(cardNode);
            let layout = this.roomCard.getComponent(Layout);
            if(layout){
                //layout.updateLayout();
                //onsole.log("updata layout");                        
            }
            console.log(cardNode.position);
            let cardSprite = cardNode.children[0].getComponent(Sprite);
            const cardSPriteUItransform = cardSprite.node.getComponent(UITransform);
            tween(cardNode)  
                .delay(0.5)
                .call(()=>{
                    cardSprite.node.setPosition(cardNode.getComponent(UITransform).convertToNodeSpaceAR(pos));
                    // console.log("do some thing", cardSprite);   
                    const newScale = new Vec3(boBai.width/cardSPriteUItransform.width, boBai.height/cardSPriteUItransform.height);
                    cardSprite.spriteFrame = this.card.cardB1;
                    cardSprite.node.setScale(newScale);
                })  
                //.to(0.8, {position: new Vec3(0,0,0)})
                //.delay(0.5)
                .call(()=>{
                    //cardNode.children[0].setPosition(new Vec3(0,0));
                    tween(cardNode.children[0])
                        .to(0.1, {position: new Vec3(0,0)})
                        .start()
                })
                .delay(0.5)
                .to(0.2, { scale: new Vec3(0, 1, 1)})
                .call(() => {
                    cardSprite.spriteFrame = this.card.getCard(card.card, card.type);
                    cardSprite.getComponent(mini_card).setCard(card.card, card.type);
                    cardSprite = null;
                    card = null;  
                })
                .to(0.2, {scale: new Vec3(1, 1, 1)})
                .start()   
        })
        
    }

    ChiaBai(data){
        console.log("data chia bai ", data);
        
        let time = 0;
        for(let card = 0; card<2; card++){
            //console.log(data);
            
            data.forEach((bai) => {
                //console.log(bai.id.type);
                const index: number = bai.id   
                //console.log(index);         
                console.log("player: ",index, this.players[index]);                                  
                this.players[index].ChiaBai(bai, card, time);
                //console.log("player ", this.players[index].name);
                
                //time += 0.05;
            })
        }
    }

    infoGhe(info){
        console.log("set info ghe", info);
        let player = [];
        let newGhe = [];
        if(this.meMap != 1){
            let map = this.meMap - 1;
            newGhe = newGhe.concat(info.slice(map), info.slice(0, map));
        }else{
            newGhe = info;
        }

        newGhe.forEach((obj, index) => {
            let item = this.players[index];
            //console.log("player ", index, this.players[index]);
            item.playerMap = obj.ghe;
            player[obj.ghe] = item;            
            //console.log("hello ", obj.data);
            item.setInfo(obj.data);
            return void 0;
        });
        this.players = player;
        //console.log(this.players);
        player = null;
        newGhe = null;
    }

    infoRoom(data){
        //console.log("ifr");       
        if(data.game !== void 0){
            this.labelRoom.string = heper_until.numberWithCommas(data.game);
            //this.player_nap.init(data.game);
        }
        if(data.bet !== void 0){
            this.mainBet.string = heper_until.numberWithCommas(data.bet);
            //this.mainBet.string = `${data.bet}`;
        }
        if(data.isStop !== void 0){
            this.labelTimeStart.node.active = false;
            //continue to code
        }
        if(data.isPlay && data.time_start !== void 0){
            this.resetGame();
            let time_start =  parseInt(data.time_start); //data.time_start >> 0;
            this.labelTimeStart.node.active = true;
            this.labelTimeStart.string = '';
            //tweem hoặc bất kể thứ gì để trừ dần thời gain về 0
            this.timeStartGame(time_start);
        }
        if(data.first !== void 0){
            console.log("data first ", data.first);
            
            data.first.forEach((player) => {
                let get_player = this.players[player.id];
                //get_player.noticeBet(player.bet, '', 2, 22, this.font1);
                get_player.bet.string = heper_until.numberWithCommas(player.bet).toString();
            })
        }
        if(data.card !== void 0){
            //
        }
    }

    ingame(data){
        console.log("info nguoi ms vao phong"), data;       
        this.players[data.ghe].setInfo(data.data);
    }

    outGame(data){
        this.players[data].setInfo(null);
    }

    backGame(){
        this.dataOn = false;
        ws.send({
            g: { poker: {outgame: true}}
        });
        //this.loading.active = truee;
        director.loadScene("poker-game-scene");
    }

    onSelect(dt, select: string){
        ws.send({g: {poker: {select: select}}});
    }

    clickTo(){
        this.nodeTo.active = !this.nodeTo.active;
    }

    toggleOut(){
        this.nodeOut.active = false;
    }

    clickNap(){
        //this.player_nap.node.active = !this.player_nap.node.active;
    }

    clickOut(){
        if(this.nodeOut){
            this.nodeOut.active = true;
            this.nodeOut.getComponent(popup_out).show();
        }
        else{
            ui_unit.loadPopUp("game/poker/game-play/prefabs/popup-out", (nodeLoading) => {
                console.log("OUT GAME");
                this.nodeOut = nodeLoading;
            });
        }      
    }

    update(deltaTime: number) {
        if(this.timeStop != 0){
            // let date = new Date().getTime();
            // date = date - this.timeStop;
            // if(date >= 8000){
            //     this.timeStop = 0;
            //     this.resetGame();
            // }
            this.timeStop -= deltaTime;
            if(this.timeStop <= 0){
                this.timeStop = 0;
                this.resetGame;
            }
        }
    }

    initPlayer(){
        //console.log("hey init player");       
        this.players.forEach((player)=>{
            player.initPlayer();
        });
    }

    timeStartGame(timeStart: number){
        if(timeStart >= 0){
            this.labelTimeStart.string = heper_until.numberPad(timeStart, 2);
            this.startTimeControll(this.labelTimeStart.node, ()=>{
                timeStart--;
                this.timeStartGame(timeStart);
            })
        }
        else{
            this.labelTimeStart.node.active = false;
        }
    }

    startTimeControll(timeNode: Node, cb){
        tween(timeNode)
            .delay(1)
            .call(cb)
            .start();
    }
}


