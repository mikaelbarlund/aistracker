import dotenv from 'dotenv';
dotenv.config();
let MONGODB_URI = process.env.MONGODB_URI || '';
if (process.env.NODE_ENV === 'test' && process.env.TEST_MONGODB_URI) {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}
export default {
  MONGODB_URI
};