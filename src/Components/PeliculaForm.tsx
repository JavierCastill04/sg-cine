"use client";

import { useState } from "react";
import styles from "@/components/Peliculas.module.css";

import CampoFormulario from "@/components/CampoFormulario";
import SelectFormulario from "@/components/SelectFormulario";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addPelicula,
  updatePelicula,
} from "@/redux/slices/peliculaSlice";

import type { Pelicula } from "@/types/Pelicula";

import {
  erroresIniciales,
  validarCampo,
  type CampoPelicula,
  type ErroresPelicula,
} from "@/components/validacionesPelicula";

import {
  GENEROS,
  CLASIFICACIONES,
} from "@/components/peliculaOptions";

interface PeliculaFormProps {
  peliculaEditando: Pelicula | null;
  cancelarEdicion: () => void;
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
    useState<ErroresPelicula>({
      ...erroresIniciales,
    });

  const obtenerValoresFormulario =
    (): Record<CampoPelicula, string> => ({
      codigo,
      nombre,
      genero,
      duracion,
      clasificacion,
      precio,
    });

  const obtenerErrorCampo = (
    campo: CampoPelicula,
    valor: string,
  ): string =>
    validarCampo({
      campo,
      valor,
      peliculas,
      peliculaEditando,
    });

  const actualizarCampo = (
    campo: CampoPelicula,
    valor: string,
  ): void => {
    const setters: Record<
      CampoPelicula,
      React.Dispatch<React.SetStateAction<string>>
    > = {
      codigo: setCodigo,
      nombre: setNombre,
      genero: setGenero,
      duracion: setDuracion,
      clasificacion: setClasificacion,
      precio: setPrecio,
    };

    setters[campo](valor);

    setErrores((erroresAnteriores) => ({
      ...erroresAnteriores,
      [campo]: obtenerErrorCampo(campo, valor),
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
    setErrores({ ...erroresIniciales });
  };

  const validarFormularioCompleto =
    (): ErroresPelicula => {
      const valores = obtenerValoresFormulario();

      return (
        Object.keys(valores) as CampoPelicula[]
      ).reduce<ErroresPelicula>(
        (nuevosErrores, campo) => ({
          ...nuevosErrores,
          [campo]: obtenerErrorCampo(
            campo,
            valores[campo],
          ),
        }),
        { ...erroresIniciales },
      );
    };

  const guardarPelicula = (): void => {
    const nuevosErrores =
      validarFormularioCompleto();

    setErrores(nuevosErrores);

    const formularioValido = Object.values(
      nuevosErrores,
    ).every((error) => error === "");

    if (!formularioValido) {
      return;
    }

    const datosPelicula = {
      codigo: codigo.trim().toUpperCase(),
      nombre: nombre.trim(),
      genero,
      duracion: Number(duracion),
      clasificacion,
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
        peliculas.length === 0
          ? 1
          : Math.max(
              ...peliculas.map(
                (pelicula) => pelicula.id,
              ),
            ) + 1;

      dispatch(
        addPelicula({
          id: nuevoId,
          ...datosPelicula,
        }),
      );
    }

    limpiarFormulario();
  };

  const cancelarFormulario = (): void => {
    limpiarFormulario();
    cancelarEdicion();
  };

  return (
    <section>
      <h2>
        {peliculaEditando
          ? "Editar película"
          : "Agregar película"}
      </h2>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          guardarPelicula();
        }}
      >
        <CampoFormulario
          id="codigo"
          label="Código"
          value={codigo}
          error={errores.codigo}
          errorClassName={styles.mensajeError}
          placeholder="PEL-001"
          maxLength={7}
          onChange={(valor) =>
            actualizarCampo(
              "codigo",
              valor.toUpperCase(),
            )
          }
        />

        <CampoFormulario
          id="nombre"
          label="Nombre"
          value={nombre}
          error={errores.nombre}
          errorClassName={styles.mensajeError}
          onChange={(valor) =>
            actualizarCampo("nombre", valor)
          }
        />

        <SelectFormulario
          id="genero"
          label="Género"
          value={genero}
          options={GENEROS}
          placeholder="Seleccione un género"
          error={errores.genero}
          errorClassName={styles.mensajeError}
          onChange={(valor) =>
            actualizarCampo("genero", valor)
          }
        />

        <CampoFormulario
          id="duracion"
          label="Duración en minutos"
          type="number"
          value={duracion}
          error={errores.duracion}
          errorClassName={styles.mensajeError}
          min={1}
          max={600}
          step={1}
          onChange={(valor) =>
            actualizarCampo("duracion", valor)
          }
        />

        <SelectFormulario
          id="clasificacion"
          label="Clasificación"
          value={clasificacion}
          options={CLASIFICACIONES}
          placeholder="Seleccione una clasificación"
          error={errores.clasificacion}
          errorClassName={styles.mensajeError}
          onChange={(valor) =>
            actualizarCampo(
              "clasificacion",
              valor,
            )
          }
        />

        <CampoFormulario
          id="precio"
          label="Precio"
          type="number"
          value={precio}
          error={errores.precio}
          errorClassName={styles.mensajeError}
          min={0}
          step="0.01"
          onChange={(valor) =>
            actualizarCampo("precio", valor)
          }
        />

        <div>
          <label htmlFor="disponible">
            Estado
          </label>

          <select
            id="disponible"
            value={
              disponible ? "true" : "false"
            }
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
            onClick={cancelarFormulario}
          >
            Cancelar edición
          </button>
        )}
      </form>
    </section>
  );
}