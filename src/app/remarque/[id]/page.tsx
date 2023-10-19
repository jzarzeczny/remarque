"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { Suspense, useContext } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Remarque, SubPage } from "@/interfaces/remarques";
import { generateRandomId } from "@/utils/utils";
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

  const addSubPage = () => {
    const newSubPage: SubPage = {
      id: generateRandomId(),
      nodes: [
        {
          content: "title",
          type: "header",
        },
      ],
    };
    const remarques = getFromLocalStorage<Remarque>("remarques");
    if (!remarque) {
      return;
    }
    const newRemarque: Remarque = remarque;
    if (!newRemarque.subPage) {
      newRemarque.subPage = [];
    }
    newRemarque.subPage?.push(newSubPage);

    const withoutOld = remarques?.filter(
      (remarque) => remarque.id !== params.id
    );

    withoutOld?.push(newRemarque);

    setRemarque(newRemarque);
    if (withoutOld) {
      saveToLocalStorage("remarques", withoutOld);
    }
  };

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
