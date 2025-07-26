import { config } from 'dotenv'

config({path: `.env.${process.env.PORT || 'development'}.local`});

export const { NODE_ENV, PORT, DB_URI } = process.env;