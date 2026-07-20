"use client"

import { useState } from "react";
import { Funcion } from "@/types/Funcion"
import FuncionGrid from "@/features/funciones/FuncionGrid"

export default function Home() {

  const [funcionEditando, setFuncionEditando] = useState<Funcion | null>(null);
  return (
    <main className="home-container">
      <FuncionGrid editarFuncion={setFuncionEditando}/>
    </main>
  );
}