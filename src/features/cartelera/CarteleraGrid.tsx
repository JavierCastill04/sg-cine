"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import styles from "@/features/cartelera/cartelera.module.css"

export default function CarteleraGrid() {
    const peliculas = useAppSelector(state => state.pelicula);

    return (
        <div className={styles.carteleraGrid}>
            {peliculas.map((pelicula) => (
                <div key={pelicula.id} className={styles.carteleraCard}>
                    <div className={styles.carteleraInfo}>
                        <h3 className={styles.carteleraTitle}>{pelicula.nombre}</h3>
                        <p className={styles.carteleraTitle}>Etiquetas:</p>
                        <div className={styles.carteleraEtiquetas}>
                            <p className={`${styles.carteleraText} ${styles.etiquetaClasificacion}`}>{pelicula.clasificacion}</p>
                            <p className={`${styles.carteleraText} ${styles.etiquetaGenero}`}>{pelicula.genero}</p>
                            <p className={`${styles.carteleraText} ${styles.etiquetaDuracion}`}>{pelicula.duracion} minutos</p>
                        </div>

                    </div>
                    <button className={styles.addButton}>
                        Hacer reserva
                    </button>
                </div>
            ))}
        </div>
    );
}