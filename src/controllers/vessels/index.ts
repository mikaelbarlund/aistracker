import express from 'express';
import vessel from '../../models/vessel';

const router = express.Router();

router.get('/', (_request, response) => {
  vessel.find({}).then(a => {
    response.json(a.filter(v => v.features.find(f => f.properties.timestampExternal > Date.now() - (4 * 24 * 60 * 60 * 1000))));
  },
  e => console.log(e));
});

export default router;