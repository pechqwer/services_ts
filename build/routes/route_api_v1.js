"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApiV1 = void 0;
const express_1 = require("express");
const config_routes_api_1 = __importDefault(require("../config/config.routes.api"));
const controller_api_index_1 = __importDefault(require("../controllers/api/controller_api_index"));
const controller_api_line_1 = __importDefault(require("../controllers/api/controller_api_line"));
exports.routerApiV1 = (0, express_1.Router)();
exports.routerApiV1.get(config_routes_api_1.default.index, controller_api_index_1.default.indexGet);
exports.routerApiV1.post(config_routes_api_1.default.line, controller_api_line_1.default.webhookPost);
//# sourceMappingURL=route_api_v1.js.map