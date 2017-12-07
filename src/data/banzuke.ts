import {Rikishi} from "./rikishi"
import { Torikumi } from "./torikumi";
import { Serializable } from "./serializable";

export class Banzuke implements Serializable {

    private _rikishi: Rikishi[] = [];
    private _schedule: Torikumi[] = [];

    private _numYokozuna: number = 0;
    private _numOzeki: number = 0;
    private _numSekiwake: number = 0;
    private _numKomusubi: number = 0;

    public serialize(): object {
        let obj = {
                    rikishi: new Array(), 
                    schedule: new Array(), 
                    yokozuna: this._numYokozuna,
                    ozeki: this._numOzeki,
                    sekiwake: this._numSekiwake,
                    komusubi: this._numKomusubi
                };

        this._rikishi.forEach(element => {
            obj.rikishi.push(element.serialize());
        });

        this._schedule.forEach(element => {
            obj.schedule.push(element.serialize());
        });

        return obj;
    }
}