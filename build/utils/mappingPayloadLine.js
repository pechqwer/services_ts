"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappingPayloadLine = void 0;
const query_string_1 = __importDefault(require("query-string"));
class mappingPayloadLine {
    constructor(flows, id) {
        this.flows = flows;
        this.id = query_string_1.default.parse(id).action;
    }
    mapping(elements) {
        if (!elements)
            return null;
        if (elements.length <= 0)
            return null;
        const arrayMap = [];
        for (const data of elements) {
            switch (data.type) {
                case 'text':
                    if (data.options.buttons && data.options.buttons.length > 0) {
                        const temp = {
                            type: 'template',
                            altText: data.options.message,
                            template: {
                                type: 'buttons',
                                text: data.options.message,
                                actions: []
                            }
                        };
                        for (const button of data.options.buttons) {
                            temp.template.actions.push({
                                type: 'postback',
                                label: button.text,
                                displayText: button.text,
                                data: `action=${button['sub-id']}`
                            });
                        }
                        arrayMap.push(temp);
                    }
                    else {
                        arrayMap.push({
                            type: data.type,
                            text: data.options.message
                        });
                    }
                    break;
                default:
                    break;
            }
        }
        console.log(JSON.stringify(arrayMap));
        return arrayMap;
    }
    findStart() {
        const flowStart = this.flows.find(f => f.type === 'start');
        if (!flowStart)
            return null;
        const elements = flowStart === null || flowStart === void 0 ? void 0 : flowStart.elements;
        const mappingLine = this.mapping(elements);
        return mappingLine;
    }
    findNext() {
        const flowNext = this.flows.find(f => f.id === this.id);
        if (!flowNext)
            return null;
        const elements = flowNext === null || flowNext === void 0 ? void 0 : flowNext.elements;
        const mappingLine = this.mapping(elements);
        return mappingLine;
    }
}
exports.mappingPayloadLine = mappingPayloadLine;
//# sourceMappingURL=mappingPayloadLine.js.map