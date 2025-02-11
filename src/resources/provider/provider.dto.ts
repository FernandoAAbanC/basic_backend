export class ProviderDto {
    readonly id: number;
  
    readonly nombre: string;
  
    readonly responsable: string;
  
    readonly correo: string;
    
    readonly telefono: number;
  
    constructor(id: number, nombre: string, responsable: string, correo: string, telefono: number) {
      this.id = id;
      this.nombre = nombre;
      this.responsable = responsable;
      this.correo = correo;
      this.telefono = telefono;
    }
  }