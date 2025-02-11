import { IProvidersRepository } from "./providers.interfaces.js";
import { Provider } from "./providers.types.js";

export class ProvidersService {

  constructor(private itemsRepository: IProvidersRepository) {}

  addProviderAsync = async (nombre: string, responsable: string, correo: string, telefono:number) => {
    // Create the Provider from inputs
    const newProvider: Provider = {
      nombre,
      responsable,
      correo,
      telefono
    };

    const dbProvider = await this.itemsRepository.saveProviderAsync(newProvider);
    return dbProvider;
  };

  getAllProvidersAsync = async () => {
    const dbProviders = await this.itemsRepository.readAllProvidersAsync();
    return dbProviders;
  };

  getProviderByIdAsync = async (id: number) => {
    const foundProvider = await this.itemsRepository.readProviderByIdAsync(id);
    return foundProvider;
  };

  updateProviderByIdAsync = async (
    id: number,
    nombre: string,
    responsable: string,
    correo: string,
    telefono: number
  ) => {
    const updatedProvider = await this.itemsRepository.updateProviderByIdAsync(
      id,
      nombre,
      responsable,
      correo,
      telefono
    );

    return updatedProvider;
  };

  deleteProviderByIdAsync = async (id: number) => {
    const deletedProvider = await this.itemsRepository.deleteProviderByIdAsync(id);
    return deletedProvider;
  };
}