import Link from "next/link";
import styles from "./page.module.css";
import { getAllQuizzes } from "@/lib/getAllQuizzes";
import { QuizModel } from "@/model/QuizModel";

export default async function Home() {
  const quizzes: QuizModel[] = await getAllQuizzes();

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <nav className={styles.navContent}>
            <div className={styles.linkLeft}>
              <div className={styles.linkAbout}>
                <Link className={styles.About} href="/a-propos">
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
                <Link className={styles.Account} href="/compte">
                  compte
                </Link>
              </div>
              <div className={styles.linkSubscription}>
                <Link className={styles.Subscription} href="/inscription">
                  inscription
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <section className={styles.ImgButtonQuiz}>
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <Link href={`/quizzes/${quiz.id}/questions/1`} key={quiz.id}>
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
