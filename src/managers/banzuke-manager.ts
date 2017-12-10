import { Banzuke } from "../data/banzuke";

export class BankuzeManager {
    private static _instance: BankuzeManager;
    
    // TODO dependency injection
    private static get instance(): BankuzeManager {
        if (this._instance == null) {
            this._instance = new BankuzeManager();
        }

        return this._instance;
    }    

    private _banzukes: Map<number, Banzuke> = new Map();

    constructor() {
        this._banzukes.set(0, new Banzuke());
    }

    public static getBanzuke(id: number): Banzuke {
        return this.instance.getBanzuke(id);
    }

    private getBanzuke(id: number): Banzuke {
        if (this._banzukes.has(id)) {
            return this._banzukes.get(id);
        } else {
            return null;
        }
    }
}