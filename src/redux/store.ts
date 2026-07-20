import { configureStore } from "@reduxjs/toolkit";
import peliculaReducer from "@/redux/slices/peliculaSlice";
import salaReducer from "@/redux/slices/salaSlice";
import funcionReduccer from "@/redux/slices/funicionSlice";

export const store = configureStore({
    reducer: {
        sala : salaReducer,
        pelicula: peliculaReducer,
        funcion: funcionReduccer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;