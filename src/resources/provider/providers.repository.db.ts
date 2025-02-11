import { randomInt, randomUUID } from "node:crypto";
import { IProvidersRepository } from "./providers.interfaces.js";
import { Provider, ProviderWithId } from "./providers.types.js";
//import mysqlPromise from '../../utils/db.js';


export class ProvidersRepositoryInMem implements IProvidersRepository {
  // In-Memory Database
  #providers: ProviderWithId[] = [
    {
      id: 1,
      nombre: "bronze sword",
      responsable: "common",
      correo: "asd@gmail.com",
      telefono: 9982346587
    },
    {
      id: 2,
      nombre: "bronze 2",
      responsable: "common",
      correo: "asd@gmail.com",
      telefono: 9982346587
    },
    {
      id: 3,
      nombre: "bronze 3",
      responsable: "common",
      correo: "asd@gmail.com",
      telefono: 9982346587
    },
  ];

  saveProviderAsync = (provider: Provider) => {
    return new Promise<ProviderWithId>(resolve => {
      const uuid = randomInt(10);
      const newProvider: ProviderWithId = {
        id: uuid,
        ...provider,
      };
      this.#providers.push(newProvider);
      resolve(newProvider);
    });
  };

  readAllProvidersAsync = () => {
    return new Promise<ProviderWithId[]>((resolve, reject) => {
      if (this.#providers.length > 0) {
        resolve(this.#providers);
      } else {
        reject(new Error("Unable to get retrieve providers"));
      }
    });
  };

  readProviderByIdAsync = (id: number) => {
    return new Promise<ProviderWithId>((resolve, reject) => {
      const provider = this.#providers.find(provider => provider.id === id);
      if (provider) {
        resolve(provider);
      } else {
        reject(new Error(`Unable to retrieve provider with id ${id}`));
      }
    });
  };


  updateProviderByIdAsync = (
    id: number,
    nombre: string,
    responsable: string,
    correo: string,
    telefono: number
  ) => {
    return new Promise<ProviderWithId>((resolve, reject) => {
      const providerToUpdateIdx = this.#providers.findIndex(provider => provider.id === id);

      if (providerToUpdateIdx !== -1) {
        if (nombre) {
          this.#providers[providerToUpdateIdx]!.nombre = nombre;
        }

        if (responsable) {
          this.#providers[providerToUpdateIdx]!.responsable = responsable;
        }

        if (correo) {
          this.#providers[providerToUpdateIdx]!.correo = correo;
        }
        if (correo) {
            this.#providers[providerToUpdateIdx]!.correo = correo;
        }
        if (telefono) {
            this.#providers[providerToUpdateIdx]!.telefono = telefono;
        }

        resolve(this.#providers[providerToUpdateIdx]!);
      } else {
        reject(new Error(`Error updating provider with id ${id}`));
      }
    });
  };

  deleteProviderByIdAsync = (id: number) => {
    return new Promise<ProviderWithId>((resolve, reject) => {
      const providerToRemove = this.#providers.find(provider => provider.id === id);

      if (providerToRemove) {
        const filtered = this.#providers.filter(provider => provider.id !== id);
        this.#providers = [...filtered];
        resolve(providerToRemove);
      } else {
        reject(new Error(`Unable to find provider with id ${id}`));
      }
    });
  };
}