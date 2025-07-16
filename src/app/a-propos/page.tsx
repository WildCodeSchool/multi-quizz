import Home from "../page";
import style from "./page.module.css";

export default function About() {
  return (
    <div className={style.about}>
      <div className={style.text}>
        <h1>Les Dev du Jour J</h1>
        <p>
          Voyez-vous, ce n'est pas juste une équipe, c'est… comment dire… une
          confrérie.
          <br />
          Une confrérie de… de… de vaillants abrutis, si vous me passez
          l'expression.
          <br />
          Des gars qui, malgré leurs… disons… limitations,
          <br />
          se jettent dans la bataille de la présentation
          <br />
          avec un courage… un courage… inconscient, dirons-nous.
          <br />
          Ils y vont, tête baissée, comme des sangliers sur un chariot,
          <br />
          et ils espèrent… ils espèrent vaguement que ça va bien se passer.
          <br />
          C'est… c'est touchant, en fait.
          <br />
          Un peu comme voir un poulet essayer de traverser une route à
          contresens.
          <br />
          Mais bon, ils y mettent du cœur, c'est l'essentiel.
        </p>
      </div>
      <button className={style.btn}>Accueil</button>
    </div>
  );
}
