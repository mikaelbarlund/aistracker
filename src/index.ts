import { job } from './services/CronService';
import app from './app';

const PORT = process.env.PORT || 3001;
console.log(`started job ${job.name}`);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});