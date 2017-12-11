import { Bout } from "../data/bout";

export class BoutManager {
    private static _instance: BoutManager;
    
    // TODO dependency injection
    private static get instance(): BoutManager {
        if (this._instance == null) {
            this._instance = new BoutManager();
        }

       return this._instance;
    }

    private _bouts: Map<number, Bout> = new Map();

    constructor() {
        this._bouts.set(0, new Bout(0, 0, 1));
        this._bouts.set(1, new Bout(1, 2, 3));
    }

    public static get(id: number): Bout {
        return this.instance.get(id);
    }

    private get(id: number): Bout {
        if (this._bouts.has(id)) {
            return this._bouts.get(id);
        } else {
            return null;
        }
    }
}