import path from "path"
import env from "dotenv"

const paths = {
    dev: path.resolve('./configs/.env.dev'),
    prod: path.resolve('./configs/.env.prod')
}

export const NODE_ENV = process.env.NODE_ENV || 'prod';

env.config({ path: paths[NODE_ENV] });

export const PORT = process.env.PORT || 3000
export const DB_URL = process.env.DB_URL || ''
export const DB_NAME = process.env.DB_NAME || ''