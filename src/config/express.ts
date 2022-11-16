import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export const error = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error('Internal Server Error', req.originalUrl);
  console.error('Error', err);
  let resData = {
    code: 500,
    msg: 'Internal Server Error',
    data: null,
    ts: Date.now(),
  };
  return res.status(500).json(resData);
}

export const notFound = ((req: Request, res: Response, next: NextFunction) => {
  console.info('Server Not Found', req.originalUrl);
  let resData = {
    code: 404,
    msg: 'Server Not Found',
    data: null,
    ts: Date.now(),
  };
  return res.status(404).json(resData);
});