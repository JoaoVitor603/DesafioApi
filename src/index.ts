/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import routes from './routes/v1';
import 'express-async-errors';
import 'reflect-metadata';
// import helmet from 'helmet';
// import compression from 'compression';
import ApiError from './utils/apiError.utils';
import config, { environments } from './config/config';
import logger from './config/logger';
import database from './config/database';
// import routes from './routes/server';
import swaggerDocs from './config/swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

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

  //   routes(app);

  if (config.env !== environments.PRODUCTION) {
    swaggerDocs(app, config.publicUrl, config.port);
  }
});

// export default app;
