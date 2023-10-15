import { Remarque } from "@/interfaces/remarques";
import Link from "next/link";
import styles from "./RemarqueCard.module.scss";

interface RemarqueCardProps {
  remarque: Remarque;
  removeRemarque: (id: string) => void;
}

export const RemarqueCard = ({
  remarque,
  removeRemarque,
}: RemarqueCardProps) => {
  return (
    <div className={styles.container}>
      <Link href={`/remarque/${remarque.id}`} className="cardContainer">
        <h3 className={styles.remarqueTitle}>{remarque.frontPage.title}</h3>
      </Link>
      <button
        className={styles.removeButton}
        onClick={() => removeRemarque(remarque.id)}
      >
        Usuń
      </button>
    </div>
  );
};
