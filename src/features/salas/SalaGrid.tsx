"use client";

import { removeSala } from "@/redux/slices/salaSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Pencil, Trash2 } from "lucide-react";
import { Sala } from "@/types/Sala";

import styles from "@/features/salas/salas.module.css"

interface Props {
    editarSala: (sala: Sala) => void;
}

export default function SalaGrid({ editarSala }: Props) {
    const dispatch = useAppDispatch();
    const salas = useAppSelector((state) => state.sala);
    const funciones = useAppSelector((state) => state.funcion);

    const eliminarSala = (id: number) => {
        const usada = funciones.some(funcion => funcion.salaId === id);

        if (usada) {
            console.log(
                "No se puede eliminar una sala con funciones creadas"
            );
            return;
        }
        dispatch(removeSala(id));
    };

    return (
        <div className={styles.salasCard}>
            <h1 className={styles.titleCard}>Gestión de salas</h1>
            <div className="tableContainer">
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
                        {salas.map((sala) => (
                            <tr key={sala.id}>
                                <td>{sala.id}</td>
                                <td>{sala.nombre}</td>
                                <td>{sala.capacidad.filas}</td>
                                <td>{sala.capacidad.columnas}</td>
                                <td>{sala.capacidad.filas * sala.capacidad.columnas}</td>
                                <td className={styles.actions}>
                                    <button className={`${styles.iconButton} ${styles.actualizar}`} onClick={() => editarSala(sala)} ><Pencil /></button>
                                    <button className={`${styles.iconButton} ${styles.eliminar}`} onClick={() => eliminarSala(sala.id)}><Trash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}