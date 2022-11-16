import express from 'express';
import { routerApiV1 } from './route_api_v1';

export const routes = express.Router();

routes.use(routerApiV1);