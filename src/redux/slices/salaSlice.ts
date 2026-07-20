import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sala } from "@/types/Sala";
import { salasData } from "@/data/salasData";
import { Asiento } from "@/types/Asiento";

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

const generarAsientos = (salaId: number, filas: number, columnas: number): Asiento[] => {
    const asientos: Asiento[] = [];

    for (let fila = 0; fila < filas; fila++) {
        const letraFila = obtenerLetraFila(filas);
        for (let columna = 1; columna <= columnas; columna++) {
            asientos.push({
                id: `${salaId}-${letraFila}-${columna}`,
                idSala: salaId,
                ubicacion: { letraFila, columna }
            });
        }
    }
    return asientos;
};

const initialState: Sala[] = salasData.map((sala) => ({
    ...sala, asiento: generarAsientos(
        sala.id,
        sala.capacidad.filas,
        sala.capacidad.columnas
    )
}))

const salaSlice = createSlice({
    name: "sala",
    initialState,
    reducers: {
        addSala: (state, action: PayloadAction<Omit<Sala, 'id' | 'asientos'>>) => {
            const nuevoId = state.length > 0 ? Math.max(...state.map(s => s.id)) + 1 : 1;
            const salaExistente = state.find(
                sala => sala.nombre === action.payload.nombre
            );

            if (salaExistente) {
                //Notificar al usuario directamente, hacer luego.
                console.log(`La ${action.payload.nombre} ya existe. No se puede agregar.`);

            } else {
                state.push({
                    id: nuevoId,
                    ...action.payload,
                    asientos: generarAsientos(nuevoId, action.payload.capacidad.filas, action.payload.capacidad.columnas)
                });
            }
        },

        updateSala: (state, action: PayloadAction<Sala>) => {
            const salaId = state.findIndex(sala => sala.id === action.payload.id);
            if (salaId !== -1) {
                const salaActual = state[salaId];

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
                console.log(`No se encuentra la sala indicada`);
            }
        },

        removeSala: (state, action: PayloadAction<number>) => {
            const salaId = state.findIndex(sala => sala.id === action.payload);
            if (salaId !== -1) {
                state.splice(salaId, 1);
            }
            else {
                //Notificar al usuario directamente, hacer luego.
                console.log(`La sala no se pudo eliminar.`);
            }
        }
    }
});

export const { addSala, updateSala, removeSala } = salaSlice.actions;
export default salaSlice.reducer;