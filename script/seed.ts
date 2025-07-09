import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const listQuizData = [
  {
    id: 1,
    title: "Jeux-Vidéos",
    picture: "logoq1.png",
    slug: "jeux-videos",
  },
  {
    id: 2,
    title: "Films",
    picture: "logoq2.png",
    slug: "films",
  },
  {
    id: 3,
    title: "Culture Générale",
    picture: "logoq3.png",
    slug: "culture-generale",
  },
  {
    id: 4,
    title: "Nouvelles Technologies",
    picture: "logoq4.png",
    slug: "nouvelles-technologies",
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

    for (const { title, picture, slug } of listQuizData) {
      await connection.query(
        "INSERT INTO Quizzes (title, picture, slug) VALUES (?, ?, ?)",
        [title, picture, slug]
      );
    }

    await connection.end();
    console.log("Quizzes seeded!");
  } catch (err) {
    console.error(" Error during seeding:", err);
  }
};

seed();
