import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import { Footer } from "@/components/common/footer/Footer";

export default function Home() {
  return (
    <>
      <section className={styles.cta}>
        <h1>
          Make a note
          <br />
          and present
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
          consequatur quasi, vel assumenda, accusamus praesentium quibusdam odio
        </p>
        <div className={styles.buttonsContainer}>
          <Link className={styles.primaryButton} href="/register">
            Register now
          </Link>
          <Link href="/demo" className={styles.secondaryButton}>
            How it works
          </Link>
        </div>

        <Image
          src={"assets/notes.svg"}
          alt="note image"
          width={500}
          height={500}
        />

        <div className={styles.bulb}></div>
        <div className={styles.bulbSmall}>
          <Image
            src={"assets/student.svg"}
            alt="student image"
            width={50}
            height={50}
          />
        </div>
        <div className={styles.bulbSmall}>
          <Image
            src={"assets/notepad.svg"}
            alt="student image"
            width={50}
            height={50}
          />
        </div>
        <div className={styles.bulbSmall}>
          <Image
            src={"assets/book.svg"}
            alt="student image"
            width={50}
            height={50}
          />
        </div>
      </section>
      <section className={styles.details}>
        <div className={styles.separator} />
        <h2>
          Your
          <br /> notes record
        </h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi
          quibusdam eaque dolores consequatur commodi, dolorum qui vel eveniet.
        </p>
        <div className={styles.infoWrapper}>
          <Image
            src={"/assets/human-books.png"}
            alt="human books"
            width={400}
            height={400}
            className={styles.image}
          />
          <div className={styles.statsWrapper}>
            <h3>
              Remarques
              <br />
              created:
            </h3>
            <span>23</span>
          </div>
        </div>
      </section>
      <div className={styles.linearSeparator} />
      <Footer />
    </>
  );
}
