"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { Suspense, useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Remarque } from "@/interfaces/remarques";
import { useRouter } from "next/navigation";

interface RemarqueIdProps {
  params: {
    id: string;
  };
}

export default function RemarqueId({ params }: RemarqueIdProps) {
  const [remarque, setRemarque] = useState<Remarque>();

  const router = useRouter();

  useEffect(() => {
    const remarques = getFromLocalStorage<Remarque>("remarques");
    const singleRemarque = remarques?.filter(
      (remarque) => remarque.id === params.id
    );

    if (singleRemarque?.length === 1) {
      setRemarque(singleRemarque[0]);
    } else {
      router.push("/");
    }
  }, [params.id]);

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
    <main className={styles.main}>
      <aside className={styles.aside}>
        <Link className={styles.asideMain} href={`/remarque/${params.id}`}>
          Spis treści
        </Link>
        <span className={styles.separator} />
        <button className={styles.asideAdd}> + </button>
      </aside>
      <Suspense fallback={"Loading"}>
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
      </Suspense>
    </main>
  );
}
