"use client";

import { Remarque, SubPage, SubPageNode } from "@/interfaces/remarques";
import styles from "./page.module.scss";
import { useContext } from "react";
import { RemarqueContext } from "../layout";

export default function RemarqueSubPageId({
  params,
}: {
  params: { subId: string };
}) {
  debugger;

  const context = useContext(RemarqueContext);

  if (!context) {
    return;
  }

  const { remarque } = context;

  return (
    <section className={styles.remarqueContent}>
      {findSubPage(remarque, params.subId).nodes.map((node) => {
        return renderCorrectElement(node);
      })}
    </section>
  );
}

function findSubPage(remarque: Remarque | undefined, subId: string): SubPage {
  const subPage = remarque?.subPage?.find((sub) => sub.id === subId);

  if (!subPage) {
    throw new Error("There is no subPage!");
  }

  return subPage;
}

function renderCorrectElement(node: SubPageNode) {
  switch (node.type) {
    case "header":
      return <h2>This is header</h2>;

    case "content":
      return <h2>This is content</h2>;

    case "image":
      return <h2>This is image</h2>;
  }
}
