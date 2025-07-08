import "dotenv/config";
import mysql from "mysql2/promise";
import { answersJeux, questionsJeux } from "../src/data/videosGames";
import { answersFilms, questionsFilms } from "../src/data/movies";
import { questionsCulture, answersCulture } from "../src/data/culture";
import { questionsTech, answersTech } from "../src/data/tech";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

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

const listQuizData = [
  {
    id: 1,
    title: "Jeux-Vidéos",
    picture:
      "public/Gemini_Generated_Image_g0hvfig0hvfig0hv-removebg-preview 1.png",
    slug: "jeux-videos",
  },
  {
    id: 2,
    title: "Films",
    picture:
      "public/Gemini_Generated_Image_g0hvfjg0hvfjg0hv-removebg-preview 1.png",
    slug: "films",
  },
  {
    id: 3,
    title: "Culture Générale",
    picture:
      "public/Gemini_Generated_Image_63nijt63nijt63ni-removebg-preview 1.png",
    slug: "culture generale",
  },
  {
    id: 4,
    title: "Nouvelles Technologies",
    picture:
      "public/Gemini_Generated_Image_g0hvfhg0hvfhg0hv-removebg-preview 1.png",
    slug: "nouvelles technologies",
  },
];

const seed = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    });

    for (const { id, quiz_id, question, number } of questionsData) {
      await connection.query(
        "INSERT INTO Questions (id, quiz_id, question, number) VALUES (?, ?, ?, ?)",
        [id, quiz_id, question, number]
      );
    }

    for (const { title, picture, slug } of listQuizData) {
      await connection.query(
        "INSERT INTO Quizzes (title, picture, slug) VALUES (?, ?, ?)",
        [title, picture, slug]
      );
    }

    for (const { question_id, answer, is_correct } of answersData) {
      await connection.query(
        "INSERT INTO Answers (questionId, answer, is_correct) VALUES (?, ?, ?)",
        [question_id, answer, is_correct]
      );
    }

    await connection.end();
    console.log("Quizzes seeded!");
  } catch (err) {
    console.error(" Error during seeding:", err);
  }
};

seed();
