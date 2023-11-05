"use client";

import { SubPageNode } from "@/interfaces/remarques";
import styles from "./page.module.scss";
import { useContext, useEffect } from "react";
import { RemarqueContext } from "../layout";
import { findSubPage, updateSubPage } from "@/utils/remarque";
import { RemarqueUrlParams } from "@/interfaces/routes";
import { generateRandomId } from "@/utils/utils";

export default function RemarqueSubPageId({
  params,
}: {
  params: RemarqueUrlParams;
}) {
  const context = useContext(RemarqueContext);
  if (!context) {
    return <h2>Loading</h2>;
  }
  const { remarque } = context;

  const addParagraph = () => {
    const newNode: SubPageNode = {
      id: generateRandomId(),
      type: "content",
      content: "New para",
    };
    if (!remarque) {
      throw new Error("Remarque not found");
    }

    updateSubPage(newNode, context, params);
  };

  if (!remarque) {
    return <section className={styles.remarqueContent}>Loading</section>;
  }

  return (
    <section className={styles.remarqueContent}>
      {findSubPage(remarque, params.subId).nodes.map((node) => {
        return renderCorrectElement(node, context, params);
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

function renderCorrectElement(
  node: SubPageNode,
  context: RemarqueContext,
  urlParams: RemarqueUrlParams
) {
  function handleNodeUpdate(mod: string) {
    const newNode: SubPageNode = { ...node, content: mod };
    updateSubPage(newNode, context, urlParams);
  }
  switch (node.type) {
    case "header":
      return (
        <div
          key={node.id}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(ev) => handleNodeUpdate(ev.target.innerText)}
          className={styles.subPageHeader}
        >
          {node.content}
        </div>
      );

    case "content":
      return (
        <div
          key={node.id}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(ev) => handleNodeUpdate(ev.target.innerText)}
          className={styles.subPagePara}
        >
          {node.content}
        </div>
      );

    case "image":
      return <h2>This is image</h2>;
  }
}
