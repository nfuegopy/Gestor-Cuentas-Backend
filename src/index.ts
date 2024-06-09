import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

const server = express();

const createNestServer = async (expressInstance) => {
    const app = await NestFactory.create(AppModule, expressInstance);
    app.enableCors();
    await app.init();
};

createNestServer(server);

export const api = functions.https.onRequest(server);
