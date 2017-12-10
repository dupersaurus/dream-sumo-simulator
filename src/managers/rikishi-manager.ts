import {Rikishi} from "../data/rikishi"

export class RikishiManager {
    private static _instance: RikishiManager;
    
    // TODO dependency injection
    private static get instance(): RikishiManager {
        if (this._instance == null) {
            this._instance = new RikishiManager();
        }

       return this._instance;
    }

    private _rikishi: Map<number, Rikishi> = new Map();

    constructor() {
        this._rikishi.set(0, new Rikishi(0, "Hakuho"));
        this._rikishi.set(1, new Rikishi(1, "Kisenosato"));
        this._rikishi.set(2, new Rikishi(2, "Kakuryu"));
        this._rikishi.set(3, new Rikishi(3, "Goeido"));
        this._rikishi.set(4, new Rikishi(4, "Takarafuji"));
        this._rikishi.set(5, new Rikishi(5, "Endo"));
    }

    public static get(id: number): Rikishi {
        return this.instance.get(id);
    }

    private get(id: number): Rikishi {
        if (this._rikishi.has(id)) {
            return this._rikishi.get(id);
        } else {
            return null;
        }
    }
}