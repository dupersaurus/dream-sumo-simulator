import { Serializable } from "./serializable";
import { Banzuke } from "./banzuke";

export enum HonbashoName {
    Hatsu,
    Haru,
    Natsu,
    Nagoya,
    Aki,
    Kyushu
}

export class Honbasho implements Serializable {

    private _id: number;
    private _name: HonbashoName;
    private _year: number;

    private _banzuke: Banzuke;

    public get id(): number {
        return this._id;
    }

	public get name(): HonbashoName {
		return this._name;
	}

	public get year(): number {
		return this._year;
	}
    

    constructor(id?: number, name?: HonbashoName, year?: number) {
        this._id = id;
        this._name = name;
        this._year = year;
        this._banzuke = new Banzuke();
    }

    public edit(name: number, year: number) {
        if (name in HonbashoName) {
            // TODO save to database
            this._name = name;
            this._year = year;   
        } else {
            console.error("invalid basho name");
            throw new Error("Invalid Honbasho name");
        }
    }

    public serialize(): object {
        return {
            id: this._id,
            name: this._name,
            year: this._year,
            banzuke: this._banzuke.serialize()
        };
    }

    public serializeBrief(): object {
        return {
            id: this._id,
            name: this._name,
            year: this._year
        };
    }
}