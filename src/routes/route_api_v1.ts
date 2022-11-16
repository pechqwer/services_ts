import { Request, Response, NextFunction, Router } from 'express'
import routerApi from '../config/config.routes.api'
import apiV1 from '../controllers/api/controller_api_index'
import apiLine from '../controllers/api/controller_api_line'

export const routerApiV1 = Router();

routerApiV1.get(routerApi.index, apiV1.indexGet)
routerApiV1.post(routerApi.line, apiLine.webhookPost)