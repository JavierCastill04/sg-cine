"use client";
import { useState, useEffect, use } from "react";
import { TriangleAlert } from "lucide-react";
import styles from "@/features/salas/salas.module.css";
import { Sala } from "@/types/Sala";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addSala, updateSala } from "@/redux/slices/salaSlice";
import { Campo, FormData, FormErrors, validarCampo } from "@/features/salas/validarSala";

const initialData: FormData = { nombre: "", filas: "", columnas: "" };
const initialErrors: FormErrors = { nombre: "", filas: "", columnas: "" };

interface SalaFormProps {
    salaEditando: Sala | null;
    cancelarEdicion: () => void;
}

export default function RegisterForm({ salaEditando, cancelarEdicion }: SalaFormProps) {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<FormData>(initialData);
    const [errores, setErrores] = useState<FormErrors>(initialErrors);
    const [exito, setExito] = useState<boolean>(false);
    const salas = useAppSelector(state => state.sala);
    useEffect(() => {
        if (salaEditando) {
            setFormData({
                nombre: salaEditando.nombre,
                filas: String(salaEditando.capacidad.filas),
                columnas: String(salaEditando.capacidad.columnas)
            });
        } else {
            setFormData(initialData);
            setErrores(initialErrors);
        }
    }, [salaEditando]);

    const handleChange = (campo: Campo, valor: string): void => {
        const nuevoFormData: FormData = { ...formData, [campo]: valor };
        setFormData(nuevoFormData);
        setErrores(prev => ({ ...prev, [campo]: validarCampo(campo, valor, nuevoFormData, salas, salaEditando) }));
    };

    const handleSubmit = (): void => {
        
        const nuevosErrores: FormErrors = {
            nombre: validarCampo("nombre", formData.nombre, formData, salas, salaEditando),
            filas: validarCampo("filas", formData.filas, formData, salas, salaEditando),
            columnas: validarCampo("columnas", formData.columnas, formData, salas, salaEditando)
        };

        setErrores(nuevosErrores);
        if (Object.values(nuevosErrores).every(e => e === "")) {
            if (salaEditando) {
                dispatch(
                    updateSala({
                        id: salaEditando.id,
                        nombre: formData.nombre,
                        capacidad: {
                            filas: Number(formData.filas),
                            columnas: Number(formData.columnas)
                        },
                        asientos: salaEditando.asientos
                    })
                );
                cancelarEdicion();
            }
            else {
                dispatch(
                    addSala({
                        nombre: formData.nombre,
                        capacidad: {
                            filas: Number(formData.filas),
                            columnas: Number(formData.columnas)
                        }
                    })
                );
                setFormData(initialData);
                setErrores(initialErrors);
            }
        }
    };

    const obtenerEstado = (campo: Campo) => {
        if (errores[campo]) return styles.inputError;
        if (formData[campo]) return styles.inputSuccess;
        return "";
    };

    return (
        <div className={styles.salasCard}>
            <h2 className={styles.titleCard}>
                {salaEditando ? "Editar sala" : "Crear sala"}
            </h2>

            {(["nombre", "filas", "columnas"] as Campo[]).map((campo) => (
                <div className={styles.formCampo} key={campo}>
                    <label className={styles.formLabel}>
                        {{
                            nombre: "Nombre:",
                            filas: "Filas:",
                            columnas: "Columnas:"
                        }[campo]}
                    </label>

                    <input
                        type={campo === "nombre" ? "text" : "number"}
                        className={`${styles.formInput} ${obtenerEstado(campo)}`}
                        value={formData[campo]}
                        onChange={(e) => handleChange(campo, e.target.value)}
                    />

                    {errores[campo] && (
                        <p className={styles.error}>
                            <TriangleAlert size={14} />
                            {errores[campo]}
                        </p>
                    )}
                </div>
            ))}

            <button className={styles.btnFormulario} onClick={handleSubmit}>
                {salaEditando ? "Guardar cambios" : "Crear sala"}
            </button>
        </div >
    );
}