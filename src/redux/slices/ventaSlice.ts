import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Venta } from "@/types/Venta";

const initialState: Venta[] = [];
const ventaSlice = createSlice({
    name: "venta",
    initialState,
    reducers: {
        addVenta: (state, action: PayloadAction<Omit<Venta, "id">>) => {
            const nuevoId =
                state.length > 0
                    ? Math.max(...state.map(v => v.id)) + 1
                    : 1;

            state.push({
                id: nuevoId,
                ...action.payload,
            });
        },
    },
});

export const { addVenta } = ventaSlice.actions;

export default ventaSlice.reducer;