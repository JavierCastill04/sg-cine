import { Armchair } from "lucide-react";
import styles from "@/components/Asientos/asientosGrid.module.css";
import { obtenerLetraFila } from "@/components/Asientos/asientosUtils";
import { EstadoAsiento } from "@/types/EstadoAsiento";

interface SeatGridProps {
    filas: number;
    columnas: number;
    salaId?: number;
    estadoAsientos?: EstadoAsiento[];
    seleccionados?: string[];
    onSeleccionar?: (asiento: string) => void;
}

export default function AsientosGrid({
    filas,
    columnas,
    salaId,
    estadoAsientos = [],
    seleccionados = [],
    onSeleccionar
}: SeatGridProps) {

    const manejarClick = (asientoId: string) => {
        if (onSeleccionar) {
            onSeleccionar(asientoId);
        }
    };
    return (
        <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columnas}, 1fr)` }}>
            {
                Array.from({ length: filas }).map((_, fila) => (
                    Array.from({ length: columnas }).map((_, columna) => {

                        const asientoId = `${salaId ?? ""}-${obtenerLetraFila(fila)}-${columna + 1}`;
                        const estado = estadoAsientos.find(asiento => asiento.asientoId === asientoId);
                        const seleccionado = seleccionados.includes(asientoId);

                        return (
                            <div key={asientoId} className={`${styles.asiento}
                                    ${estado?.estado === "reservado" ? styles.reservado : ""}
                                    ${seleccionado ? styles.seleccionado : ""}
                                `}
                                onClick={() => manejarClick(asientoId)}
                            >
                                <Armchair size={24} />
                                <span>
                                    {obtenerLetraFila(fila)}
                                    {columna + 1}
                                </span>

                            </div>
                        );

                    })

                ))
            }
        </div>
    );
}