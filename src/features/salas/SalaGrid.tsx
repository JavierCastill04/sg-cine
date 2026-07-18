"use client";

import { salasData } from "@/data/salasData";
import { useAppDispatch } from "@/redux/hooks";
import { SquarePen, SquareX} from "lucide-react";

import styles from "@/features/salas/salas.module.css"

export default function ProductGrid() {
    const dispatch = useAppDispatch();

    return (
        <table className={styles.salasTable}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Filas</th>
                    <th>Columnas</th>
                    <th>Capacidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {salasData.map((sala) => (
                    <tr key={sala.id}>
                        <td>{sala.id}</td>
                        <td>{sala.nombre}</td>
                        <td>{sala.capacidad.filas}</td>
                        <td>{sala.capacidad.columnas}</td>
                        <td>{sala.capacidad.filas * sala.capacidad.columnas}</td>
                        <td className={styles.actions}>
                            <button className={styles.iconButton}><SquarePen/></button>
                            <button className={styles.iconButton}><SquareX/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}