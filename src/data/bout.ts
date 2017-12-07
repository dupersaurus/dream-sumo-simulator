import {Rikishi} from "./rikishi"
import { Technique } from "./technique";
import { Serializable } from "./serializable";


export enum Result {
    None = 0,
    East = 1,
    West = 2
}

export class Bout implements Serializable {
    private _west: Rikishi;
    private _east: Rikishi;

    private _result: Result = Result.None;
    private _technique: Technique = Technique.None;


	public get west(): Rikishi {
		return this._west;
	}

	public get east(): Rikishi {
		return this._east;
	}

	public get result(): Result  {
		return this._result;
	}

	public get technique(): Technique  {
		return this._technique;
    }
    
    serialize(): Object {
        return {west: this._west.serialize(), east: this._east.serialize(), result: this._result, technique: this._technique};
    }
}