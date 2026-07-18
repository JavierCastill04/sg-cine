export interface Pelicula {
  id: number;
  codigo: string;
  nombre: string;
  genero: string;
  duracion: number;
  clasificacion: string;
  idSala: number;
  precio: number;
  disponible: boolean;
}