import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';
import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

export async function signUp(req, res) {
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  if(validation.error) {
    res.sendStatus(422);
    return
  }
  
  const passwordHash = bcrypt.hashSync(user.password, 10);

  await db.collection('users').insertOne({ ...user, password: passwordHash })

  res.sendStatus(201);
}