"use client";
import { RemarqueAddCard } from "@/components/RemarqueAddCard";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { NewRemarque, Remarque } from "@/interfaces/remarques";

import { RemarqueCard } from "@/components/RemarqueCard";
import { addRemarque, deleteRemarque, getAllRemarques } from "@/utils/api";

export default function Dashboard() {
  const [remarquesData, setRemarquesData] = useState<Remarque[]>([]);

  const addNewRemarque = async () => {
    const newRemarque: NewRemarque = {
      frontPage: {
        title: "New Remarque",
      },
    };

    await addRemarque(newRemarque);
  };

  const removeRemarque = async (remarque: Remarque) => {
    await deleteRemarque(remarque);
  };

  useEffect(() => {
    async function getRemarques() {
      const remarques = await getAllRemarques();
      setRemarquesData(remarques);
    }

    getRemarques();
  }, []);

  return (
    <main className={styles.main}>
      <RemarqueAddCard addRemarque={addNewRemarque} />
      {remarquesData.length > 0 &&
        remarquesData.map((remarque) => (
          <RemarqueCard
            key={remarque.id}
            remarque={remarque}
            removeRemarque={removeRemarque}
          />
        ))}
    </main>
  );
}
