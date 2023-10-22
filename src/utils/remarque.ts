import { Remarque, SubPage, SubPageNode } from "@/interfaces/remarques";
import { updateLocalStorageState } from "./localStorage";
import { RemarqueUrlParams } from "@/interfaces/routes";
import { RemarqueContext } from "@/app/remarque/[id]/layout";

export function updateSubPage(
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
  if (nodeExists(subPage, node)) {
    newRemarque = modifySubPageNode(remarque, subPage, node);
  } else {
    newRemarque = addNodeToSubPage(remarque, subPage, node);
  }

  setRemarque(newRemarque);
  updateLocalStorageState(newRemarque);
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

export function updateRemarqueHeader(
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
  updateLocalStorageState(newRemarque);
}

export function findSubPage(
  remarque: Remarque | undefined,
  subId: string
): SubPage {
  if (!remarque) {
    return {} as SubPage;
  }
  const subPage = remarque?.subPage?.find((sub) => sub.id === subId);

  if (!subPage) {
    throw new Error("There is no subPage!");
  }

  return subPage;
}

function nodeExists(subPage: SubPage, node: SubPageNode): boolean {
  return !!subPage.nodes.find((n) => n.id === node.id);
}
