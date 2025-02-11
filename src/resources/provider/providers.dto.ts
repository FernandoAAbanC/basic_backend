/**
 * The Data Transfer Object (DTO)
 * encapsulates & exposes a subset of an object's data to clients of an API
 */

import { ProviderDto } from "./provider.dto.js";
import { ProviderWithId } from "./providers.types.js";

// Data Transfer Object for providersDto (list of providerDtos)
export class ProvidersDto {
  readonly providers: ProviderWithId[]; 

  constructor(providers: ProviderWithId[]) {
    // Map through the providers array input and create a new providerDto
    this.providers = providers.map(
      provider => new ProviderDto(provider.id, provider.nombre, provider.responsable, provider.correo, provider.telefono),
    );
  }
}