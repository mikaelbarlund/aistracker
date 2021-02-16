import express from 'express';
import cors from 'cors';

import vesselsRouter from './controllers/vessels';
const app = express();
app.use(express.static('front'));
app.use(cors());
app.use(express.json());

app.use('/api/vessels', vesselsRouter);

export default app;