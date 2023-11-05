"use client";

import { Remarque } from "@/interfaces/remarques";
import Link from "next/link";
import styles from "./RemarqueCard.module.scss";
import { useFormState } from "react-dom";
import { deleteRemarqueForm } from "@/app/dashboard/actions";
import { Button } from "./common/button/Buttons";
import clsx from "clsx";

const initialState = {
  message: null,
};

interface RemarqueCardProps {
  remarque: Remarque;
}

export const RemarqueCard = ({ remarque }: RemarqueCardProps) => {
  const [_, formAction] = useFormState(deleteRemarqueForm, initialState);

  return (
    <div className={clsx(styles.container, "cardContainer")}>
      <div className={styles.cardBody}>
        <h3 className={styles.remarqueTitle}>{remarque.frontPage.title}</h3>
      </div>
      <div className={styles.cardFooter}>
        <Button
          type="anchor"
          text="Edit"
          size="small"
          style="primary"
          href={`/remarque/${remarque.id}`}
        />
        <form action={formAction}>
          <input type="hidden" name="id" value={remarque.id} />
          <Button
            type="button"
            isForm={true}
            text="Delete"
            size="small"
            style="secondary"
          />
        </form>
      </div>
    </div>
  );
};
