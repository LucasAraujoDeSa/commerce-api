import 'dotenv/config';
import 'reflect-metadata'
import './database/index'

import express, { json } from 'express';

import {router} from '../routes/index.routes'

const app = express();
app.use(json())

app.use(router);

export {app}
