import { Honbasho, HonbashoName } from "../data/honbasho";

export class BashoManager {
    private static _instance: BashoManager;

    // TODO dependency injection
    static get instance(): BashoManager {
        if (this._instance == null) {
            this._instance = new BashoManager();
        }

        return this._instance;
    }

    private _bashos: Honbasho[] = [];

    private constructor() {
        BashoManager._instance = this;

        this._bashos.push(new Honbasho(0, HonbashoName.Hatsu, 2018));
        this._bashos.push(new Honbasho(1, HonbashoName.Haru, 2018));
        this._bashos.push(new Honbasho(2, HonbashoName.Natsu, 2018));
        this._bashos.push(new Honbasho(3, HonbashoName.Nagoya, 2018));
    }

    public listBashos(): object[] {
        let list: object[] = [];

        this._bashos.forEach(element => {
            list.push(element.serializeBrief());
        });

        return list;
    }

    public getBasho(id: number): Honbasho {
        for (var basho of this._bashos) {
            if (basho.id == id) {
                return basho;
            }
        }

        return null;
    }
}