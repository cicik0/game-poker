import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

//@ccclass('heper_until')
export namespace heper_until  {
    //thêm dấu chấm theo các đơn vị 
    export function numberWithCommas(num){
        if(num){
            var result = (num = parseInt(num)).toString().split(".");              
            return result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."), result.join(".")
        }
        return "0";
    }

    //Lấy ra số từ chuỗi string
    export function getOnlyNumberInString(t:string) : string{
        var e = t.match(/\d+/g);
        return e ? e.join("") : "";
    }

    //thêm số 0 trước các số nhỏ hơn 10
    export function numberPad(number, length) {
        let str = '' + number;
        while(str.length < length)
            str = '0' + str;
        return str;
    }
}


