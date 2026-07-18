"use client";

interface BuscadorPeliculasProps {
  busqueda: string;
  setBusqueda: (valor: string) => void;
  generoSeleccionado: string;
  setGeneroSeleccionado: (valor: string) => void;
  soloDisponibles: boolean;
  onCambiarSoloDisponibles: (valor: boolean) => void;
}

export default function BuscadorPeliculas({
  busqueda,
  setBusqueda,
  generoSeleccionado,
  setGeneroSeleccionado,
  soloDisponibles,
  onCambiarSoloDisponibles,
}: BuscadorPeliculasProps) {
  return (
    <section>
      <h2>Buscar y filtrar películas</h2>

      <div>
        <label htmlFor="busqueda">Buscar por nombre</label>

        <input
          id="busqueda"
          type="text"
          placeholder="Ejemplo: Superman"
          value={busqueda}
          onChange={(event) =>
            setBusqueda(event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="genero">
          Filtrar por género
        </label>

        <select
          id="genero"
          value={generoSeleccionado}
          onChange={(event) =>
            setGeneroSeleccionado(event.target.value)
          }
        >
          <option value="">Todos los géneros</option>
          <option value="Acción">Acción</option>
          <option value="Animación">Animación</option>
          <option value="Aventura">Aventura</option>
          <option value="Ciencia Ficción">
            Ciencia Ficción
          </option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={soloDisponibles}
            onChange={(event) =>
              onCambiarSoloDisponibles(
                event.target.checked
              )
            }
          />

          Mostrar solo disponibles
        </label>
      </div>
    </section>
  );
}