import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

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
