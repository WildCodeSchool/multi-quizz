import Image from "next/image";
import styles from "./page.module.css";
import { appRoutes } from "@/data/ROUTES";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
          <li>
            Now go on{" "}
            <Link className={styles.secondary} href={appRoutes.INFOS}>
              Infos
            </Link>{" "}
            page to test a sample of NextJS app.
          </li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
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
          <Link href="/quiz/">
            <img src="/logoq4.png" alt="logo quiz4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
