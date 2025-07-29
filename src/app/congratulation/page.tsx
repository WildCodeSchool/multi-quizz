import styles from "./congratulation.module.css";

export default function Congratulation() {
  return (
    <>
      <div className={styles.backgroundImage}></div>

      <div className={styles.content}>
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
      </div>
    </>
  );
}
