'use strict';
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
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const client = axios_1.default.create({
    timeout: 30000,
});
(0, axios_retry_1.default)(client, {
    retries: 3,
    shouldResetTimeout: true,
    retryCondition: (_error) => true,
    retryDelay: (retryCount) => {
        return retryCount * (Number(100) || 0); // milisecond
    }
});
function successHandler(result) {
    return {
        success: true,
        res: (result.data ? result.data : null),
        headers: result.headers,
        status: result.status,
    };
}
function errorHandler(e) {
    if (e.response) {
        return {
            success: false,
            status: e.response.status,
            res: e.response.body ? e.response.body : (e.response.data ? e.response.data : null),
            err: e.message,
            headers: e.response.headers ? e.response.headers : null,
        };
    }
    else {
        return {
            success: false,
            status: 999,
            res: null,
            err: e.message,
            headers: null,
        };
    }
}
const req_api = {
    get: (url, option) => __awaiter(void 0, void 0, void 0, function* () {
        // console.info('## config.reqApi.get')
        return new Promise((resolve, rejects) => __awaiter(void 0, void 0, void 0, function* () {
            let timeStart = new Date();
            let result;
            try {
                if (!url)
                    return false;
                result = yield client.get(url, option);
                let timeEnd = new Date() - timeStart;
                console.info(`GET Request url: ${url} - time: ${timeEnd} ms`);
                return resolve(successHandler(result));
            }
            catch (e) {
                if ([400, 401, 403].includes(e.status)) {
                    console.error('### Error config.reqApi.get:', e.message, e.status);
                    return resolve(errorHandler(e));
                }
                console.error('### Error config.reqApi.get:', e);
                return resolve(errorHandler(e));
            }
        }));
    }),
    post: (url, body, option) => __awaiter(void 0, void 0, void 0, function* () {
        // console.info('## config.reqApi.post');
        let timeStart = new Date();
        let result;
        try {
            result = yield client.post(url, body, option);
            let timeEnd = new Date() - timeStart;
            console.info(`POST Request url: ${url} - time: ${timeEnd} ms`);
            return successHandler(result);
        }
        catch (e) {
            if ([400, 401, 403].includes(e.status)) {
                console.error('### Error config.reqApi.post:', e.message, e.status);
                return errorHandler(e);
            }
            console.error('### Error config.reqApi.post:', e);
            return errorHandler(e);
        }
    }),
    put: (url, body, option) => __awaiter(void 0, void 0, void 0, function* () {
        // console.info('## config.reqApi.put')
        let timeStart = new Date();
        let result;
        try {
            result = yield client.put(url, body, option);
            let timeEnd = new Date() - timeStart;
            console.info(`PUT Request url: ${url} - time: ${timeEnd} ms`);
            return successHandler(result);
        }
        catch (e) {
            if ([400, 401, 403].includes(e.status)) {
                console.error('### Error config.reqApi.post:', e.message, e.status);
                return errorHandler(e);
            }
            console.error('### Error config.reqApi.put:', e);
            return errorHandler(e);
        }
    }),
    delete: (url, option) => __awaiter(void 0, void 0, void 0, function* () {
        console.info('## config.reqApi.delete');
        let timeStart = new Date();
        let result;
        try {
            result = yield client.delete(url, option);
            let timeEnd = new Date() - timeStart;
            console.info(`DELETE Request url: ${url} - time: ${timeEnd} ms`);
            return successHandler(result);
        }
        catch (e) {
            if ([400, 401, 403].includes(e.status)) {
                console.error('### Error config.reqApi.post:', e.message, e.status);
                return errorHandler(e);
            }
            console.error('### Error config.reqApi.delete:', e);
            return errorHandler(e);
        }
    }),
};
exports.default = req_api;
//# sourceMappingURL=req_api.js.map