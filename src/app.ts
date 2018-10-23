 import cors from "cors";
 import { GraphQLServer, PubSub } from "graphql-yoga";
 import helmet from "helmet";
 import logger from "morgan";
 import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction, Response} from "express";
 
class App { 
    public app: GraphQLServer;
    public pubSub: any;
    constructor() {
        this.pubSub = new PubSub();  // this PubSUb is a kind of Demo version, use for Only Test Mode
        this.pubSub.ee.setMaxListeners(99); // graphql-yoga에서 pubSub를 구현할때 메모리 누수가 생긴다. 그래서 이 구문을 추가해준다.(2018-10-16 현재)
        this.app = new GraphQLServer({
            schema : schema,
            context : req => {
                console.log(req);
                return {
                    req : req.request,
                    pubSub : this.pubSub
                }
            }
        });
        this.middlewares();
    }
    private middlewares = (): void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
    };
    private jwt = async(req, res: Response, next: NextFunction) => {
        const token = req.get("XJWT");
        if (token) {
            const user = await decodeJWT(token);
            if (user){
                req.user = user;
            } else {
                req.user = undefined;
            }
        }
        next();
    };
 }

 export default new App().app;