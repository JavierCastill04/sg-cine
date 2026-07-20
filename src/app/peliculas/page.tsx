"use client";

import { useState } from "react";
import styles from "@/features/peliculas/Peliculas.module.css";
import PeliculaForm from "@/features/peliculas/PeliculaForm";
import PeliculaTable from "@/features/peliculas/PeliculaTable";
import BuscadorPeliculas from "@/features/peliculas/BuscadorPeliculas";
import type { Pelicula } from "@/types/Pelicula";

export default function PeliculasPage() {
  const [peliculaEditando, setPeliculaEditando] =
    useState<Pelicula | null>(null);

  const [busqueda, setBusqueda] = useState("");

  const [generoSeleccionado, setGeneroSeleccionado] =
    useState("");

  const [soloDisponibles, setSoloDisponibles] =
    useState(false);

  return (
    <main className={styles.peliculasPage}>
      <h1>Gestión de películas</h1>

      <BuscadorPeliculas
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        generoSeleccionado={generoSeleccionado}
        setGeneroSeleccionado={setGeneroSeleccionado}
        soloDisponibles={soloDisponibles}
        onCambiarSoloDisponibles={(valor: boolean) =>
          setSoloDisponibles(valor)
        }
      />

      <PeliculaTable
        seleccionarPelicula={setPeliculaEditando}
        busqueda={busqueda}
        generoSeleccionado={generoSeleccionado}
        soloDisponibles={soloDisponibles}
      />

      <PeliculaForm
        key={peliculaEditando?.id ?? "nueva"}
        peliculaEditando={peliculaEditando}
        cancelarEdicion={() =>
          setPeliculaEditando(null)
        }
      />
    </main>
  );
}