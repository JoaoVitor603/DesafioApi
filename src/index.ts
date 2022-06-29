/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/v1';
import 'express-async-errors';
import 'reflect-metadata';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
import swaggerDocs from './config/swagger';
import AppError from './utils/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(helmet());
app.use(compression());

app.use(
  (
    error: Error | AppError,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333! 🏆');
});

app.get('/api/healthcheck', (req: Request, res: Response) =>
  res.sendStatus(200)
);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

app.listen(config.port, async () => {
  logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

  await database();

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }
});
