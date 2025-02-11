/**
 * The controller is responsible for handling incoming HTTP requests
 * and returning HTTP responses
 */

import { FastifyReply, FastifyRequest } from "fastify";
import { ProviderDto } from "./provider.dto.js";
import { ProvidersDto } from "./providers.dto.js";
import { ProvidersService } from "./providers.service.js";
import { Provider } from "./providers.types.js";

export class ProvidersController {
constructor(private providersService: ProvidersService) {}

  addProviderAsync = async (
    req: FastifyRequest<{ Body: Provider }>,
    reply: FastifyReply,
  ) => {
    const { nombre, responsable, correo, telefono } = req.body;
    const addedProvider = await this.providersService.addProviderAsync(
      nombre,
      responsable,
      correo,
      telefono
    );

    // Create a DTO to return to the client
    const providerDto = new ProviderDto(
      addedProvider.id,
      addedProvider.nombre,
      addedProvider.responsable,
      addedProvider.correo,
      addedProvider.telefono
    );

    reply.code(201).send(providerDto);
  };

  getAllProvidersAsync = async (req: FastifyRequest, reply: FastifyReply) => {
    const providers = await this.providersService.getAllProvidersAsync();

    // Create a DTO to return to the client
    const providersDto = new ProvidersDto(providers);

    reply.code(200).send(providersDto);
  };

  getProviderByIdAsync = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) => {
    const { id } = req.params;
    const foundProvider = await this.providersService.getProviderByIdAsync(id);

    // Create a DTO to return to the client
    const providerDto = new ProviderDto(
      foundProvider.id,
      foundProvider.nombre,
      foundProvider.responsable,
      foundProvider.correo,
      foundProvider.telefono
    );

    reply.code(200).send(providerDto);
  };

  updateProviderByIdAsync = async (
    req: FastifyRequest<{
      Params: { id: number };
      Body: { nombre: string; responsable: string; correo: string, telefono: number };
    }>,
    reply: FastifyReply,
  ) => {
    const { id } = req.params;
    const { nombre, responsable, correo, telefono } = req.body;

    const updatedProvider = await this.providersService.updateProviderByIdAsync(
      id,
      nombre,
      responsable,
      correo,
      telefono
    );

    // Create a DTO to return to the client
    const providerDto = new ProviderDto(
      updatedProvider.id,
      updatedProvider.nombre,
      updatedProvider.responsable,
      updatedProvider.correo,
      updatedProvider.telefono
    );

    reply.code(200).send(providerDto);
  };

  deleteProviderByIdAsync = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ) => {
    const { id } = req.params;
    const deletedProvider = await this.providersService.deleteProviderByIdAsync(id);

    // Create a DTO to return to the client
    const providerDto = new ProviderDto(
      deletedProvider.id,
      deletedProvider.nombre,
      deletedProvider.responsable,
      deletedProvider.correo,
      deletedProvider.telefono
    );

    reply.code(200).send(providerDto);
  };
}