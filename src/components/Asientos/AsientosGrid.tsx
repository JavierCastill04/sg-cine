import { Armchair } from "lucide-react";
import styles from "@/components/Asientos/asientosGrid.module.css";

interface SeatGridProps {
    filas: number;
    columnas: number;
}

export default function AsientosGrid({
    filas,
    columnas
}: SeatGridProps) {

    const asientos = Array.from(
        { length: filas * columnas }
    );
    const obtenerLetraFila = (index: number): string => {
        let letra = "";
        let n = index + 1;

        while (n > 0) {
            let resto = (n - 1) % 26;
            letra = String.fromCharCode(65 + resto) + letra;
            n = Math.floor((n - resto) / 26);
        }
        return letra;
    };

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