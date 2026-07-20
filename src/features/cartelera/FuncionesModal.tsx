"use client"

import { Pelicula } from "@/types/Pelicula";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Funcion } from "@/types/Funcion";
import ReservaModal from "@/features/cartelera/ReservaModal";
import styles from "@/features/cartelera/cartelera.module.css";
import { X } from "lucide-react"


interface FuncionesModalProps { pelicula: Pelicula; onClose: () => void; }

export default function FuncionesModal({ pelicula, onClose }: FuncionesModalProps) {

    const funciones = useAppSelector(state => state.funcion);
    const salas = useAppSelector(state => state.sala);
    const funcionesPelicula = funciones.filter(funcion => funcion.peliculaId === pelicula.id);
    const [funcionSeleccionada, setFuncionSeleccionada] = useState<Funcion | null>(null);

    return (
        <>
        {!funcionSeleccionada && (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h2 className={styles.modalTitle}>Reservar boletos</h2>
                        <button className={styles.closeButton} onClick={onClose} ><X /></button>
                    </div>

                    <div className={styles.peliculaInfo}>
                        <h2 className={styles.carteleraTitle}>{pelicula.nombre}</h2>

                        <div className={styles.carteleraEtiquetas}>
                            <span className={`${styles.carteleraText} ${styles.etiquetaGenero}`}>
                                {pelicula.genero}
                            </span>
                            <span className={`${styles.carteleraText} ${styles.etiquetaClasificacion}`}>
                                {pelicula.clasificacion}
                            </span>
                            <span className={`${styles.carteleraText} ${styles.etiquetaDuracion}`}>
                                {pelicula.duracion} min
                            </span>
                            <span className={styles.carteleraText}>
                                ${pelicula.precio.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className={styles.funcionesContainer}>
                        <h3 className={styles.sectionTitle}> Funciones disponibles </h3>

                        {funcionesPelicula.length > 0 ? (
                            funcionesPelicula.map(funcion => {
                                const sala = salas.find(sala => sala.id === funcion.salaId);
                                return (

                                    <div key={funcion.id} className={`${styles.carteleraCard} ${styles.funcionCard}`}>

                                        <div className={styles.funcionInfo}>
                                            <p><strong>Sala:</strong> {sala?.nombre}</p>
                                            <p><strong>Fecha:</strong> {funcion.fecha}</p>
                                            <p><strong>Hora:</strong> {funcion.horaInicio}</p>
                                        </div>
                                        <button className={styles.reservarButton} onClick={() => setFuncionSeleccionada(funcion)} >Reservar</button>
                                    </div>
                                );
                            })
                        ) : (
                            <p className={styles.erorMsg}>No hay funciones disponibles para esta película.</p>
                        )}
                    </div>
                </div>
            </div>
            )}

            {funcionSeleccionada && (
                <ReservaModal
                    funcion={funcionSeleccionada}
                    pelicula={pelicula}
                    onClose={() => setFuncionSeleccionada(null)}
                />
            )}
        </>
    );
}