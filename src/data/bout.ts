import {Rikishi} from "./rikishi"
import { Technique } from "./technique";
import { Serializable } from "./serializable";
import { RikishiManager } from "../managers/rikishi-manager";


export enum Result {
    None = 0,
    East = 1,
    West = 2
}

export class Bout implements Serializable {
    private _id: number = 0;
    private _torikumi: number = 0;

    /** Id of the west rikishi */
    private _west: number = -1;

    /** Id of the east rikishi */
    private _east: number = -1;

    private _result: Result = Result.None;
    private _technique: Technique = Technique.None;

    /** Id of the west rikishi */
	public get west(): number {
		return this._west;
	}

    /** Id of the east rikishi */
    public get east(): number {
		return this._east;
	}

	public get result(): Result  {
		return this._result;
	}

	public get technique(): Technique  {
		return this._technique;
    }

    constructor(id: number, west: number, east: number, result: Result = Result.None, technique: Technique = Technique.None) {
        this._id = id;
        this._west = west;
        this._east = east;
        this._result = result;
        this._technique = technique;
    }
    
    serialize(): Object {
        return {
                id: this._id,
                west: RikishiManager.get(this._west).serialize(), 
                east: RikishiManager.get(this._east).serialize(), 
                result: this._result, 
                technique: this._technique
            };
    }
}