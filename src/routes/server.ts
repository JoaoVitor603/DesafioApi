// import cors from 'cors';
// import express, { Request, Response } from 'express';
// import routes from './v1';

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(routes);

// app.listen(3333, () => {
//   // eslint-disable-next-line no-console
//   console.log('Server started on port 3333! 🏆');
// });

// app.get('/api/healthcheck', (req: Request, res: Response) =>
//   res.sendStatus(200)
// );

//     res.sendStatus(200)
//   );

// function routes(app: Express) {
//   /**
//    * @openapi
//    * /api/healthcheck:
//    *  get:
//    *     tags:
//    *     - Healthcheck
//    *     description: Responds if the app is up and running
//    *     responses:
//    *       200:
//    *         description: App is up and running
//    */
//   app.get('/api/healthcheck', (req: Request, res: Response) =>
//     res.sendStatus(200)
//   );

//   app.use('/api/v1/', UserRouter);
//   app.listen(3333, () => {
//     console.log('Server started on port 3333! 🏆');
//   });
// }

// export default routes;
