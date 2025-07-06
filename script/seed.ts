import "dotenv/config";
import mysql from "mysql2/promise";
import { questionsJeux } from "../src/data/videosGames";
import { questionsFilms } from "../src/data/movies";
import { questionsCulture } from "../src/data/culture";
import { questionsTech } from "../src/data/tech";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const questionsData = [
  ...questionsJeux,
  ...questionsFilms,
  ...questionsCulture,
  ...questionsTech,
];

const seed = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    });

    for (const { id, quiz_id, question } of questionsData) {
      await connection.query(
        "INSERT INTO Questions (id, quiz_id, question) VALUES (?, ?, ?)",
        [id, quiz_id, question]
      );
    }

    await connection.end();
    console.log("Quiz, questions et réponses insérés avec succès !");
  } catch (err) {
    console.error(" Erreur lors du seed:", err);
  }
};

seed();
