import express, {json} from 'express';
import cors from 'cors';
import { signUp } from './controllers/authController.js';

const server = express();
server.use(cors());
server.use(json());

server.post('/sign-up', signUp);

server.listen(5000, () => {
  console.log("Listening on 5000")
})
