import { APIRoute } from "./api-route";
import {Express, Router, Request, Response, NextFunction} from "express";
import {Rikishi} from "../../data/rikishi"
import {RikishiManager} from "../../managers/rikishi-manager"

export class RikishiAPI extends APIRoute {
    constructor(app:Express) {
        super(app);
        
        app.get(this.apiPath("rikishi"), 
            (req: Request, res: Response, next: NextFunction) => this.list(req, res, next));

        app.post(this.apiPath("rikishi"), 
            (req: Request, res: Response, next: NextFunction) => this.add(req, res, next));

        app.post(this.apiPath("rikishi/search"), 
            (req: Request, res: Response, next: NextFunction) => this.find(req, res, next));

        app.get(this.apiPath("rikishi/:id([0-9]+)"), 
            (req: Request, res: Response, next: NextFunction) => this.get(req, res, next));

        app.post(this.apiPath("rikishi/:id([0-9]+)"), 
            (req: Request, res: Response, next: NextFunction) => this.edit(req, res, next));
    }

    /**
     * List all rikishi
     * @param req
     * @param res 
     * @param next 
     */
    protected list(req: Request, res: Response, next: NextFunction) {
        const riks = RikishiManager.list();
        const serial: object[] = [];

        riks.forEach((rik, index) => serial.push(rik.serialize()));

        res.status(200).send({rikishi: riks});
    }

    protected get(req: Request, res: Response, next: NextFunction) {
        const rik = RikishiManager.get(+req.params["id"]);

        if (rik) {
            res.status(200).send({rikishi: rik.serialize()});
        } else {
            res.status(400).send({error: "No rikishi found with given id"});
        }
    }

    /**
     * Expects body parameter "search"
     * @param req 
     * @param res 
     * @param next 
     */
    protected find(req: Request, res: Response, next: NextFunction) {
        if (req.body.search === undefined || req.body.search == "") {
            res.status(400).send({error: "Missing required parameter 'search'"});
        }

        const riks = RikishiManager.findByName(req.body.search);
        const serial: object[] = [];

        riks.forEach(element => {
            serial.push(element.serialize());
        });

        res.status(200).send({rikishi: serial});
    }

    /**
     * Expects body parameter "name"
     * @param req 
     * @param res 
     * @param next 
     */
    protected add(req: Request, res: Response, next: NextFunction) {
        if (req.body.name === undefined || req.body.name == "") {
            res.status(400).send({error: "Missing required parameter 'name'"});
            return;
        }

        const rik = RikishiManager.add(req.body.name);

        if (rik) {
            res.status(200).send({rikishi: rik.serialize()});
        } else {
            res.status(400).send({error: "Unable to create rikishi"});
        }
    }

    /**
     * Expects body parameter "name"
     * @param req 
     * @param res 
     * @param next 
     */
    protected edit(req: Request, res: Response, next: NextFunction) {

    }
}