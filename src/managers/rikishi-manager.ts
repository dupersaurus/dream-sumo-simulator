import {Rikishi} from "../data/rikishi"
import { forEach } from "async";

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

    public static list(): Rikishi[] {
        return this.instance.list();
    }

    private list(): Rikishi[] {
        const riks: Rikishi[] = [];
        this._rikishi.forEach((rik, key, map) => riks.push(rik));

        return riks;
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

    public static findByName(name: string): Rikishi[] {
        return this.instance.findByName(name);
    }

    private findByName(name: string): Rikishi[] {
        const riks: Rikishi[] = [];

        this._rikishi.forEach(element => {
            if (element.name.toLowerCase().includes(name.toLowerCase())) {
                riks.push(element);
            }
        });

        riks.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });

        return riks;
    }

    public static add(name: string): Rikishi {
        return this.instance.add(name);
    }

    private add(name: string): Rikishi {
        const rik = new Rikishi(this._rikishi.size, name);
        this._rikishi.set(this._rikishi.size, rik);

        return rik;
    }
}