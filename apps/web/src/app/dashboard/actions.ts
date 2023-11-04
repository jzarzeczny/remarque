"use server";

import { NewRemarque } from "@/interfaces/remarques";
import { revalidatePath } from "next/cache";
import { addRemarque, deleteRemarque } from "@/utils/api";

export async function addRemarqueForm(prevState: any, formData: FormData) {
  const newRemarque: NewRemarque = {
    frontPage: {
      title: "New Remarque",
    },
  };
  await addRemarque(newRemarque);
  revalidatePath("/dashboard");
}

export async function deleteRemarqueForm(prevState: any, formData: FormData) {
  //TODO remove type casting
  const id = formData.get("id") as string;
  await deleteRemarque(id);
  revalidatePath("/dashboard");
}
