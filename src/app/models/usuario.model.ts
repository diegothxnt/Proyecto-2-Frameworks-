export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  fechaRegistro: Date;
}

export interface Sesion {
  usuario: Usuario;
  token: string;
}