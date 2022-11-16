"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const route_api_v1_1 = require("./route_api_v1");
exports.routes = express_1.default.Router();
exports.routes.use(route_api_v1_1.routerApiV1);
//# sourceMappingURL=index.js.map