"use client";

import type { Pelicula } from "@/types/Pelicula";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removePelicula } from "@/redux/slices/peliculaSlice";

interface PeliculaTableProps {
  seleccionarPelicula: (pelicula: Pelicula) => void;
  busqueda: string;
  generoSeleccionado: string;
  soloDisponibles: boolean;
}

export default function PeliculaTable({
  seleccionarPelicula,
  busqueda,
  generoSeleccionado,
  soloDisponibles,
}: PeliculaTableProps) {
  const dispatch = useAppDispatch();

  const peliculas = useAppSelector(
    (state) => state.pelicula
  );

  const peliculasFiltradas = peliculas.filter(
    (pelicula) => {
      const coincideNombre = pelicula.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideGenero =
        generoSeleccionado === "" ||
        pelicula.genero === generoSeleccionado;

      const coincideDisponibilidad =
        !soloDisponibles || pelicula.disponible;

      return (
        coincideNombre &&
        coincideGenero &&
        coincideDisponibilidad
      );
    }
  );

  const eliminarPelicula = (id: number) => {
    dispatch(removePelicula(id));
  };

  return (
    <section>
      <h2>Películas registradas</h2>

      {peliculasFiltradas.length === 0 ? (
        <p>No se encontraron películas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Duración</th>
              <th>Clasificación</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {peliculasFiltradas.map((pelicula) => (
              <tr key={pelicula.id}>
                <td>{pelicula.codigo}</td>
                <td>{pelicula.nombre}</td>
                <td>{pelicula.genero}</td>
                <td>{pelicula.duracion} minutos</td>
                <td>{pelicula.clasificacion}</td>
                <td>${pelicula.precio.toFixed(2)}</td>

                <td>
                  {pelicula.disponible
                    ? "Disponible"
                    : "No disponible"}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() =>
                      seleccionarPelicula(pelicula)
                    }
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      eliminarPelicula(pelicula.id)
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}