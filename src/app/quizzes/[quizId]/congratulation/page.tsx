import styles from "./congratulation.module.css";
import Link from "next/link";

export default function Congratulation() {
  return (
    <>
      <div className={styles.backgroundImage}></div>

      <img
        className={styles.Image_congratulation}
        src="/congratulation.png"
        alt="logo congratulation"
      />
      <img
        className={styles.image_Trophy}
        src="/trophy.png"
        alt="logo trophy"
      />

      <div className={styles.btn_Container}>
        <Link href="/">
          <button className={styles.btn}>Suivant</button>
        </Link>
      </div>
    </>
  );
}
