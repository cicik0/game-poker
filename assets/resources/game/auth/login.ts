import { _decorator, Component, director, EditBox, game, Node, ResolutionPolicy, sys, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('login')
export class login extends Component {
    @property(EditBox)
    edbUsername;

    @property(EditBox)
    edbPass;

    protected onLoad(): void {
        const DESIGN_SOLUTION = {
            width: 1280,
            height: 720
        }
        let deviceResolution = view.getResolutionPolicy();

        const isLongScreen = deviceResolution.canvasSize.width * DESIGN_SOLUTION.height / DESIGN_SOLUTION.width > deviceResolution.canvasSize.height
        const mode = isLongScreen ? ResolutionPolicy.FIXED_HEIGHT : ResolutionPolicy.FIXED_WIDTH
        view.setDesignResolutionSize(DESIGN_SOLUTION.width, DESIGN_SOLUTION.height, mode);

        utils.changeLanguage('en')
        game.on('WS_ON_MESSAGE', this.onMessage, this);
    } 

    protected onDestroy(): void {
        game.off('WS_ON_MESSAGE', this.onMessage, this);
    }

    start() {
        ws.start();
        setTimeout(()=>{
            this.autoLogin()
        }, 500)
    }

    //  tu dong dang nhap 
    autoLogin() {
        const userStr = sys.localStorage.getItem('user')

        console.log('userStr', userStr);
        
        if (userStr) {
            const user = JSON.parse(userStr)

            let checkT = user?.UID; // UID
            let checkH = user?.token // token
            if (!!checkT && !!checkH) {
                var hash = utils.signHash(checkT + checkH);
                console.log('LOGIN BY TOKEN: ', JSON.stringify({ authentication: { id: checkT, token: checkH, hash } }))
                ws.send({ authentication: { id: checkT, token: checkH, hash } });
            }
        } 
        else{
            return;
        }
    }

    onMessage(data) {
        console.log('tnq7777', data);
        
        if (data?.Authorized === true) {
            // login thanh cong
            director.loadScene('poker-game-scene');
            console.log("load scene poker-game -scene");
            
            sys.localStorage.setItem('user', JSON.stringify(data?.user))
        }
    }
 
    touchLogin() {
        console.log("touch login, ws send mesg");
        const username = this.edbUsername.string
        const pass = this.edbPass.string
        var hash = utils.signHash(username + pass);
        const msg = { authentication: { username:username, password: pass, hash } }
        ws.send(msg)
    }
}
