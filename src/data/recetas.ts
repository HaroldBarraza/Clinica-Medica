import { Recetas } from "../types/recetas";

export let recetas: Recetas[] = [];

export function setLista(nuevalista: Recetas[]) {
  recetas = nuevalista;
}
