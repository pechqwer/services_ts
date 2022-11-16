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
Object.defineProperty(exports, "__esModule", { value: true });
const apiV1 = {
    indexGet: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('# Controller apiV1.indexGet');
        try {
            // const result = await axios.get('https://httpstat.us/500')
            // console.log(result)
            return res.send({ image: '1234' });
        }
        catch (err) {
            console.error('# Error Controller apiV1.indexGet:', err);
            return res.send(err);
        }
    })
};
exports.default = apiV1;
//# sourceMappingURL=controller_api_index.js.map