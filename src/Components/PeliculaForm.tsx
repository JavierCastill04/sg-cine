"use client";

import { useState, type FormEvent } from "react";
import styles from "@/components/Peliculas.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addPelicula,
  updatePelicula,
} from "@/redux/slices/peliculaSlice";

import type { Pelicula } from "@/types/Pelicula";



type Campo =
  | "codigo"
  | "nombre"
  | "genero"
  | "duracion"
  | "clasificacion"
  | "precio";

type ErroresFormulario = Record<Campo, string>;

interface PeliculaFormProps {
  peliculaEditando: Pelicula | null;
  cancelarEdicion: () => void;
}



const erroresIniciales: ErroresFormulario = {
  codigo: "",
  nombre: "",
  genero: "",
  duracion: "",
  clasificacion: "",
  precio: "",
};



function validarCampo(
  campo: Campo,
  valor: string,
  peliculas: Pelicula[],
  peliculaEditando: Pelicula | null,
): string {
  const valorLimpio = valor.trim();

  switch (campo) {
    case "codigo": {
      if (!valorLimpio) {
        return "El código es obligatorio.";
      }

      if (valorLimpio.length < 3) {
        return "El código debe tener al menos 3 caracteres.";
      }

      const codigoNormalizado = valorLimpio.toLowerCase();

      const codigoDuplicado = peliculas.some(
        (pelicula) =>
          pelicula.codigo.trim().toLowerCase() ===
            codigoNormalizado &&
          pelicula.id !== peliculaEditando?.id,
      );

      if (codigoDuplicado) {
        return "Ya existe una película con este código.";
      }

      return "";
    }

    case "nombre":
      if (!valorLimpio) {
        return "El nombre es obligatorio.";
      }

      if (valorLimpio.length < 3) {
        return "El nombre debe tener al menos 3 caracteres.";
      }

      return "";

    case "genero":
      if (!valorLimpio) {
        return "El género es obligatorio.";
      }

      if (valorLimpio.length < 3) {
        return "El género debe tener al menos 3 caracteres.";
      }

      return "";

    case "duracion": {
      if (!valorLimpio) {
        return "La duración es obligatoria.";
      }

      const duracionNumero = Number(valor);

      if (
        !Number.isInteger(duracionNumero) ||
        duracionNumero <= 0
      ) {
        return "La duración debe ser un número entero mayor que cero.";
      }

      return "";
    }

    case "clasificacion":
      if (!valorLimpio) {
        return "La clasificación es obligatoria.";
      }

      return "";

    case "precio": {
      if (!valorLimpio) {
        return "El precio es obligatorio.";
      }

      const precioNumero = Number(valor);

      if (Number.isNaN(precioNumero) || precioNumero < 0) {
        return "El precio debe ser un número mayor o igual a cero.";
      }

      return "";
    }

    default:
      return "";
  }
}



