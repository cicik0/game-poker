import { _decorator, Component, Node, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main_game')
export class main_game extends Component {

  start() {

  }

  touchBtn(deltaTime: number) {
  console.log('asdasd')
    const w = window as any
    w._languageData.init('en');
    w._languageData.updateSceneRenderers();
  }

  touchBtnChoosePorker(){
      
  }
}

