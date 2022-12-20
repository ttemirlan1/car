import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '30min',
  },
};