"use client"

import { useState } from "react";
import SalaGrid from "@/features/salas/SalaGrid";
import SalaForm from "@/features/salas/SalaForm";
import { Sala } from "@/types/Sala";

export default function Home() {

  const [salaEditando, setSalaEditando] = useState<Sala | null>(null);

  return (
    <main className="home-container">
      <SalaGrid editarSala={setSalaEditando}/>
      <SalaForm salaEditando={salaEditando} cancelarEdicion={()=> setSalaEditando(null)}/>
    </main>
  );
}