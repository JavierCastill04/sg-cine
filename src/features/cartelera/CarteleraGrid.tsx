"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import styles from "@/features/cartelera/cartelera.module.css"

export default function CarteleraGrid() {
    const peliculas = useAppSelector(state => state.pelicula);

    return (
        <div className={styles.productGrid}>
            {peliculas.map((pelicula) => (
                <div key={pelicula.id} className={styles.productCard}>
                    <div className={styles.productInfo}>
                        <h3 className={styles.productTitle}>{pelicula.nombre}</h3>
                        <p className={styles.etiquetaTitle}>Etiquetas:</p>
                        <div className={styles.carteleraEtiquetas}>
                            <p className={`${styles.productText} ${styles.etiquetaClasificacion}`}>{pelicula.clasificacion}</p>
                            <p className={`${styles.productText} ${styles.etiquetaGenero}`}>{pelicula.genero}</p>
                            <p className={`${styles.productText} ${styles.etiquetaDuracion}`}>{pelicula.duracion} minutos</p>
                        </div>
                        <button className={styles.addButton}>
                            Hacer reserva
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}