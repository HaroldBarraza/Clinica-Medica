import { Citas } from "../types/citas";

export let citas: Citas[] = [];

export function setLista(nuevalista: Citas[]) {
  citas = nuevalista;
}
