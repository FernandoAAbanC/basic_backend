export type Provider = {
  nombre: string;
  responsable: string;
  correo: string;
  telefono: number;
};

export type ProviderWithId = Provider & {
  id: number;
};