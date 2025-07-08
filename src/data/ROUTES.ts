const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const apiRoutes = {
  INFOS: `${apiUrl}/api/infos`,
  QUESTION: (quizId: number, questionNumber: number) =>
    `${apiUrl}/api/quizzes/${quizId}/questions/${questionNumber}`,
  QUIZ: `${apiUrl}/api/quizz`,
  ANSWERS: `${apiUrl}/api/answers`,
};

const appRoutes = {
  INFOS: `${appUrl}/infos`,
  INFOS_ID: (id: number) => `${appUrl}/infos/${id}`,
  INFOS_ADD: `${appUrl}/infos/ajouter-info`,
  INFOS_EDIT: (id: number) => `${appUrl}/infos/${id}/editer-info`,

  QUESTIONS_NUMBER: (quizId: number, questionNumber: number) =>
    `${appUrl}/quizzes/${quizId}/questions/${questionNumber}`,

  QUIZ: `${appUrl}/quiz`,
  QUIZ_ID: (id: number) => `${appUrl}/quiz/${id}`,
  QUIZ_ADD: `${appUrl}/quiz/ajouter-quiz`,
  QUIZ_EDIT: (id: number) => `${appUrl}/quiz/${id}/editer-quiz`,

  ANSWERS: `${appUrl}/answers`,
  ANSWERS_ADD: `${appUrl}/answers/ajouter-reponse`,
  ANSWERS_EDIT: (id: number) => `${appUrl}/answers/${id}/editer-reponse`,
};

export { apiRoutes, appRoutes };
