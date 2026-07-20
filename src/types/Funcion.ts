import {EstadoAsiento} from "@/types/EstadoAsiento";
export interface Funcion {
    id: number;
    peliculaId: number;
    salaId: number;
    fecha: string;
    hora: string;
    precio: number;
    estadoAsientos: EstadoAsiento[];
}