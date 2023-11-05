import { RemarqueAddCard } from "@/components/RemarqueAddCard";
import styles from "./page.module.scss";
import { RemarqueCard } from "@/components/RemarqueCard";
import { getAllRemarques } from "@/utils/api";

export default async function Dashboard() {
  const remarquesData = await getAllRemarques();

  return (
    <main className={styles.main}>
      <RemarqueAddCard />
      {remarquesData.length > 0 &&
        remarquesData.map((remarque) => (
          <RemarqueCard key={remarque.id} remarque={remarque} />
        ))}
    </main>
  );
}
