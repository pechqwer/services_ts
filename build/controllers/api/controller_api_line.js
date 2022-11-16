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
const index_1 = require("../../utils/index");
const mapping = [{
        channel: '1657570422',
        token: '9TAKxpAvOCF3VuGR5dAcurrZ1mKxg/11ZqenOdhdZ7CvLu3/DSFLbqVP16LtZcbVvi/2xYE5TiUT8cXkIE3LlQ5/uhy3zb5rBhSy1ATch8NLMwl9hYvSLqmzLfg/3xZ1Y+PCvS+5rd3vKY+6kzGRrwdB04t89/1O/w1cDnyilFU='
    }];
const flow = [
    {
        "id": "x2902s.jj2is",
        "type": "start",
        "node": "messaging",
        "name": "เอาไว้เตือนว่า กุอยากได้ตูด",
        "elements": [
            {
                "type": "text",
                "options": {
                    "message": "อยากแดกตีนหรือเท้า",
                    "buttons": [
                        {
                            "sub-id": "x2902s.0001",
                            "text": "แดกตีน",
                            "next": "asd2xs.0001",
                            "order": 1
                        },
                        {
                            "sub-id": "x2902s.0002",
                            "text": "แดกเท้า",
                            "next": "asd2xs.0002",
                            "order": 2
                        }
                    ]
                },
                "order": "1"
            },
        ],
        "position": {
            "x": 123,
            "y": 128
        }
    },
    {
        "id": "x290dss.0002",
        "node": "messaging",
        "name": "เอาไว้เตือนว่า กุอยากได้ตูด",
        "elements": [
            {
                "type": "text",
                "options": {
                    "message": "เอาอะไรอีกไหม",
                    "buttons": []
                },
                "order": "1"
            },
        ],
        "position": {
            "x": 123,
            "y": 128
        }
    },
    {
        "id": "x2902s.0001",
        "node": "messaging",
        "elements": [
            {
                "type": "text",
                "options": {
                    "message": "0001",
                    "buttons": [
                        {
                            "sub-id": "qa2",
                            "text": "button1",
                            "next": "",
                            "order": 1
                        }
                    ]
                },
                "order": "2"
            },
        ],
        "position": {
            "x": 123,
            "y": 128
        }
    },
    {
        "id": "x2902s.0002",
        "node": "messaging",
        "elements": [
            {
                "type": "text",
                "options": {
                    "message": "0002"
                },
                "order": "2"
            },
        ],
        "position": {
            "x": 123,
            "y": 128
        }
    },
    {
        "id": "cost",
        "node": "edge",
        "node-start": "x2902s.jj2is",
        "node-end": "x290dss.0002",
        "position": {
            "x": 123,
            "y": 128
        }
    },
    {
        "id": "cost",
        "node": "edge",
        "node-start": "x2902s.0001",
        "node-end": "asd2xs.0001",
        "position": {
            "x": 123,
            "y": 128
        }
    },
    {
        "id": "cost",
        "node": "edge",
        "node-start": "x2902s.0002",
        "node-end": "asd2xs.0002",
        "position": {
            "x": 123,
            "y": 128
        }
    }
];
const apiLine = {
    webhookPost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('# Controller apiLine.webhook');
        try {
            const { body, query } = req;
            const channel = query.c;
            if (body.events.length <= 0)
                return res.send({ success: 500 });
            const event = body.events[0];
            const { type, message, postback } = event;
            const userId = event.source.userId;
            const find = mapping.find(f => f.channel == channel);
            if (!find)
                return res.send({ success: 500 });
            const webhook = new index_1.webhooksLine(event.replyToken, userId, find.token);
            let mappingPayload;
            let messagePayload;
            switch (type) {
                case 'unfollow':
                    break;
                case 'sticker':
                    break;
                case 'postback':
                    mappingPayload = new index_1.mappingPayloadLine(flow, postback.data);
                    messagePayload = mappingPayload.findNext();
                    if (!messagePayload)
                        break;
                    yield webhook.send(messagePayload);
                    break;
                case 'follow':
                    mappingPayload = new index_1.mappingPayloadLine(flow);
                    messagePayload = mappingPayload.findStart();
                    if (!messagePayload)
                        break;
                    yield webhook.follow(messagePayload);
                    break;
                case 'message':
                    switch (message.type) {
                        case 'image':
                            yield webhook.send([
                                {
                                    "type": "text",
                                    "text": "ไม่รับรูปครับ ไอ้สัส"
                                }
                            ]);
                            break;
                        case 'location':
                            break;
                        case 'audio':
                            break;
                        case 'text':
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            return res.send({ success: 200 });
        }
        catch (err) {
            console.error('# Error Controller apiLine.webhook:', err);
            return res.send(err);
        }
    })
};
exports.default = apiLine;
//# sourceMappingURL=controller_api_line.js.map