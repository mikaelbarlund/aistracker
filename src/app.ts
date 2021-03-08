import express from 'express';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import config from './config';
import vesselsRouter from './controllers/vessels';
const app = express();
app.use(express.static('front'));
app.use(compression());
app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(
    () => {
      console.log('connected to MongoDB');
    },
    e => console.log(e)
  );
app.use('/api/vessels', vesselsRouter);

export default app;