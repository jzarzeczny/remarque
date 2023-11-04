"use client";

import { Remarque } from "@/interfaces/remarques";
import Link from "next/link";
import styles from "./RemarqueCard.module.scss";
import { useFormState } from "react-dom";
import { deleteRemarqueForm } from "@/app/dashboard/actions";

const initialState = {
  message: null,
};

interface RemarqueCardProps {
  remarque: Remarque;
}

export const RemarqueCard = ({ remarque }: RemarqueCardProps) => {
  const [_, formAction] = useFormState(deleteRemarqueForm, initialState);

  return (
    <div className={styles.container}>
      <Link href={`/remarque/${remarque.id}`} className="cardContainer">
        <h3 className={styles.remarqueTitle}>{remarque.frontPage.title}</h3>
      </Link>
      <form action={formAction}>
        <input type="hidden" name="id" value={remarque.id} />
        <button type="submit" className={styles.removeButton}>
          Delete
        </button>
      </form>
    </div>
  );
};
