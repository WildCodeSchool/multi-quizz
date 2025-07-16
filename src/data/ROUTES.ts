const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const apiRoutes = {
  INFOS: `${apiUrl}/api/infos`,
  QUESTION: (quizId: number, questionNumber: number) =>
    `${apiUrl}/api/quizzes/${quizId}/questions/${questionNumber}`,
  ANSWERS: (quizId: number, questionNumber: number) =>
    `${apiUrl}/api/quizzes/${quizId}/questions/${questionNumber}/answers`,
  QUIZZES: `${apiUrl}/api/quizzes`,
};

const appRoutes = {
  INFOS: `${appUrl}/infos`,
  INFOS_ID: (id: number) => `${appUrl}/infos/${id}`,
  INFOS_ADD: `${appUrl}/infos/ajouter-info`,
  INFOS_EDIT: (id: number) => `${appUrl}/infos/${id}/editer-info`,

  QUESTIONS_NUMBER: (quizId: number, questionNumber: number) =>
    `${appUrl}/quizzes/${quizId}/questions/${questionNumber}`,

  ANSWERS: (quizId: number, questionNumber: number) =>
    `${appUrl}/quizzes/${quizId}/questions/${questionNumber}/answers`,

  QUIZ: `${appUrl}/quiz`,
  QUIZ_ID: (id: number) => `${appUrl}/quiz/${id}`,
  QUIZ_ADD: `${appUrl}/quiz/ajouter-quiz`,
  QUIZ_EDIT: (id: number) => `${appUrl}/quiz/${id}/editer-quiz`,
};

export { apiRoutes, appRoutes };
