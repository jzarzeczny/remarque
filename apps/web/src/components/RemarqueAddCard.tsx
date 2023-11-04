"use client";

import { addRemarqueForm } from "@/app/dashboard/actions";
import { useFormState } from "react-dom";

const initialState = {};

export const RemarqueAddCard = () => {
  const [_, formAction] = useFormState(addRemarqueForm, initialState);

  return (
    <form action={formAction}>
      <button type="submit" className="cardContainer">
        <span>+</span>
      </button>
    </form>
  );
};
