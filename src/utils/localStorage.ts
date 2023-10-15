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
