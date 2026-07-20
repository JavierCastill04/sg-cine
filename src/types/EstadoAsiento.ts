export interface EstadoAsiento {
    asientoId: number;
    estado: "disponible" | "reservado" | "seleccionado";
}