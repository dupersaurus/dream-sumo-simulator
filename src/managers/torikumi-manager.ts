import { Torikumi } from "../data/torikumi";

export class TorikumiManager {
    private static _instance: TorikumiManager;
    
    // TODO dependency injection
    private static get instance(): TorikumiManager {
        if (this._instance == null) {
            this._instance = new TorikumiManager();
        }

       return this._instance;
    }

    private _torikumi: Map<number, Torikumi> = new Map();

    constructor() {
        this._torikumi.set(0, new Torikumi(0, 0, 0));
        this._torikumi.set(1, new Torikumi(1, 0, 1));
        this._torikumi.set(2, new Torikumi(2, 0, 2));
        this._torikumi.set(3, new Torikumi(3, 0, 3));
    }

    public static get(id: number): Torikumi {
        return this.instance.get(id);
    }

    private get(id: number): Torikumi {
        if (this._torikumi.has(id)) {
            return this._torikumi.get(id);
        } else {
            return null;
        }
    }
}