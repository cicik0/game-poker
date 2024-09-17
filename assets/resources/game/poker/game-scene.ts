import {_decorator, Component, ResolutionPolicy, view, Prefab, director, sys, Node} from 'cc';
import { menu_room } from './menu-room/scripts/menu-room';

const {ccclass, property} = _decorator;

@ccclass('game_scene')
export class game_scene extends Component {

    @property({
        type: Node
    })
    menuRoom: Node|null = null;

    onLoad() {
        const DESIGN_SOLUTION = {
            width: 1280,
            height: 720
        }
        let deviceResolution = view.getResolutionPolicy();
        
        const isLongScreen = deviceResolution.canvasSize.width * DESIGN_SOLUTION.height / DESIGN_SOLUTION.width > deviceResolution.canvasSize.height
        const mode =  isLongScreen ? ResolutionPolicy.FIXED_HEIGHT : ResolutionPolicy.FIXED_WIDTH
        view.setDesignResolutionSize(DESIGN_SOLUTION.width, DESIGN_SOLUTION.height, mode);

        utils.changeLanguage('en')
    }

    start() {
        ws.start()
    }

    touchBtnBack() {
        sys.localStorage.setItem('user', null)
        director.loadScene('login')
    }

    changeLanguage() {
       utils.changeLanguage('vi')
    }

    showMenuRoom(){
        //this.menuRoom.getComponent(menu_room).showMenuRoom();
        this.menuRoom.active = true;
    }

    hideMenuRoom(){
        console.info("back menu");
        this.menuRoom.active = false;
    }
}

