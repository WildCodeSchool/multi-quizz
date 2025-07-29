import styles from "./game_over.module.css";
import Link from "next/link";

export default function Congratulation() {
  return (
    <>
      <div className={styles.backgroundImage}></div>

      <img
        className={styles.Image_game_over}
        src="/game_over.png"
        alt="logo game over"
      />
      <img className={styles.image_loose} src="/loose.png" alt="logo trophy" />

      <div className={styles.btn_Container}>
        <Link href="/">
          <button className={styles.btn}>Suivant</button>
        </Link>
      </div>
    </>
  );
}
