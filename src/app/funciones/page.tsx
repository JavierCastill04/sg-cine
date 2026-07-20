"use client"

import { useState } from "react";
import { Funcion } from "@/types/Funcion"
import FuncionGrid from "@/features/funciones/FuncionGrid"
import FuncionForm from "@/features/funciones/FuncionForm"

export default function Home() {

  const [funcionEditando, setFuncionEditando] = useState<Funcion | null>(null);
  return (
    <main className="home-container">
      <FuncionGrid editarFuncion={setFuncionEditando}/>
      <FuncionForm funcionEditando={funcionEditando} cancelarEdicion={()=> setFuncionEditando(null)}/>
    </main>
  );
}