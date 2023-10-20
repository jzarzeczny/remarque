"use client";

import Link from "next/link";
import styles from "./layout.module.scss";
import { Remarque, SubPage } from "@/interfaces/remarques";
import { generateRandomId } from "@/utils/utils";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { ReactNode, createContext, useEffect, useState } from "react";

export const RemarqueContext = createContext<
  | {
      remarque: Remarque | undefined;
      setRemarque: (value: Remarque) => void;
    }
  | undefined
>(undefined);

export default function RemarqueLayout({
  params,
  children,
}: {
  params: {
    id: string;
  };
  children: ReactNode;
}) {
  const [remarque, setRemarque] = useState<Remarque>();

  useEffect(() => {
    const remarques = getFromLocalStorage<Remarque>("remarques");
    const singleRemarque = remarques?.filter(
      (remarque) => remarque.id === params.id
    );

    if (singleRemarque?.length === 1) {
      setRemarque(singleRemarque[0]);
    } else {
      return;
    }
  }, [params.id]);

  const addSubPage = () => {
    const newSubPage: SubPage = {
      id: generateRandomId(),
      nodes: [
        {
          content: "Nowy rozdział",
          type: "header",
        },
      ],
    };
    const remarques = getFromLocalStorage<Remarque>("remarques");
    if (!remarque) {
      return;
    }
    const newRemarque: Remarque = JSON.parse(JSON.stringify(remarque));
    if (!newRemarque.subPage) {
      newRemarque.subPage = [];
    }
    newRemarque.subPage?.push(newSubPage);

    const withoutOld = remarques?.filter(
      (remarque) => remarque.id !== params.id
    );

    withoutOld?.push(newRemarque);

    setRemarque(() => newRemarque);
    if (withoutOld) {
      saveToLocalStorage("remarques", withoutOld);
    }
  };

  const findTitle = (subPage: SubPage) => {
    return subPage.nodes.find((node) => node.type === "header")?.content;
  };

  return (
    <RemarqueContext.Provider value={{ remarque, setRemarque }}>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <Link className={styles.asideMain} href={`/remarque/${params.id}`}>
            Spis treści
          </Link>
          <span className={styles.separator} />
          <div className={styles.asideSectionsContainer}>
            {remarque?.subPage &&
              remarque?.subPage.map((sub) => {
                const title = findTitle(sub);

                return (
                  <div className={styles.subPageLink} key={sub.id}>
                    <Link href={`/remarque/${params.id}/${sub.id}`}>
                      {title}
                    </Link>
                  </div>
                );
              })}
          </div>
          <button onClick={addSubPage} className={styles.asideAdd}>
            +
          </button>
        </aside>
        {children}
      </main>
    </RemarqueContext.Provider>
  );
}
