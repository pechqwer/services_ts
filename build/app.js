"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const express_2 = require("./config/express");
require("./config/req_api");
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.config();
        this.run();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            extended: true
        }));
        this.app.use('/api/v1', routes_1.routes);
        this.app.get('/error', (req, res, next) => {
            next(new Error('A contrived error'));
        });
        this.app.use(express_2.error);
        this.app.use(express_2.notFound);
    }
    run() {
        this.app.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
            console.log(`server running : http://localhost:${this.port}`);
        }));
    }
}
new Server(Number(process.env.port));
// const port = process.env.port
// const app: Application = express()
// app.use(express.json())
// app.use(express.urlencoded({
//   extended: true
// }))
// app.use('/api/v1', routes);
// app.get('/error', (req: Request, res: Response, next: NextFunction) => {
//   next(new Error('A contrived error'));
// })
// app.use(error);
// app.use(notFound);
// app.listen(port, async () => {
//   console.log(
//     `server running : http://localhost:${port}`
//   );
// })
//# sourceMappingURL=app.js.map