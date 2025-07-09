import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE \`${MYSQL_DB_NAME}\`;

   CREATE TABLE IF NOT EXISTS Quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL );
  
   CREATE TABLE IF NOT EXISTS Questions (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    question VARCHAR(255) NOT NULL,
    quiz_id INT NOT NULL,
    number INT NOT NULL);

    CREATE TABLE IF NOT EXISTS Answer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL
    slug VARCHAR(255) NOT NULL UNIQUE
  );
`;

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(schema);
    await connection.end();

    console.log("Database schema created successfully");
  } catch (err) {
    console.error("Error during migration:", err);
  }
};

migrate();
