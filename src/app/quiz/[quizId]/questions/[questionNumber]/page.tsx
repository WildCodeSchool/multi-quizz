"use Client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const QuestionPage = () => {
  const router = useRouter();

  // TypeScript peut parfois avoir besoin d'aide pour savoir que quizId et questionNumber
  // seront bien des chaînes de caractères (string).
  // On récupère ce que le détective a trouvé dans l'adresse :
  const { quizId, questionNumber } = router.query;

  // On se souvient de la petite précaution : et si le détective n'a pas encore fini ?
  // On affiche un petit message "Chargement..."
  // 'quizId' et 'questionNumber' seront undefined au premier rendu côté client
  // tant que les paramètres de l'URL ne sont pas encore prêts.
  if (!quizId || !questionNumber) {
    return <p>Chargement des informations de la question...</p>;
  }

  // Si le détective a trouvé les infos, alors on les affiche !
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Bienvenue sur la page de la Question du Quiz !</h1>
      <p>
        L'**ID du Quiz** est :{" "}
        <span style={{ fontWeight: "bold", color: "#0070f3" }}>{quizId}</span>
      </p>
      <p>
        Le **Numéro de la Question** est :{" "}
        <span style={{ fontWeight: "bold", color: "#1a1a1a" }}>
          {questionNumber}
        </span>
      </p>

      <hr style={{ margin: "30px 0" }} />

      <section>
        <h2>Prochaine étape : Afficher la question réelle</h2>
        <p>
          Pour l'instant, tu vois juste l'ID du quiz et le numéro de la
          question. La prochaine étape sera de récupérer le texte de la question
          et ses options depuis ta base de données.
        </p>
      </section>
    </div>
  );
};

// C'est important d'exporter ton composant pour que Next.js puisse l'utiliser comme page
export default QuestionPage;
