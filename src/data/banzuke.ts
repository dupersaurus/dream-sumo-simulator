import {Rikishi} from "./rikishi";
import { Serializable } from "./serializable";
import {RikishiManager} from "../managers/rikishi-manager"

export class Banzuke implements Serializable {

    private _id: number = 0;

    /** List of rikishi in order on banzuke */
    private _rikishi: number[] = [];

    private _numYokozuna: number = 0;
    private _numOzeki: number = 0;
    private _numSekiwake: number = 0;
    private _numKomusubi: number = 0;

    public get id(): number {
        return this._id;
    }

    constructor() {
        this._rikishi = [0, 1, 2, 3, 4];
    }

    public addRikishi(id: number, index: number) {
        console.log(`addRikishi(${id})`);
        
        if (this._rikishi.indexOf(id) != -1) {
            throw new Error("Rikishi already on the banzuke");
        }

        const rik = RikishiManager.get(id);

        if (rik == null) {
            throw new Error("Invalid rikishi ID");
        }

        if (index < 0) {
            index = 0;
        }

        if (index >= this._rikishi.length) {
            index = this._rikishi.length - 1;
        }

        this._rikishi.splice(index, 0, id);
    }

    public moveRikishi(id: number, to: number) {
        let from = this._rikishi.indexOf(id);
        this._rikishi.splice(to, 0, id);

        if (to < from) {
            from++;
        }

        this._rikishi.splice(from, 1);
    }

    public removeRikishi(id: number) {
        const index = this._rikishi.indexOf(id);

        if (index >= 0) {
            this._rikishi.splice(index, 1);
        } else {
            throw new Error("Rikishi is not on the banzuke");
        }
    }

    public serialize(): object {
        const obj = {
                    id: this._id,
                    rikishi: new Array(),
                    yokozuna: this._numYokozuna,
                    ozeki: this._numOzeki,
                    sekiwake: this._numSekiwake,
                    komusubi: this._numKomusubi
                };

        this._rikishi.forEach(id => {
            const rik = RikishiManager.get(id);
            
            if (rik) {
                obj.rikishi.push(rik.serialize());
            }
        });

        return obj;
    }
}