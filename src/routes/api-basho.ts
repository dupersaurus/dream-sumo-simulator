import {Express, Router, Request, Response, NextFunction} from "express";
import { APIRoute } from "./api-route";
import { BashoManager } from "../managers/basho-manager";

export class APIBasho extends APIRoute {
    constructor(app:Express) {
        super(app);

        app.get(this.apiPath("basho"), 
            (req: Request, res: Response, next: NextFunction) => this.handleBashoList(req, res, next));
        
        app.get(this.apiPath("basho/:id"), 
            (req: Request, res: Response, next: NextFunction) => this.handleGetBasho(req, res, next));

        app.post(this.apiPath("basho/:id"), 
            (req: Request, res: Response, next: NextFunction) => this.handleEditBasho(req, res, next));
    }

    protected handleBashoList(req: Request, res: Response, next: NextFunction) {
        let basho = BashoManager.instance.listBashos();
        
        if (basho == null) {
            res.status(400).send({error: "Unable to list bashos"});
        } else {
            res.status(200).send({bashos: basho});
        }
    }

    protected handleGetBasho(req: Request, res: Response, next: NextFunction) {
        let id: number = +req.params["id"]; 
        let basho = BashoManager.instance.getBasho(id);

        if (basho == null) {
            res.status(400).send({error: "No basho found with given id"});
        } else {
            res.status(200).send({basho: basho.serialize()});
        }
    }

    protected handleEditBasho(req: Request, res: Response, next: NextFunction) {
        let id: number = +req.params["id"]; 
        let basho = BashoManager.instance.getBasho(id);

        if (basho == null) {
            res.status(400).send({error: "No basho found with given id"});
        } else {
            try {
                basho.edit(req.body.name, req.body.year);
                res.status(200).send({basho: basho.serializeBrief()});
            } catch (e) {
                res.status(400).send({error: e});
            }
        }
    }
}