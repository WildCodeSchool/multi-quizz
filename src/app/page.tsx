import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.backgroundImage}>
      <div className={styles.container}>
        <nav>
          <Link href="/about">
            <button className={styles.button}>À propos</button>
          </Link>

          <Link href="/contact">
            <button className={styles.button}>Contact</button>
          </Link>

          <Link href="/compte">
            <button className={styles.button}>Compte</button>
          </Link>

          <Link href="/inscription">
            <button className={styles.button}>Inscription</button>
          </Link>
        </nav>
      </div>

      <section className={styles.ImgButtonQuiz}>
        <Link href="/quiz1">
          <img src="/logoq1.png" alt="logo quiz1" />
        </Link>
        <Link href="/quiz2">
          <img src="/logoq2.png" alt="logo quiz2" />
        </Link>
        <Link href="/quiz3">
          <img src="/logoq3.png" alt="logo quiz3" />
        </Link>
        <Link href="/quiz4">
          <img src="/logoq4.png" alt="logo quiz4" />
        </Link>
      </section>
    </div>
  );
}
