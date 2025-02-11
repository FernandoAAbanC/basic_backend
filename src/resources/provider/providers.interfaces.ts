import { Provider,ProviderWithId } from "./providers.types.js";

export interface IProvidersRepository {
  // Create a new Provider in the DB (Add passed in Provider to the DB)
  saveProviderAsync(provider: Provider): Promise<ProviderWithId>;

  // Read in all Providers from the DB as an array
  readAllProvidersAsync(): Promise<ProviderWithId[]>;

  // Read in Provider from DB with specified id
  readProviderByIdAsync(id: number): Promise<ProviderWithId>;

  // Update an Provider in the DB
  updateProviderByIdAsync(
    id: number,
    nombre: string,
    resposnsable: string,
    correo : string,
    telefono: number
  ): Promise<ProviderWithId>;

  // Remove an Provider from the DB with specified id
  deleteProviderByIdAsync(id: number): Promise<ProviderWithId>;
}