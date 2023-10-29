"use client";
import { RemarqueAddCard } from "@/components/RemarqueAddCard";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { Remarque } from "@/interfaces/remarques";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { RemarqueCard } from "@/components/RemarqueCard";
import { generateRandomId } from "@/utils/utils";

export default function Dashboard() {
  const [remarquesData, setRemarquesData] = useState<Remarque[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addRemarque = () => {
    const id = generateRandomId();
    const newRemarque: Remarque = {
      id,
      frontPage: {
        title: "New Remarque",
      },
    };
    const newRemarqueData: Remarque[] = [...remarquesData];
    newRemarqueData.push(newRemarque);

    saveToLocalStorage("remarques", newRemarqueData);

    setRemarquesData(newRemarqueData);
  };

  const removeRemarque = (id: string) => {
    const newRemarqueData = remarquesData.filter(
      (remarque) => remarque.id !== id
    );

    saveToLocalStorage("remarques", newRemarqueData);

    setRemarquesData(newRemarqueData);
  };

  useEffect(() => {
    const localRemarques = getFromLocalStorage<Remarque>("remarques");
    if (localRemarques) {
      setRemarquesData(localRemarques);
    }
  }, []);

  return (
    <main className={styles.main}>
      <RemarqueAddCard addRemarque={addRemarque} />
      {remarquesData.map((remarque) => (
        <RemarqueCard
          key={remarque.id}
          remarque={remarque}
          removeRemarque={removeRemarque}
        />
      ))}
    </main>
  );
}
