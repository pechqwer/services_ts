import 'dotenv/config'
import express, { Application, Request, Response, NextFunction } from 'express'
import { routes } from './routes';
import { error, notFound } from './config/express'
import './config/req_api'

class Server {
  private app: Application
  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port

    this.config()
    this.run()

  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({
      extended: true
    }))

    this.app.use('/api/v1', routes);
    this.app.get('/error', (req: Request, res: Response, next: NextFunction) => {
      next(new Error('A contrived error'));
    })

    this.app.use(error);
    this.app.use(notFound);
  }

  private run(): void {
    this.app.listen(this.port, async () => {
      console.log(
        `server running : http://localhost:${this.port}`
      );
    })
  }

}

new Server(Number(process.env.port))

// const port = process.env.port

// const app: Application = express()

// app.use(express.json())
// app.use(express.urlencoded({
//   extended: true
// }))

// app.use('/api/v1', routes);

// app.get('/error', (req: Request, res: Response, next: NextFunction) => {
//   next(new Error('A contrived error'));
// })

// app.use(error);
// app.use(notFound);

// app.listen(port, async () => {
//   console.log(
//     `server running : http://localhost:${port}`
//   );
// })
