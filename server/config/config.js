import dotenv from 'dotenv'
dotenv.config()
export const port = process.env.PORT;
export const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const dbURL = process.env.DATABASE_URL;