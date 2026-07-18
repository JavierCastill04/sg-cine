"use client";

import { useState, type FormEvent } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addPelicula,
  updatePelicula,
} from "@/redux/slices/peliculaSlice";
import type { Pelicula } from "@/types/Pelicula";

interface PeliculaFormProps {
  peliculaEditando: Pelicula | null;
  cancelarEdicion: () => void;
}

export default function PeliculaForm({
  peliculaEditando,
  cancelarEdicion,
}: PeliculaFormProps) {
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) => state.pelicula);

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




const limpiarFormulario = () => {
  setCodigo("");
  setNombre("");
  setGenero("");
  setDuracion("");
  setClasificacion("");
  setPrecio("");
  setDisponible(true);
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (peliculaEditando) {
    dispatch(
      updatePelicula({
        id: peliculaEditando.id,
        codigo,
        nombre,
        genero,
        duracion: Number(duracion),
        clasificacion,
        precio: Number(precio),
        disponible,
      }),
    );

    cancelarEdicion();
  } else {
    const nuevoId =
      peliculas.length > 0
        ? Math.max(
            ...peliculas.map((pelicula) => pelicula.id),
          ) + 1
        : 1;

    dispatch(
      addPelicula({
        id: nuevoId,
        codigo,
        nombre,
        genero,
        duracion: Number(duracion),
        clasificacion,
        precio: Number(precio),
        disponible,
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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codigo">Código</label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="genero">Género</label>
          <input
            id="genero"
            type="text"
            value={genero}
            onChange={(event) => setGenero(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="duracion">Duración en minutos</label>
          <input
            id="duracion"
            type="number"
            min="1"
            value={duracion}
            onChange={(event) => setDuracion(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="clasificacion">Clasificación</label>
          <input
            id="clasificacion"
            type="text"
            value={clasificacion}
            onChange={(event) => setClasificacion(event.target.value)}
            required
          />
        </div>



        <div>
          <label htmlFor="precio">Precio</label>
          <input
            id="precio"
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="disponible">Estado</label>
          <select
            id="disponible"
            value={disponible ? "true" : "false"}
            onChange={(event) =>
              setDisponible(event.target.value === "true")
            }
          >
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
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