export default function PeliculaForm({
  peliculaEditando,
  cancelarEdicion,
}: PeliculaFormProps) {
  const dispatch = useAppDispatch();

  const peliculas = useAppSelector(
    (state) => state.pelicula,
  );

  const [codigo, setCodigo] = useState(
    peliculaEditando?.codigo ?? "",
  );

  const [nombre, setNombre] = useState(
    peliculaEditando?.nombre ?? "",
  );

  const [genero, setGenero] = useState(
    peliculaEditando?.genero ?? "",
  );

  const [duracion, setDuracion] = useState(
    peliculaEditando
      ? String(peliculaEditando.duracion)
      : "",
  );

  const [clasificacion, setClasificacion] = useState(
    peliculaEditando?.clasificacion ?? "",
  );

  const [precio, setPrecio] = useState(
    peliculaEditando
      ? String(peliculaEditando.precio)
      : "",
  );

  const [disponible, setDisponible] = useState(
    peliculaEditando?.disponible ?? true,
  );

  const [errores, setErrores] =
    useState<ErroresFormulario>(erroresIniciales);



  const actualizarCampo = (
    campo: Campo,
    valor: string,
  ): void => {
    switch (campo) {
      case "codigo":
        setCodigo(valor);
        break;

      case "nombre":
        setNombre(valor);
        break;

      case "genero":
        setGenero(valor);
        break;

      case "duracion":
        setDuracion(valor);
        break;

      case "clasificacion":
        setClasificacion(valor);
        break;

      case "precio":
        setPrecio(valor);
        break;
    }

    const mensajeError = validarCampo(
      campo,
      valor,
      peliculas,
      peliculaEditando,
    );

    setErrores((erroresAnteriores) => ({
      ...erroresAnteriores,
      [campo]: mensajeError,
    }));
  };



  const limpiarFormulario = (): void => {
    setCodigo("");
    setNombre("");
    setGenero("");
    setDuracion("");
    setClasificacion("");
    setPrecio("");
    setDisponible(true);
    setErrores(erroresIniciales);
  };



  const validarFormularioCompleto =
    (): ErroresFormulario => ({
      codigo: validarCampo(
        "codigo",
        codigo,
        peliculas,
        peliculaEditando,
      ),

      nombre: validarCampo(
        "nombre",
        nombre,
        peliculas,
        peliculaEditando,
      ),

      genero: validarCampo(
        "genero",
        genero,
        peliculas,
        peliculaEditando,
      ),

      duracion: validarCampo(
        "duracion",
        duracion,
        peliculas,
        peliculaEditando,
      ),

      clasificacion: validarCampo(
        "clasificacion",
        clasificacion,
        peliculas,
        peliculaEditando,
      ),

      precio: validarCampo(
        "precio",
        precio,
        peliculas,
        peliculaEditando,
      ),
    });



  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    const nuevosErrores = validarFormularioCompleto();

    setErrores(nuevosErrores);

    const formularioValido = Object.values(
      nuevosErrores,
    ).every((error) => error === "");

    if (!formularioValido) {
      return;
    }

    const datosPelicula = {
      codigo: codigo.trim(),
      nombre: nombre.trim(),
      genero: genero.trim(),
      duracion: Number(duracion),
      clasificacion: clasificacion.trim(),
      precio: Number(precio),
      disponible,
    };

    if (peliculaEditando) {
      dispatch(
        updatePelicula({
          id: peliculaEditando.id,
          ...datosPelicula,
        }),
      );

      cancelarEdicion();
    } else {
      const nuevoId =
        peliculas.length > 0
          ? Math.max(
              ...peliculas.map(
                (pelicula) => pelicula.id,
              ),
            ) + 1
          : 1;

      dispatch(
        addPelicula({
          id: nuevoId,
          ...datosPelicula,
        }),
      );
    }

    limpiarFormulario();
  };

  return (
    <section>
      <h2>
        {peliculaEditando
          ? "Editar película"
          : "Agregar película"}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="codigo">Código</label>

          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(event) =>
              actualizarCampo(
                "codigo",
                event.target.value,
              )
            }
          />

          {errores.codigo && (
            <p className={styles.mensajeError}>
              ⚠ {errores.codigo}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="nombre">Nombre</label>

          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(event) =>
              actualizarCampo(
                "nombre",
                event.target.value,
              )
            }
          />

          {errores.nombre && (
            <p className={styles.mensajeError}>
              ⚠ {errores.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="genero">Género</label>

          <input
            id="genero"
            type="text"
            value={genero}
            onChange={(event) =>
              actualizarCampo(
                "genero",
                event.target.value,
              )
            }
          />

          {errores.genero && (
            <p className={styles.mensajeError}>
              ⚠ {errores.genero}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="duracion">
            Duración en minutos
          </label>

          <input
            id="duracion"
            type="number"
            min="1"
            step="1"
            value={duracion}
            onChange={(event) =>
              actualizarCampo(
                "duracion",
                event.target.value,
              )
            }
          />

          {errores.duracion && (
            <p className={styles.mensajeError}>
              ⚠ {errores.duracion}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="clasificacion">
            Clasificación
          </label>

          <input
            id="clasificacion"
            type="text"
            value={clasificacion}
            onChange={(event) =>
              actualizarCampo(
                "clasificacion",
                event.target.value,
              )
            }
          />

          {errores.clasificacion && (
            <p className={styles.mensajeError}>
              ⚠ {errores.clasificacion}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="precio">Precio</label>

          <input
            id="precio"
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(event) =>
              actualizarCampo(
                "precio",
                event.target.value,
              )
            }
          />

          {errores.precio && (
            <p className={styles.mensajeError}>
              ⚠ {errores.precio}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="disponible">Estado</label>

          <select
            id="disponible"
            value={disponible ? "true" : "false"}
            onChange={(event) =>
              setDisponible(
                event.target.value === "true",
              )
            }
          >
            <option value="true">
              Disponible
            </option>

            <option value="false">
              No disponible
            </option>
          </select>
        </div>

        <button type="submit">
          {peliculaEditando
            ? "Guardar cambios"
            : "Agregar película"}
        </button>

        {peliculaEditando && (
          <button
            type="button"
            onClick={() => {
              limpiarFormulario();
              cancelarEdicion();
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>
    </section>
  );
}