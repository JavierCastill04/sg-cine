export interface Asiento{
    id: string;
    sala: number;
    ubicacion: {fila:number, columna:number};
    estado: "disponible" | "seleccionado" | "reservado";
}