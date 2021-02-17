import express from 'express';
import cors from 'cors';
import compression from 'compression';

import vesselsRouter from './controllers/vessels';
const app = express();
app.use(express.static('front'));
app.use(compression());
app.use(cors());
app.use(express.json());

app.use('/api/vessels', vesselsRouter);

export default app;