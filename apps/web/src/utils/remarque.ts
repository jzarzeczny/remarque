import { Remarque, SubPage, SubPageNode } from "@/interfaces/remarques";
import { RemarqueUrlParams } from "@/interfaces/routes";
import { RemarqueContext } from "@/app/remarque/[id]/layout";
import { modifyRemarque } from "./api";

export async function updateSubPage(
  node: SubPageNode,
  context: RemarqueContext,
  urlParams: RemarqueUrlParams
) {
  const { remarque, setRemarque } = context;
  if (!remarque) {
    throw new Error("Remarque not found");
  }

  const subPage = findSubPage(remarque, urlParams.subId);

  let newRemarque: Remarque;

  if (nodeExists(subPage, node) && node.content === "") {
    newRemarque = deleteSubPageNode(remarque, subPage, node);
  } else if (nodeExists(subPage, node)) {
    newRemarque = modifySubPageNode(remarque, subPage, node);
  } else {
    newRemarque = addNodeToSubPage(remarque, subPage, node);
  }

  await modifyRemarque(newRemarque);

  setRemarque(newRemarque);
}

function addNodeToSubPage(
  remarque: Remarque,
  subPage: SubPage,
  newNode: SubPageNode
): Remarque {
  return {
    ...remarque,
    subPage: remarque.subPage?.map((sub) => {
      if (sub.id === subPage.id) {
        return { ...sub, nodes: [...sub.nodes, newNode] };
      }
      return sub;
    }),
  };
}

function modifySubPageNode(
  remarque: Remarque,
  subPage: SubPage,
  node: SubPageNode
): Remarque {
  const newSubPage: SubPage = {
    ...subPage,
    nodes: subPage.nodes.map((n) => {
      if (n.id === node.id) {
        return node;
      }
      return n;
    }),
  };

  const newRemarque = {
    ...remarque,
    subPage: remarque.subPage?.map((sub) => {
      if (sub.id === newSubPage.id) {
        return newSubPage;
      }
      return sub;
    }),
  };

  return newRemarque;
}

function deleteSubPageNode(
  remarque: Remarque,
  subPage: SubPage,
  node: SubPageNode
): Remarque {
  const newSubPage = {
    ...subPage,
    nodes: subPage.nodes.filter((n) => n.id !== node.id),
  };

  const newRemarque = {
    ...remarque,
    subPage: remarque.subPage?.map((sub) => {
      if (sub.id === subPage.id) {
        return newSubPage;
      }

      return sub;
    }),
  };

  return newRemarque;
}

export async function updateRemarqueHeader(
  value: string,
  remarque: Remarque | undefined,
  setRemarque: (value: Remarque) => void
) {
  if (!remarque || !value) {
    throw new Error("Cannot update remarque, it's not found");
  }

  const newRemarque: Remarque = {
    ...remarque,
    frontPage: {
      ...remarque.frontPage,
      title: value,
    },
  };

  setRemarque(newRemarque);
  await modifyRemarque(newRemarque);
}

export function findSubPage(
  remarque: Remarque | undefined,
  subId: string
): SubPage {
  if (!remarque) {
    return {} as SubPage;
  }
  let subPage = remarque?.subPage?.find((sub) => sub.id === subId);

  if (!subPage) {
    subPage = {} as SubPage;
  }

  return subPage;
}

function nodeExists(subPage: SubPage, node: SubPageNode): boolean {
  return !!subPage.nodes.find((n) => n.id === node.id);
}
