import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import { Request, Response } from 'express';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;

  private config(): void {
    // set up mongoose
    const MONGO_URI = 'mongodb://localhost/test';
    mongoose.connect(process.env.MONGO_URI || MONGO_URI);

    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    // use logger middlware
    this.app.use(logger('dev'));

    // use json form parser middlware
    this.app.use(bodyParser.json());

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // use override middlware
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use(function(
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      err.status = 404;
      next(err);
    });

    // error handling
    this.app.use(errorHandler());

    this.app.use(compression());
    this.app.use(cors());
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req: Request, res: Response) => {
      res.status(200).send({
        message: 'Hello World!'
      });
    });

    router.post('/', (req: Request, res: Response) => {
      const data = req.body;
      // query a database and save data
      res.status(200).send(data);
    });

    this.app.use('/', router);
  }
}

export default new App().app;
