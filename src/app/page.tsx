"use client";

import { useState } from "react";
import "@/components/Peliculas.css";
import PeliculaForm from "@/components/PeliculaForm";
import PeliculaTable from "@/components/PeliculaTable";
import BuscadorPeliculas from "@/components/BuscadorPeliculas";
import type { Pelicula } from "@/types/Pelicula";

export default function Home() {
  const [peliculaEditando, setPeliculaEditando] =
    useState<Pelicula | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [generoSeleccionado, setGeneroSeleccionado] =
    useState("");
  const [soloDisponibles, setSoloDisponibles] =
    useState(false);

  return (
    <main className="peliculas-page">
      <h1>Gestión de películas</h1>

      <PeliculaForm
        key={peliculaEditando?.id ?? "nueva"}
        peliculaEditando={peliculaEditando}
        cancelarEdicion={() => setPeliculaEditando(null)}
      />

      <BuscadorPeliculas
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        generoSeleccionado={generoSeleccionado}
        setGeneroSeleccionado={setGeneroSeleccionado}
        soloDisponibles={soloDisponibles}
        onCambiarSoloDisponibles={(valor) =>
          setSoloDisponibles(valor)
        }
      />

      <PeliculaTable
        seleccionarPelicula={setPeliculaEditando}
        busqueda={busqueda}
        generoSeleccionado={generoSeleccionado}
        soloDisponibles={soloDisponibles}
      />
    </main>
  );
}