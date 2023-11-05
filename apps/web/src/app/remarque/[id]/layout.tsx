"use client";

import Link from "next/link";
import styles from "./layout.module.scss";
import { Remarque, SubPage } from "@/interfaces/remarques";
import { generateRandomId } from "@/utils/utils";
import { ReactNode, createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getOneRemarque, modifyRemarque } from "@/utils/api";
import clsx from "clsx";

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
  const path = usePathname();

  useEffect(() => {
    async function getRemarque() {
      const remarque = await getOneRemarque(params.id);
      setRemarque(remarque);
    }

    getRemarque();
  }, [params.id, setRemarque]);

  const addSubPage = async () => {
    if (!remarque) {
      return;
    }
    const newSubPage: SubPage = {
      id: generateRandomId(),
      nodes: [
        {
          id: generateRandomId(),
          content: "New chapter",
          type: "header",
        },
      ],
    };

    const newRemarque: Remarque = JSON.parse(JSON.stringify(remarque));
    if (!newRemarque.subPage) {
      newRemarque.subPage = [];
    }
    newRemarque.subPage?.push(newSubPage);

    await modifyRemarque(newRemarque);

    setRemarque(() => newRemarque);
  };

  const removeSubPage = async (subId: string) => {
    if (!remarque) {
      return;
    }
    const newRemarque = {
      ...remarque,
      subPage: remarque?.subPage?.filter((sub) => sub.id !== subId) || [],
    };

    router.push("/remarque/" + remarque.id);

    setRemarque(() => newRemarque);

    await modifyRemarque(newRemarque);
  };

  const findTitle = (subPage: SubPage) => {
    return subPage.nodes.find((node) => node.type === "header")?.content;
  };
  return (
    <RemarqueContext.Provider value={{ remarque, setRemarque }}>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <Link className={styles.asideMain} href={`/remarque/${params.id}`}>
            Cover page
          </Link>
          <span className={styles.separator} />
          <div className={styles.asideSectionsContainer}>
            {remarque?.subPage &&
              remarque?.subPage.map((sub) => {
                const title = findTitle(sub);
                return (
                  <div
                    key={sub.id}
                    className={clsx(styles.subPageLink, {
                      [`${styles.subPageLinkActive}`]: shouldBeActive(
                        path,
                        sub
                      ),
                    })}
                  >
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

function shouldBeActive(path: string, sub: SubPage): boolean {
  return !!path.includes(sub.id);
}
