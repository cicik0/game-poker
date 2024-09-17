import { _decorator, Component, Label, Node, game } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('SettingPU')
export class SettingPU extends Component {
    @property(Label)
    lblVersion;

    @property(Node)
    iconSound;

    @property(Node)
    iconMusic;

    @property(Node)
    iconVibrate;

    start() {
        this.lblVersion.string = VERSION_UPDATE;

        this.updateSetting();
    }

    toggleMusic() {
        app.setting.isMusicOn = !app.setting.isMusicOn;
        this.updateSetting();
        app.saveSetting();
        if (!app.setting.isMusicOn) AudioUtils.stopHomeMusic();

        game.emit('ON_MUSIC_CHANGE');
    }

    toggleSound() {
        app.setting.isSoundOn = !app.setting.isSoundOn;
        this.updateSetting();
        app.saveSetting();
    }

    updateSetting() {
        this.iconMusic
            .getComponent(ItemSetting)
            .setEnable(app.setting.isMusicOn);
        this.iconSound
            .getComponent(ItemSetting)
            .setEnable(app.setting.isSoundOn);
        this.iconVibrate
            .getComponent(ItemSetting)
            .setEnable(app.setting.isVibrate);
    }

    update(deltaTime: number) {}
}
