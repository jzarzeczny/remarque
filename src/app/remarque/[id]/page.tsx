"use client";

import styles from "./page.module.scss";
import { useContext } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Remarque } from "@/interfaces/remarques";
import { RemarqueContext } from "./layout";

interface RemarqueIdProps {
  params: {
    id: string;
  };
}

export default function RemarqueId({ params }: RemarqueIdProps) {
  let context = useContext(RemarqueContext);

  if (!context) {
    return;
  }

  const { remarque, setRemarque } = context;

  function update(update: string) {
    if (!remarque || !update) {
      return;
    }
    const newRemarque: Remarque = {
      ...remarque,
      frontPage: {
        ...remarque.frontPage,
        title: update,
      },
    };

    setRemarque(newRemarque);
    const remarques = getFromLocalStorage<Remarque>("remarques");

    if (!remarques) {
      return;
    }

    const newRemarques = remarques?.filter(
      (remarque) => remarque.id !== params.id
    );

    newRemarques.push(newRemarque);

    saveToLocalStorage("remarques", newRemarques);
  }

  return (
    <section className={styles.content}>
      <div
        contentEditable
        onBlur={(ev) => {
          console.log(ev);
          update(ev.target.innerText);
        }}
        className={styles.contentHeader}
      >
        {remarque?.frontPage.title}
      </div>
    </section>
  );
}
