"use client";

import { Remarque, SubPage, SubPageNode } from "@/interfaces/remarques";
import styles from "./page.module.scss";
import { useContext } from "react";
import { RemarqueContext } from "../layout";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { findSubPage, updateSubPage } from "@/utils/remarque";
import { RemarqueUrlParams } from "@/interfaces/routes";

export default function RemarqueSubPageId({
  params,
}: {
  params: RemarqueUrlParams;
}) {
  const context = useContext(RemarqueContext);

  if (!context) {
    return;
  }

  const { remarque, setRemarque } = context;

  const addParagraph = () => {
    const newNode: SubPageNode = {
      type: "content",
      content: "Nowy paragraf",
    };

    if (!remarque) {
      throw new Error("Remarque not found");
    }
    updateSubPage(newNode, remarque, setRemarque, params);
  };

  return (
    <section className={styles.remarqueContent}>
      {findSubPage(remarque, params.subId).nodes.map((node) => {
        return renderCorrectElement(node);
      })}
      <div className={styles.addButtonContainer}>
        <button
          onClick={() => addParagraph()}
          className={styles.addElementButton}
        >
          +
        </button>
      </div>
    </section>
  );
}

function renderCorrectElement(node: SubPageNode) {
  switch (node.type) {
    case "header":
      return (
        <div className={styles.subPageContainer}>
          <h1>{node.content}</h1>
        </div>
      );

    case "content":
      return (
        <div className={styles.subPageContainer}>
          <p>{node.content}</p>
        </div>
      );

    case "image":
      return <h2>This is image</h2>;
  }
}
