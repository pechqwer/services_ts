import { Request, Response, NextFunction } from 'express'
import axios from "../../config/req_api";

const apiV1 = {
  indexGet: async (req: Request, res: Response, next: NextFunction) => {
    console.log('# Controller apiV1.indexGet')
    try {
      // const result = await axios.get('https://httpstat.us/500')
      // console.log(result)
      return res.send({ image: '1234' });
    } catch (err) {
      console.error('# Error Controller apiV1.indexGet:', err);
      return res.send(err);
    }
  }
}

export default apiV1;
