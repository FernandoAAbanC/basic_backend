/**
 * The router is responsible for calling the correct
 * http controller method based on the request url
 */

import { FastifyInstance } from "fastify";
import { ProvidersController } from "./providers.controller.js";
import { ProvidersRepositoryInMem } from "./providers.repository.db.js";
import { ProvidersService } from "./providers.service.js";

// Instantiate the ProvidersController
const providersController = new ProvidersController(
  new ProvidersService(new ProvidersRepositoryInMem()),
);

// ========================================
// Define Schema Objects to Validate Routes
// ========================================
const Provider = {
  type: "object",
  properties: {
    id: { type: "number" },
    nombre: { type: "string" },
    resonsable: { type: "string" },
    correo: { type: "string" },
    telefono: { type: "number" }
  },
};

const Providers = {
  type: "object",
  properties: {
    providers: {
      type: "array",
      properties: {
        provider: Provider,
      },
    },
  },
};

const addProviderOpts = {
  schema: {
    description: "Add new Provider",
    body: {
      type: "object",
      required: ["nombre", "responsable", "correo", "telefono"],
      properties: {
        nombre: { type: "string" },
        responsable: { type: "string" },
        correo: { type: "string" },
        telefono: { type: "number" }
      },
    },
    response: {
      201: Provider,
    },
  },
  handler: providersController.addProviderAsync,
};

const getAllProvidersOpts = {
  schema: {
    description: "Get all Providers",
    response: {
      200: Providers,
    },
  },
  handler: providersController.getAllProvidersAsync,
};

const getProvidersByIdOpts = {
  schema: {
    description: "Get Provider by id",
    params: {
      id: { type: "number" },
    },
    response: {
      200: Provider,
    },
  },
  handler: providersController.getProviderByIdAsync,
};

const updateProviderByIdOpts = {
  schema: {
    description: "Update an Provider with specific id",
    params: {
      id: { type: "number" },
    },
    body: {
      type: "object",
      properties: {
        nombre: { type: "string" },
        responsable: { type: "string" },
        correo: { type: "string" },
        telefono: { type: "number" }

      },
    },
    response: {
      200: Provider,
    },
  },
  handler: providersController.updateProviderByIdAsync,
};

const deleteProviderByIdOpts = {
  schema: {
    description: "Delete an Provider by its id",
    params: {
      id: { type: "number" },
    },
    response: {
      200: Provider,
    },
  },
  handler: providersController.deleteProviderByIdAsync,
};

export async function providerRoutes(server: FastifyInstance) {
  // Add Provider
  server.post("/", addProviderOpts);

  // Get all Providers
  server.get("/", getAllProvidersOpts);

  // Get Provider by id
  server.get("/:id", getProvidersByIdOpts);

  // Update Provider by id
  server.put("/:id", updateProviderByIdOpts);

  // Delete Provider by id
  server.delete("/:id", deleteProviderByIdOpts);
}