import { Remarque } from "@/interfaces/remarques";

export type LSDataType = "remarques";

export function saveToLocalStorage<T>(key: LSDataType, data: T[]) {
  const itemToLS = JSON.stringify(data);
  localStorage.setItem(key, itemToLS);
}

export function getFromLocalStorage<T>(key: LSDataType): T[] | null {
  const itemFromLS = localStorage.getItem(key);
  if (itemFromLS) {
    return JSON.parse(itemFromLS);
  }
  return null;
}

export function updateLocalStorageState(newRemarque: Remarque) {
  const remarques = getFromLocalStorage<Remarque>("remarques");

  if (!remarques) {
    return;
  }

  const id = newRemarque.id;
  const newRemarques = remarques?.filter((remarque) => remarque.id !== id);

  newRemarques.push(newRemarque);

  saveToLocalStorage("remarques", newRemarques);
}
