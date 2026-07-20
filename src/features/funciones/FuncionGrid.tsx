"use client";

import { removeFuncion } from "@/redux/slices/funcionSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Funcion } from "@/types/Funcion";

import styles from "@/features/funciones/funciones.module.css"

interface Props {
    editarFuncion: (funcion: Funcion) => void;
}

export default function FuncionGrid({ editarFuncion }: Props) {
    const dispatch = useAppDispatch();
    const funciones = useAppSelector((state) => state.funcion);
    const peliculas = useAppSelector(state => state.pelicula);
    const salas = useAppSelector(state => state.sala);

    return (
        <div className={styles.funcionesCard}>
            <h1 className={styles.titleCard}>Gestión de funciones</h1>
            <div className="tableContainer">
                <table className={styles.funcionesTable}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pelicula</th>
                            <th>Duracion</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Sala</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {funciones.map((funcion) => (
                            <tr key={funcion.id}>
                                <td>{funcion.id}</td>
                                <td>
                                    {peliculas.find(pelicula => pelicula.id === funcion.peliculaId)?.nombre}
                                </td>
                                <td>
                                    {peliculas.find(pelicula => pelicula.id === funcion.peliculaId)?.duracion} minutos
                                </td>
                                <td>{funcion.fecha}</td>
                                <td>{funcion.horaInicio}</td>
                                <td>
                                    {salas.find(sala => sala.id === funcion.salaId)?.nombre}
                                </td>
                                <td className={styles.actions}>
                                    <button className={`${styles.iconButton} ${styles.ver}`}><Eye /></button>
                                    <button className={`${styles.iconButton} ${styles.actualizar}`} onClick={() => editarFuncion(funcion)} ><Pencil /></button>
                                    <button className={`${styles.iconButton} ${styles.eliminar}`} onClick={() => dispatch(removeFuncion(funcion.id))}><Trash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}