"use client";
import { useState, useEffect, use } from "react";
import { TriangleAlert } from "lucide-react";
import styles from "@/features/funciones/funciones.module.css";
import { Funcion } from "@/types/Funcion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addFuncion, updateFuncion } from "@/redux/slices/funcionSlice";
import { Campo, FormData, FormErrors, validarCampo } from "@/features/funciones/validarFuncion"
import { EstadoAsiento } from "@/types/EstadoAsiento";

const initialData: FormData = { peliculaId: "", salaId: "", horaInicio: "", fecha: "" };
const initialErrors: FormErrors = { peliculaId: "", salaId: "", horaInicio: "", fecha: "" };

interface FuncionFormProps {
    funcionEditando: Funcion | null;
    cancelarEdicion: () => void;
}

export default function RegisterForm({ funcionEditando, cancelarEdicion }: FuncionFormProps) {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<FormData>(initialData);
    const [errores, setErrores] = useState<FormErrors>(initialErrors);
    const funciones = useAppSelector(state => state.funcion);
    const peliculas = useAppSelector(state => state.pelicula);
    const salas = useAppSelector(state => state.sala);
    const peliculaSeleccionada = peliculas.find(pelicula => pelicula.id === Number(formData.peliculaId));

    useEffect(() => {
        if (funcionEditando) {
            setFormData({
                peliculaId: String(funcionEditando.peliculaId),
                salaId: String(funcionEditando.salaId),
                horaInicio: funcionEditando.horaInicio.toString(),
                fecha: funcionEditando.fecha
            });
        } else {
            setFormData(initialData);
            setErrores(initialErrors);
        }
    }, [funcionEditando]);

    const handleChange = (campo: Campo, valor: string): void => {
        const nuevoFormData: FormData = { ...formData, [campo]: valor };
        setFormData(nuevoFormData);
        setErrores(prev => ({ ...prev, [campo]: validarCampo(campo, valor, nuevoFormData, funciones, peliculas, funcionEditando) }));
    };

    const handleSubmit = () => {

        const sala = salas.find(sala => sala.id === Number(formData.salaId));
        const pelicula = peliculas.find(pelicula => pelicula.id === Number(formData.peliculaId))
        if (!pelicula) return;
        if (!sala) return;

        const nuevosErrores: FormErrors = {
            peliculaId: validarCampo("peliculaId", formData.peliculaId, formData, funciones, peliculas, funcionEditando),
            salaId: validarCampo("salaId", formData.salaId, formData, funciones, peliculas, funcionEditando),
            fecha: validarCampo("fecha", formData.fecha, formData, funciones, peliculas, funcionEditando),
            horaInicio: validarCampo("horaInicio", formData.horaInicio, formData, funciones, peliculas, funcionEditando),
        };

        setErrores(nuevosErrores);

        if (!Object.values(nuevosErrores).every(error => error === "")) {
            return;
        }

        if (!Object.values(nuevosErrores).every(e => e === "")) return;

        const estadoAsientos: EstadoAsiento[] = sala.asientos.map((asiento): EstadoAsiento => ({ asientoId: asiento.id, estado: "disponible" }));
        console.log(funciones);
        if (funcionEditando) {
            dispatch(
                updateFuncion({
                    id: funcionEditando.id,
                    peliculaId: Number(formData.peliculaId),
                    salaId: Number(formData.salaId),
                    fecha: formData.fecha,
                    horaInicio: formData.horaInicio,
                    precio: funcionEditando.precio,
                    estadoAsientos: funcionEditando.estadoAsientos
                }));
            cancelarEdicion();

        } else {

            dispatch(
                addFuncion({
                    peliculaId: Number(formData.peliculaId),
                    salaId: Number(formData.salaId),
                    fecha: formData.fecha,
                    horaInicio: formData.horaInicio,
                    precio: pelicula.precio,
                    estadoAsientos
                }));
        }
    };

    const obtenerEstado = (campo: Campo) => {
        if (errores[campo]) return styles.inputError;
        if (formData[campo]) return styles.inputSuccess;
        return "";
    };

    return (
        <div className={styles.funcionesCard}>
            <div className={styles.salasCard}>
                <h2 className={styles.titleCard}>
                    {funcionEditando ? "Editar funcion" : "Crear funcion"}
                </h2>

                <div className={styles.formCampo}>
                    <label className={styles.formLabel}>Película:</label>
                    <select
                        className={`${styles.formSelect} ${obtenerEstado("peliculaId")}`}
                        value={formData.peliculaId}
                        onChange={(e) => handleChange("peliculaId", e.target.value)}
                    >
                        <option value="">Seleccione una película</option>

                        {peliculas.map((pelicula) => (
                            <option key={pelicula.id} value={pelicula.id}>
                                {pelicula.nombre}
                            </option>
                        ))}
                    </select>

                    {errores.peliculaId && (
                        <p className={styles.error}><TriangleAlert size={14} />
                            {errores.peliculaId}
                        </p>
                    )}
                </div>
                <div className={styles.formCampo}>
                    <label className={styles.formLabel}>Sala:</label>
                    <select
                        className={`${styles.formSelect} ${obtenerEstado("salaId")}`}
                        value={formData.salaId}
                        onChange={(e) => handleChange("salaId", e.target.value)}
                    >
                        <option value="">Seleccione una sala</option>
                        {salas.map((sala) => (
                            <option key={sala.id} value={sala.id}>
                                {sala.nombre}
                            </option>
                        ))}
                    </select>
                    {errores.salaId && (
                        <p className={styles.error}><TriangleAlert size={14} />
                            {errores.salaId}
                        </p>
                    )}
                </div>
                <div className={styles.formCampo}>
                    <label className={styles.formLabel}>Fecha:</label>
                    <input
                        type="date"
                        className={`${styles.formInput} ${obtenerEstado("fecha")}`}
                        value={formData.fecha}
                        onChange={(e) => handleChange("fecha", e.target.value)}
                    />
                    {errores.fecha && (
                        <p className={styles.error}><TriangleAlert size={14} />
                            {errores.fecha}
                        </p>
                    )}
                </div>
                <div className={styles.formCampo}>
                    <label className={styles.formLabel}>Hora:</label>
                    <input
                        type="time"
                        className={`${styles.formInput} ${obtenerEstado("horaInicio")}`}
                        value={formData.horaInicio}
                        onChange={(e) => handleChange("horaInicio", e.target.value)}
                    />
                    {errores.horaInicio && (
                        <p className={styles.error}><TriangleAlert size={14} />
                            {errores.horaInicio}
                        </p>
                    )}
                </div>
                {peliculaSeleccionada && (
                    <div className={styles.infoPelicula}>
                        <h4>Información de la película</h4>
                        <p><strong>Duración:</strong> {peliculaSeleccionada.duracion} min</p>
                        <p><strong>Precio:</strong> ${peliculaSeleccionada.precio}</p>
                    </div>
                )}
                <button className={styles.btnFormulario} onClick={handleSubmit}>
                    {funcionEditando ? "Guardar cambios" : "Crear funcion"}
                </button>
            </div >
        </div>
    );
}

