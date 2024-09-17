import { _decorator, Component, director, instantiate, log, Node, resources, spriteAssembler, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

//@ccclass('spiteframe_util')
export namespace spiteframe_util{
    export function changeSpriteFrame(path, cbFinish){
        resources.load(path,SpriteFrame, (err, avataSpriteFrame) => {         
            //console.log("complete load", (avataSpriteFrame as SpriteFrame));
              
            if(!err){
                cbFinish?.(avataSpriteFrame as SpriteFrame)
            }else{
                //console.log(err);
            }
        });       
    }
}

 
