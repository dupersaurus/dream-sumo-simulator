import {Express} from "express"

export abstract class APIRoute {

    constructor(private _router:Express) {
        //_router.use(this.apiPath, 
        //    (req: express.Request, res: express.Response, next: express.NextFunction) => this.handleRequest(req, res, next));
    }

    protected apiPath(path: string, version: string = "1"): string {
        return `/api/${version}/${path}`;
    }

    get router(): Express {
        return this._router;
    }
}