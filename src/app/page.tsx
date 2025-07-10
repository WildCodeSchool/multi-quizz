import Link from "next/link";
import styles from "./page.module.css";
import { db } from "../lib/db";
import { Quiz } from "../types";

async function getQuizzes(): Promise<Quiz[]> {
  try {
    const [rows] = await db.query(
      "SELECT id, title, picture, slug FROM quizzes"
    );

    return rows as Quiz[];
  } catch (error) {
    console.error("Erreur lors de la récupération des quiz :", error);

    return [];
  }
}

export default async function Home() {
  const quizzes: Quiz[] = await getQuizzes();

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <nav className={styles.navContent}>
            <div className={styles.linkLeft}>
              <div className={styles.linkAbout}>
                <Link className={styles.About} href="/about">
                  à propos
                </Link>
              </div>
              <div className={styles.linkContact}>
                <Link className={styles.Contact} href="/contact">
                  contact
                </Link>
              </div>
            </div>

            <div className={styles.linkRight}>
              <div className={styles.linkAccount}>
                <Link className={styles.Account} href="/account">
                  compte
                </Link>
              </div>
              <div className={styles.linkSubscription}>
                <Link className={styles.Subscription} href="/subscription">
                  inscription
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <section className={styles.ImgButtonQuiz}>
          {quizzes.length > 0 ? (
            quizzes.map((quiz: Quiz) => (
              <Link
                href={`/quizzes/${quiz.slug}/questions/1/answers`}
                key={quiz.id}
              >
                <img src={quiz.picture} alt={quiz.title} />
              </Link>
            ))
          ) : (
            <p>Aucun quiz disponible pour le moment.</p>
          )}
        </section>
      </div>
    </div>
  );
}
