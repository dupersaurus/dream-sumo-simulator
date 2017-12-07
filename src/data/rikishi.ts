import { Serializable } from "./serializable";

export class Rikishi implements Serializable {

    get id(): number    { return this._id; }
    get name(): string  { return this._name; }

    constructor(private _id: number, private _name: string) { }

    serialize(): Object {
        return {id: this._id, name: this._name};
    }
}