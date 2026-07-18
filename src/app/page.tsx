"use client";

import { useState } from "react";
<<<<<<< HEAD
import "@/components/Peliculas.css";
import PeliculaForm from "@/components/PeliculaForm";
import PeliculaTable from "@/components/PeliculaTable";
import BuscadorPeliculas from "@/components/BuscadorPeliculas";
=======
import PeliculaForm from "@/Components/PeliculaForm";
import PeliculaTable from "@/Components/PeliculaTable";
import BuscadorPeliculas from "@/Components/BuscadorPeliculas";
>>>>>>> cc276c0 (feat: agregar busqueda, filtros y disenios del modulo de peliculas)
import type { Pelicula } from "@/types/Pelicula";

export default function Home() {
  const [peliculaEditando, setPeliculaEditando] =
    useState<Pelicula | null>(null);

  const [busqueda, setBusqueda] = useState("");
<<<<<<< HEAD
  const [generoSeleccionado, setGeneroSeleccionado] =
    useState("");
  const [soloDisponibles, setSoloDisponibles] =
    useState(false);

=======
  const [generoSeleccionado, setGeneroSeleccionado] =useState("");
  const [soloDisponibles, setSoloDisponibles] = useState(false);
>>>>>>> cc276c0 (feat: agregar busqueda, filtros y disenios del modulo de peliculas)
  return (
    <main className="peliculas-page">
      <h1>Gestión de películas</h1>

<<<<<<< HEAD
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
=======
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
>>>>>>> cc276c0 (feat: agregar busqueda, filtros y disenios del modulo de peliculas)
    </main>
  );
}