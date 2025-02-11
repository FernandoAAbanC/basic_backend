import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import middie from '@fastify/middie'
import fastify, { FastifyInstance } from 'fastify'
import { providerRoutes } from './resources/provider/providers.routes.js'
import http2 from "node:http2";
require('dotenv').config();


const app = fastify({ logger: true });

const server = async () => {
    try {
        await app.register(middie);
        app.register(Swagger);
        app.register(SwaggerUI);
        
        app.register(providerRoutes, { prefix: "api/v1/provider" });
        app.get("/", async function () {
            return "CancunTours-2024";
        });

        await app.listen({
            port: 3000,
            host: '0.0.0.0'
        });

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

server();