"use client";
import styles from "@/features/salas/salas.module.css"
import SalaGrid from "@/features/salas/SalaGrid"
export default function ProductGrid() {
    return (
        <div className={styles.salasCard}>
            <h1 className={styles.titleCard}>Salas registradas</h1>
            <SalaGrid/>
        </div>
    );
}