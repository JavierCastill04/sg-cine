import { configureStore } from "@reduxjs/toolkit";
import peliculaReducer from "./slices/peliculaSlice";
import salaReducer from "./slices/salaSlice";

export const store = configureStore({
    reducer: {
        //Un reducer por modulo
        sala : salaReducer,
        pelicula: peliculaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;