import { Armchair } from "lucide-react";
import styles from "@/components/Asientos/asientosGrid.module.css";
import { obtenerLetraFila } from "@/components/Asientos/asientosUtils";

interface SeatGridProps {
    filas: number;
    columnas: number;
}

export default function AsientosGrid({
    filas,
    columnas
}: SeatGridProps) {

    return (
        <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}>
            {
                Array.from({ length: filas }).map((_, fila) => (
                    Array.from({ length: columnas }).map((_, columna) => (
                        <div key={`${fila}-${columna}`} className={styles.asiento}>
                            <Armchair size={24} />
                            <span>
                                {obtenerLetraFila(fila)}
                                {columna + 1}
                            </span>
                        </div>
                    ))
                ))
            }
        </div>
    );
}