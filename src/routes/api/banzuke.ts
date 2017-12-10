import { APIRoute } from "./api-route";
import {Express, Router, Request, Response, NextFunction} from "express";
import { BankuzeManager } from "../../managers/banzuke-manager";

export class BanzukeAPI extends APIRoute {
    constructor(app:Express) {
        super(app);

        app.get(this.apiPath("banzuke/:id"), 
            (req: Request, res: Response, next: NextFunction) => this.getBanzuke(req, res, next));

        app.post(this.apiPath("banzuke/:id/rikishi"), 
            (req: Request, res: Response, next: NextFunction) => this.addRikishi(req, res, next));

        app.delete(this.apiPath("banzuke/:id/rikishi"), 
            (req: Request, res: Response, next: NextFunction) => this.removeRikishi(req, res, next));

        app.post(this.apiPath("banzuke/:id/edit"), 
            (req: Request, res: Response, next: NextFunction) => this.moveRikishi(req, res, next));
    }

    protected getBanzuke(req: Request, res: Response, next: NextFunction) {
        let id: number = +req.params["id"]; 
        let banzuke = BankuzeManager.getBanzuke(id);

        if (banzuke == null) {
            res.status(400).send({error: "No banzuke found with given id"});
        } else {
            res.status(200).send({banzuke: banzuke.serialize()});
        }
    }

    protected addRikishi(req: Request, res: Response, next: NextFunction) {
        let id: number = +req.params["id"]; 
        let banzuke = BankuzeManager.getBanzuke(id);

        if (banzuke == null) {
            res.status(400).send({error: "No banzuke found with given id"});
        } else {
            try {
                banzuke.addRikishi(+req.body.rikishi, +req.body.position);
                res.status(200).send({banzuke: banzuke.serialize()});
            } catch (e) {
                res.status(400).send({error: e.message});
            }
        }
    }

    protected removeRikishi(req: Request, res: Response, next: NextFunction) {
        let id: number = +req.params["id"]; 
        let banzuke = BankuzeManager.getBanzuke(id);

        if (banzuke == null) {
            res.status(400).send({error: "No banzuke found with given id"});
        } else {
            try {
                banzuke.removeRikishi(+req.body.rikishi);
                res.status(200).send({banzuke: banzuke.serialize()});
            } catch (e) {
                res.status(400).send({error: e.message});
            }
        }
    }

    protected moveRikishi(req: Request, res: Response, next: NextFunction) {
        let id: number = +req.params["id"]; 
        let banzuke = BankuzeManager.getBanzuke(id);

        if (banzuke == null) {
            res.status(400).send({error: "No banzuke found with given id"});
        } else {
            try {
                banzuke.moveRikishi(+req.body.rikishi, +req.body.position);
                res.status(200).send({banzuke: banzuke.serialize()});
            } catch (e) {
                res.status(400).send({error: e.message});
            }
        }
    }
}