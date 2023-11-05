import { NewRemarque, Remarque } from "@/interfaces/remarques";

export async function getAllRemarques(): Promise<Remarque[]> {
  const res = await fetch("http://localhost:4000/remarque", {
    method: "GET",
  });

  const remarques = await res.json();

  return remarques;
}

export async function getOneRemarque(id: string) {
  const response = await fetch(`http://localhost:4000/remarque/${id}`);

  return response.json();
}

export async function addRemarque(data: NewRemarque) {
  const response = await fetch("http://localhost:4000/remarque", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function modifyRemarque(data: Remarque) {
  const response = await fetch(`http://localhost:4000/remarque`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response.json();
  }
}

export async function deleteRemarque(id: string) {
  const response = await fetch(`http://localhost:4000/remarque`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
