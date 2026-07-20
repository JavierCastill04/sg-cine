import {EstadoAsiento} from "@/types/EstadoAsiento";
export interface Funcion {
    id: number;
    peliculaId: number;
    salaId: number;
    fecha: string;
    horaInicio: string;
    precio: number;
    estadoAsientos: EstadoAsiento[];
}