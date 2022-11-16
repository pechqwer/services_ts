"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.error = void 0;
const error = (err, req, res, next) => {
    console.error('Internal Server Error', req.originalUrl);
    console.error('Error', err);
    let resData = {
        code: 500,
        msg: 'Internal Server Error',
        data: null,
        ts: Date.now(),
    };
    return res.status(500).json(resData);
};
exports.error = error;
exports.notFound = ((req, res, next) => {
    console.info('Server Not Found', req.originalUrl);
    let resData = {
        code: 404,
        msg: 'Server Not Found',
        data: null,
        ts: Date.now(),
    };
    return res.status(404).json(resData);
});
//# sourceMappingURL=express.js.map