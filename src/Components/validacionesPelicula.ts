import type { Pelicula } from "@/types/Pelicula";
import {
  GENEROS,
  CLASIFICACIONES,
} from "@/components/peliculaOptions";

export type CampoPelicula =
  | "codigo"
  | "nombre"
  | "genero"
  | "duracion"
  | "clasificacion"
  | "precio";

export type ErroresPelicula = Record<
  CampoPelicula,
  string
>;

export const erroresIniciales: ErroresPelicula = {
  codigo: "",
  nombre: "",
  genero: "",
  duracion: "",
  clasificacion: "",
  precio: "",
};

interface ValidarCampoParametros {
  campo: CampoPelicula;
  valor: string;
  peliculas: Pelicula[];
  peliculaEditando: Pelicula | null;
}

export function validarCampo({
  campo,
  valor,
  peliculas,
  peliculaEditando,
}: ValidarCampoParametros): string {
  const valorLimpio = valor.trim();

  if (!valorLimpio) {
    const mensajes: Record<CampoPelicula, string> = {
      codigo: "El código es obligatorio.",
      nombre: "El nombre es obligatorio.",
      genero: "El género es obligatorio.",
      duracion: "La duración es obligatoria.",
      clasificacion:
        "La clasificación es obligatoria.",
      precio: "El precio es obligatorio.",
    };

    return mensajes[campo];
  }

  switch (campo) {
    case "codigo": {
      const codigoNormalizado =
        valorLimpio.toUpperCase();

      if (!/^PEL-\d{3}$/.test(codigoNormalizado)) {
        return "Use el formato PEL-XXX, por ejemplo PEL-001.";
      }

      const codigoDuplicado = peliculas.some(
        (pelicula) =>
          pelicula.codigo.toUpperCase() ===
            codigoNormalizado &&
          pelicula.id !== peliculaEditando?.id,
      );

      return codigoDuplicado
        ? "Ya existe una película con este código."
        : "";
    }

    case "nombre":
      return valorLimpio.length < 3
        ? "El nombre debe tener al menos 3 caracteres."
        : "";

    case "genero":
      return GENEROS.includes(
        valorLimpio as (typeof GENEROS)[number],
      )
        ? ""
        : "Seleccione un género válido.";

    case "duracion": {
      const numero = Number(valorLimpio);

      if (!Number.isInteger(numero) || numero <= 0) {
        return "La duración debe ser un entero mayor que cero.";
      }

      return numero > 600
        ? "La duración no puede superar 600 minutos."
        : "";
    }

    case "clasificacion":
      return CLASIFICACIONES.includes(
        valorLimpio as
          (typeof CLASIFICACIONES)[number],
      )
        ? ""
        : "Seleccione una clasificación válida.";

    case "precio": {
      const numero = Number(valorLimpio);

      if (Number.isNaN(numero) || numero < 0) {
        return "El precio debe ser mayor o igual a cero.";
      }

      return /^\d+(\.\d{1,2})?$/.test(valorLimpio)
        ? ""
        : "El precio solo puede tener dos decimales.";
    }
  }
}