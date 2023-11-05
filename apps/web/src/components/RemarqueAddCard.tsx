"use client";

import { addRemarqueForm } from "@/app/dashboard/actions";
import { useFormState } from "react-dom";
import styles from "./RemarqueAddCard.module.scss";
import clsx from "clsx";

const initialState = {};

export const RemarqueAddCard = () => {
  const [_, formAction] = useFormState(addRemarqueForm, initialState);

  return (
    <form action={formAction}>
      <button type="submit" className={clsx(styles.container, "cardContainer")}>
        <span>+</span>
      </button>
    </form>
  );
};
