export const GENEROS = [
  "Acción",
  "Animación",
  "Terror",
  "Suspenso",
  "Romance",
  "Comedia",
  "Aventura",
  "Ciencia Ficción",
] as const;

export const CLASIFICACIONES = [
  "Todo público",
  "12+",
  "15+",
  "18+",
] as const;

export type Genero = (typeof GENEROS)[number];

export type Clasificacion =
  (typeof CLASIFICACIONES)[number];