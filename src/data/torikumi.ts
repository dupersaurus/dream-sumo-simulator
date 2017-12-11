import { Bout } from "./bout";
import { Rikishi } from "./rikishi";
import { Serializable } from "./serializable";
import { RikishiManager } from "../managers/rikishi-manager";
import { BoutManager } from "../managers/bout-manager";

/**
 * The scheduled bouts for one day
 */
export class Torikumi implements Serializable {

    private _id: number;

    /** Id of the basho the day is for */
    private _basho: number;

    /** Which day of the basho this is */
    private _day: number;

    /** List of bouts */
    private _bouts: number[] = [];

    /** Wresters not competing on this day */
    private _kyujo: number[] = [];

    constructor(id: number, basho: number, day: number) {
        this._id = id;
        this._basho = basho;
        this._day = day;

        this._bouts = [0, 1];
        this._kyujo = [4];
    }

    serialize(): Object {
        let obj = {bouts: new Array(), kyujo: new Array()};

        this._bouts.forEach(element => {
            obj.bouts.push(BoutManager.get(element).serialize());
        });

        this._kyujo.forEach(id => {
            obj.kyujo.push(RikishiManager.get(id).serialize());
        });

        return obj;
    }
}