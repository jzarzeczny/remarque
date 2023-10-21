import { Remarque, SubPage, SubPageNode } from "@/interfaces/remarques";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";
import { RemarqueUrlParams } from "@/interfaces/routes";

export function updateSubPage(
  newNode: SubPageNode,
  remarque: Remarque,
  setRemarque: (value: Remarque) => void,
  urlParams: RemarqueUrlParams
) {
  const remarques = getFromLocalStorage<Remarque>("remarques");

  const subPage = findSubPage(remarque, urlParams.subId);

  subPage.nodes.push(newNode);
  if (!remarque) {
    throw new Error("Remarque not found");
  }
  const remarqueWithoutSelectedSub = {
    ...remarque,
    subPage: remarque?.subPage?.filter((sub) => sub.id !== urlParams.subId),
  };

  remarqueWithoutSelectedSub.subPage?.push(subPage);

  const remarqueWithNewSub: Remarque = { ...remarqueWithoutSelectedSub };
  setRemarque(remarqueWithNewSub);

  if (!remarques) {
    throw new Error("Remarques not found");
  }

  const remarquesWithoutSelectedRemarque = remarques.filter(
    (remarque) => remarque.id !== urlParams.id
  );

  const newRemarques = [
    ...remarquesWithoutSelectedRemarque,
    remarqueWithNewSub,
  ];

  saveToLocalStorage("remarques", newRemarques);
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

function updateLocalStorageState(newRemarque: Remarque) {
  const remarques = getFromLocalStorage<Remarque>("remarques");

  if (!remarques) {
    return;
  }

  const id = newRemarque.id;
  const newRemarques = remarques?.filter((remarque) => remarque.id !== id);

  newRemarques.push(newRemarque);

  saveToLocalStorage("remarques", newRemarques);
}

export function findSubPage(
  remarque: Remarque | undefined,
  subId: string
): SubPage {
  const subPage = remarque?.subPage?.find((sub) => sub.id === subId);

  if (!subPage) {
    throw new Error("There is no subPage!");
  }

  return subPage;
}
