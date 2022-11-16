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
exports.webhooksLine = void 0;
const req_api_1 = __importDefault(require("../config/req_api"));
class webhooksLine {
    constructor(replyToken, userId, tokenChannel) {
        this.replyToken = replyToken;
        this.userId = userId;
        this.tokenChannel = tokenChannel;
        this.option = {
            headers: {
                'Authorization': `Bearer ${this.tokenChannel}`,
                'Content-Type': 'application/json'
            }
        };
    }
    follow(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`CASE: FOLLOW`);
            try {
                if (!messages || messages.length <= 0)
                    return null;
                yield req_api_1.default.post(process.env.lineReplyToken, {
                    replyToken: this.replyToken,
                    messages: messages.slice(0, 10)
                }, this.option);
            }
            catch (error) {
                console.debug(error);
                yield req_api_1.default.post(process.env.linePushToken, {
                    to: this.userId,
                    messages: messages.slice(0, 10)
                }, this.option);
            }
        });
    }
    unfollow() {
    }
    send(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`CASE: SEND-MESSAGE`, messages);
            try {
                if (!messages || messages.length <= 0)
                    return null;
                yield req_api_1.default.post(process.env.lineReplyToken, {
                    replyToken: this.replyToken,
                    messages: messages.slice(0, 10)
                }, this.option);
            }
            catch (error) {
                console.debug(error);
                yield req_api_1.default.post(process.env.linePushToken, {
                    to: this.userId,
                    messages: messages.slice(0, 10)
                }, this.option);
            }
        });
    }
}
exports.webhooksLine = webhooksLine;
//# sourceMappingURL=webhooksLine.js.map