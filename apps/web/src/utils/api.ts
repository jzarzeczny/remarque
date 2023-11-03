import { NewRemarque, Remarque } from "@/interfaces/remarques";

export async function getAllRemarques() {
  const res = await fetch("http://localhost:4000/remarque", {
    method: "GET",
  });

  const remarques = await res.json();

  return remarques;
}

export async function getOneRemarque(id: string) {
  return await fetch(`http://localhost:4000/remarque/${id}`);
}
export async function addRemarque(data: NewRemarque) {
  return fetch("http://localhost:4000/remarque", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteRemarque(remarque: Remarque) {
  return await fetch(`http://localhost:4000/remarque`, {
    method: "DELETE",
    body: JSON.stringify(remarque),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function modifyRemarque(data: Remarque) {
  return fetch(`http://localhost:4000/remarque`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
