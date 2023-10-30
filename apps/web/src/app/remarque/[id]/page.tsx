"use client";

import styles from "./page.module.scss";
import { useContext } from "react";
import { RemarqueContext } from "./layout";
import { updateRemarqueHeader } from "@/utils/remarque";

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

  return (
    <section className={styles.content}>
      <div
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(ev) => {
          updateRemarqueHeader(ev.target.innerText, remarque, setRemarque);
        }}
        className={styles.contentHeader}
      >
        {remarque?.frontPage.title}
      </div>
    </section>
  );
}
