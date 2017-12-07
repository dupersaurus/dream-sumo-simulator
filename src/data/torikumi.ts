import { Bout } from "./bout";
import { Rikishi } from "./rikishi";
import { Serializable } from "./serializable";

/**
 * The scheduled bouts for one day
 */
export class Torikumi implements Serializable {

    /** List of bouts */
    private _bouts: Bout[] = [];

    /** Wresters not competing on this day */
    private _kyujo: Rikishi[] = [];

    serialize(): Object {
        let obj = {bouts: new Array(), kyujo: new Array()};

        this._bouts.forEach(element => {
            obj.bouts.push(element.serialize());
        });

        this._kyujo.forEach(element => {
            obj.kyujo.push(element.serialize());
        });

        return obj;
    }
}