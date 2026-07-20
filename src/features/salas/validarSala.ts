import { Sala } from "@/types/Sala";
export type Campo = "nombre" | "filas" | "columnas";
export type FormData = Record<Campo, string>;
export type FormErrors = Record<Campo, string>;

export function validarCampo(
    campo: Campo,
    valor: string,
    formData: FormData,
    salas: Sala[],
    salaEditando: Sala | null
): string {

    const nombreExiste = salas.some(sala =>sala.nombre === valor && sala.id !== salaEditando?.id);
    switch (campo) {
        case "nombre":
            if (!valor.trim())
                return "El nombre de la sala es obligatorio";
            if (!/^Sala \d+$/.test(valor))
                return 'El formato debe ser "Sala #"';
            if (valor.trim().length < 6)
                return "Mínimo 6 caracteres";
            if (nombreExiste)
                return "Ya existe una sala con ese nombre";
            return "";

        case "filas":
            if (!valor.trim())
                return "La cantidad de filas es obligatoria";
            if (!/^[1-9]\d*$/.test(valor))
                return "Cantidad inválida";
            return "";

        case "columnas":
            if (!valor.trim())
                return "La cantidad de columnas es obligatoria";
            if (!/^[1-9]\d*$/.test(valor))
                return "Cantidad inválida";
            return "";

        default:
            return "";
    }
}