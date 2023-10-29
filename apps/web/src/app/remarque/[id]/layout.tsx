"use client";

import Link from "next/link";
import styles from "./layout.module.scss";
import { Remarque, SubPage } from "@/interfaces/remarques";
import { generateRandomId } from "@/utils/utils";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  updateLocalStorageState,
} from "@/utils/localStorage";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface RemarqueContext {
  remarque: Remarque | undefined;
  setRemarque: (value: Remarque) => void;
}

export const RemarqueContext = createContext<RemarqueContext | undefined>(
  undefined
);

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
  const router = useRouter();

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
  }, [params.id, setRemarque]);

  const addSubPage = () => {
    if (!remarque) {
      return;
    }
    const newSubPage: SubPage = {
      id: generateRandomId(),
      nodes: [
        {
          id: generateRandomId(),
          content: "Nowy rozdział",
          type: "header",
        },
      ],
    };

    const newRemarque: Remarque = JSON.parse(JSON.stringify(remarque));
    if (!newRemarque.subPage) {
      newRemarque.subPage = [];
    }
    newRemarque.subPage?.push(newSubPage);
    setRemarque(() => newRemarque);

    updateLocalStorageState(newRemarque);
  };

  const removeSubPage = (subId: string) => {
    if (!remarque) {
      return;
    }
    const newRemarque = {
      ...remarque,
      subPage: remarque?.subPage?.filter((sub) => sub.id !== subId) || [],
    };

    router.push("/remarque/" + remarque.id);

    setRemarque(() => newRemarque);

    updateLocalStorageState(remarque);
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
                  <div key={sub.id} className={styles.subPageLink}>
                    <Link href={`/remarque/${params.id}/${sub.id}`}>
                      {title}
                    </Link>
                    <button onClick={() => removeSubPage(sub.id)}>X</button>
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
