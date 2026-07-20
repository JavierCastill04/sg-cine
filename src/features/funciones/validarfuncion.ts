import { Funcion } from "@/types/Funcion";
import { Pelicula } from "@/types/Pelicula";
export type Campo = "peliculaId" | "salaId" | "fecha" | "horaInicio";
export type FormData = Record<Campo, string>;
export type FormErrors = Record<Campo, string>;

export const calcularHoraFin = (horaInicio: string, duracion: number): string => {
    const [horas, minutos] = horaInicio.split(":").map(Number);
    const fecha = new Date();
    fecha.setHours(horas);
    fecha.setMinutes(minutos + duracion);

    return `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`;
};

export const existeFuncion = (formData: FormData, funciones: Funcion[], peliculas: Pelicula[], funcionEditando: Funcion | null): boolean => {
    console.log(funciones);
    const peliculaNueva = peliculas.find(pelicula => pelicula.id === Number(formData.peliculaId));

    if (!peliculaNueva) return false;

    const nuevaHoraInicio = formData.horaInicio;
    const nuevaHoraFin = calcularHoraFin(nuevaHoraInicio, peliculaNueva.duracion);

    return funciones.some(funcion => {

        if (funcion.id === funcionEditando?.id)
            return false;

        if (funcion.salaId !== Number(formData.salaId) || funcion.fecha !== formData.fecha) {
            return false;
        }

        const peliculaExistente = peliculas.find(pelicula => pelicula.id === funcion.peliculaId);

        if (!peliculaExistente) {
            return false;
        }

        const horaFinExistente = calcularHoraFin(funcion.horaInicio, peliculaExistente.duracion);

        return (nuevaHoraInicio < horaFinExistente && funcion.horaInicio < nuevaHoraFin
        );
    });
};

export const validarCampo = (
    campo: Campo,
    valor: string,
    formData: FormData,
    funciones: Funcion[],
    peliculas: Pelicula[],
    funcionEditando: Funcion | null
): string => {

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaFuncion = new Date(valor);

    switch (campo) {
        case "peliculaId":
            if (!valor)
                return "Debe seleccionar una película";
            break;

        case "salaId":
            if (!valor)
                return "Debe seleccionar una sala";
            break;

        case "fecha":
            if (!valor)
                return "Debe seleccionar una fecha";
            if (fechaFuncion < hoy) {
                return "La fecha debe ser de mañana en adelante.";
            }
            break;

        case "horaInicio":
            if (!valor)
                return "Debe seleccionar una hora";
            if (existeFuncion(formData, funciones, peliculas, funcionEditando)) {
                return "Ya existe una función en esa sala y horario";
            }
            break;
    }

    return "";
};