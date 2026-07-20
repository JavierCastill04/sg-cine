import { configureStore } from "@reduxjs/toolkit";
import peliculaReducer from "./slices/peliculaSlice";

export const store = configureStore({
  reducer: {
    pelicula: peliculaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;