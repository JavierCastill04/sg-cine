"use client"

import type { Funcion } from "@/types/Funcion";
import type { Pelicula } from "@/types/Pelicula";
import type { Venta } from "@/types/Venta";
import { addVenta } from "@/redux/slices/ventaSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { X } from "lucide-react";

import AsientosGrid from "@/components/Asientos/AsientosGrid";
import styles from "@/features/cartelera/cartelera.module.css";

interface ReservaModalProps { funcion: Funcion; pelicula: Pelicula; onClose: () => void; }

export default function ReservaModal({ funcion, pelicula, onClose }: ReservaModalProps) {

    const salas = useAppSelector(state => state.sala);
    const sala = salas.find(sala => sala.id === funcion.salaId);
    const [asientosSeleccionados, setAsientosSeleccionados] = useState<string[]>([]);

    const [cliente, setCliente] = useState({ nombre: "", correo: "", telefono: "" });
    const dispatch = useAppDispatch();
    const total = pelicula.precio * asientosSeleccionados.length;

    const seleccionarAsiento = (asiento: string) => {
        if (asientosSeleccionados.includes(asiento)) {
            setAsientosSeleccionados(
                asientosSeleccionados.filter(a => a !== asiento)
            );
        } else {
            setAsientosSeleccionados([
                ...asientosSeleccionados,
                asiento
            ]);

        }

    };

    const confirmarReserva = () => {

        if (asientosSeleccionados.length === 0) {
            console.log("Selecciona al menos un asiento");
            return;
        }

        const nuevaVenta: Venta = {
            id: 0,
            funcionId: funcion.id,
            cliente,
            asientos: asientosSeleccionados,
            cantidadBoletos: asientosSeleccionados.length,
            total,
            fechaVenta: new Date().toISOString()
        };

        dispatch(addVenta(nuevaVenta));
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.reservaModal}>
                <div className={styles.header}>
                    <h2 className={styles.modalTitle}>
                        Reservar boletos
                    </h2>
                    <button className={styles.closeButton} onClick={onClose}> <X /></button>
                </div>
                <div className={styles.reservaContenido}>
                    <div className={styles.peliculaInfo}>
                        <h2 className={styles.carteleraTitle}>
                            {pelicula.nombre}
                        </h2>
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

                        <p>Sala: {sala?.nombre}</p>
                        <p>Fecha: {funcion.fecha}</p>
                        <p>Hora: {funcion.horaInicio}</p>

                    </div>
                    <div className={styles.clienteForm}>
                        <input placeholder="Nombre del cliente" value={cliente.nombre} onChange={(e) =>
                            setCliente({ ...cliente, nombre: e.target.value })
                        }
                        />
                        <input placeholder="Correo" value={cliente.correo} onChange={(e) =>
                            setCliente({
                                ...cliente,
                                correo: e.target.value
                            })
                        }
                        />
                        <input placeholder="Teléfono" value={cliente.telefono} onChange={(e) =>
                            setCliente({
                                ...cliente,
                                telefono: e.target.value
                            })
                        }
                        />
                    </div>
                    {sala && (
                        <div className={styles.asientosContainer}>
                            <AsientosGrid
                                filas={sala.capacidad.filas}
                                columnas={sala.capacidad.columnas}
                                salaId={sala.id}
                                seleccionados={asientosSeleccionados}
                                onSeleccionar={seleccionarAsiento}
                            />
                        </div>
                    )}

                    <div className={styles.peliculaInfo}>
                        <p>Boletos:  {" "} {asientosSeleccionados.length}</p>
                        <p>Total: {" "}${total.toFixed(2)}</p>
                    </div>
                </div>

                <div className={styles.reservaActions}>
                    <button className={styles.closeButton} onClick={onClose}> Cancelar </button>
                    <button className={styles.reservarButton} onClick={confirmarReserva}> Confirmar reserva </button>
                </div>
            </div>
        </div>
    );
}