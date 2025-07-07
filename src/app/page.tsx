import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.backgroundImage}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <nav className={styles.navContent}>
            <div className={styles.linkLeft}>
              <div className={styles.linkAbout}>
                <Link className={styles.About} href="/About">
                  à propos
                </Link>
              </div>
              <div className={styles.linkContact}>
                <Link className={styles.Contact} href="/Contact">
                  contact
                </Link>
              </div>
            </div>

            <div className={styles.linkRight}>
              <div className={styles.linkAccount}>
                <Link className={styles.Account} href="/Account">
                  compte
                </Link>
              </div>
              <div className={styles.linkSubscription}>
                <Link className={styles.Subscription} href="/Subscription">
                  inscription
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <section className={styles.ImgButtonQuiz}>
          <Link href="/quiz/1">
            <img src="/logoq1.png" alt="logo quiz1" />
          </Link>
          <Link href="/quiz/2">
            <img src="/logoq2.png" alt="logo quiz2" />
          </Link>
          <Link href="/quiz/3">
            <img src="/logoq3.png" alt="logo quiz3" />
          </Link>
          <Link href="/quiz/4">
            <img src="/logoq4.png" alt="logo quiz4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
