import style from "./page.module.css";
import Link from "next/link";

export default function About() {
  return (
    <div className={style.about}>
      <Link href="/">
        <button className={style.btn}>Accueil</button>
      </Link>
      <h1 className={style.title}>Les Devs du Jour J</h1>

      <section className={style.mainContent}>
        <section className={style.textSection}>
          <div className={style.text}>
            <p>
              Voyez-vous, ce n'est pas juste une équipe, c'est... comment
              dire... une confrérie.
              <br />
              Une confrérie de... de... de vaillants abrutis, si vous me passez
              l'expression.
              <br />
              Des gars qui, malgré leurs... disons... limitations,
              <br />
              se jettent dans la bataille de la présentation
              <br />
              avec un courage... un courage... inconscient, dirons-nous.
              <br />
              Ils y vont, tête baissée, comme des sangliers sur un chariot,
              <br />
              et ils espèrent... ils espèrent vaguement que ça va bien se
              passer.
              <br />
              C'est... c'est touchant, en fait.
              <br />
              Un peu comme voir un poulet essayer de traverser une route à
              contresens.
              <br />
              Mais bon, ils y mettent du coeur, c'est l'essentiel.
            </p>
          </div>

          <section className={style.avatars}>
            <a
              href="https://github.com/ChrisG-WCS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://avatars.githubusercontent.com/u/201600440?v=4"
                alt="Chris"
                className={style.avatar}
              />
            </a>
            <a
              href="https://github.com/MrLuffy59"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://avatars.githubusercontent.com/u/201595777?v=4"
                alt="Damien"
                className={style.avatar}
              />
            </a>
          </section>
        </section>
      </section>

      <section className={style.knightContainer}>
        <img src="/knights.png" alt="Knight" className={style.knight} />
      </section>
    </div>
  );
}
