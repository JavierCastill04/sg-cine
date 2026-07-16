import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sala } from "@/types/Sala";
import { salasData } from "@/data/salasData";
import { Asiento } from "@/types/Asiento";

const initialState: Sala[] = salasData;

const generarAsientos = (salaId: number, filas: number, columnas: number): Asiento[] => {
    const asientos: Asiento[] = [];
    for (let fila = 1; fila <= filas; fila++) {
        for (let columna = 1; columna <= columnas; columna++) {
            asientos.push({
                id: `${salaId}-${fila}-${columna}`,
                sala: salaId,
                ubicacion: { fila, columna },
                estado: "disponible"
            });
        }
    }
    return asientos;
};

const salasSlice = createSlice({
    name: "salas",
    initialState,
    reducers: {
        addSala: (state, action: PayloadAction<Omit<Sala, 'asientos'>>) => {
            const listaAsientos = generarAsientos(action.payload.id, action.payload.capacidad.filas, action.payload.capacidad.columnas);
            const salaExistente = state.find(
                sala => sala.id === action.payload.id || sala.nombre === action.payload.nombre
            );

            if (salaExistente) {
                //Notificar al usuario directamente, hacer luego.
                console.log(`La ${action.payload.nombre} con id ${action.payload.id} ya existe. No se puede agregar.`);

            } else {
                state.push({
                    ...action.payload,
                    asientos: listaAsientos
                });
            }
        },

        updateSala: (state, action: PayloadAction<Sala>) => {
            const salaId = state.findIndex(sala => sala.id === action.payload.id);

            if (salaId !== -1) {
                const salaActual = state[salaId];
                const sinReservas = salaActual.asientos.every(
                    asiento => asiento.estado === "disponible"
                );

                if (!sinReservas) {
                    console.log("No se puede editar: La sala tiene asientos ocupados o reservados.");
                    return;
                }

                const capacidadNueva = action.payload.capacidad;
                //Evaluar si cambian las dimensiones
                if (salaActual.capacidad.filas !== capacidadNueva.filas || salaActual.capacidad.columnas !== capacidadNueva.columnas) {
                    {
                        state[salaId] = {
                            ...action.payload,
                            asientos: generarAsientos(action.payload.id, capacidadNueva.filas, capacidadNueva.columnas)
                        };
                    }
                }
                else {
                    state[salaId] = {
                        ...state[salaId],
                        ...action.payload
                    };
                }
            }
            else {
                //Notificar al usuario directamente, hacer luego.
                console.log(`La ${action.payload.nombre} con id ${action.payload.id} no existe o no se encontró. No se puede actualizar.`);
            }
        },

        removeSala: (state, action: PayloadAction<Sala>) => {
            const salaId = state.findIndex(sala => sala.id === action.payload.id);
            if (salaId !== -1) {
                state.splice(salaId, 1);
            }
            else {
                //Notificar al usuario directamente, hacer luego.
                console.log(`La ${action.payload.nombre} con id ${action.payload.id} no existe o no se encontró. No se puede eliminar.`);
            }
        }
    }
});

export const { addSala, updateSala, removeSala } = salasSlice.actions;
export default salasSlice.reducer;