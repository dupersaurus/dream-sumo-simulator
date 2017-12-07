import {Logger, getLogger} from "log4js"

export class Log {
    public static logger: Logger;

    public static trace(log:string) {
        Log.logger.trace(log);
        console.log(log);
    }
}

console.log("Log >> run");

if (Log.logger == null) {
    console.log("Log >> setup");
    Log.logger = getLogger("file");
    Log.logger.level = "all";
}

export default Log;