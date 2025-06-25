import "dotenv/config";
import mysql from "mysql2/promise";
import { questionsJeux, answersJeux } from "../src/data/videosGames";
import { questionsFilms, answersFilms } from "../src/data/movies";
import { questionsCulture, answersCulture } from "../src/data/culture";
import { questionsTech, answersTech } from "../src/data/tech";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const quizData = [
  { id: 1, title: "Jeux-Vidéos" },
  { id: 2, title: "Films" },
  { id: 3, title: "Culture Générale" },
  { id: 4, title: "Nouvelles Technologies" },
];

const questionsData = [
  ...questionsJeux,
  ...questionsFilms,
  ...questionsCulture,
  ...questionsTech,
];

const answersData = [
  ...answersJeux,
  ...answersFilms,
  ...answersCulture,
  ...answersTech,
];

const seed = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    });

    for (const { id, title } of quizData) {
      await connection.query("INSERT INTO Quizzes (id, title) VALUES (?, ?)", [
        id,
        title,
      ]);
    }

    for (const { id, quiz_id, question } of questionsData) {
      await connection.query(
        "INSERT INTO Questions (id, quiz_id, question) VALUES (?, ?, ?)",
        [id, quiz_id, question]
      );
    }

    for (const { question_id, answer, is_correct } of answersData) {
      await connection.query(
        "INSERT INTO Answer (question_id, answer, is_correct) VALUES (?, ?, ?)",
        [question_id, answer, is_correct]
      );
    }

    await connection.end();
    console.log("Quiz, questions et réponses insérés avec succès !");
  } catch (err) {
    console.error(" Erreur lors du seed:", err);
  }
};

seed();
