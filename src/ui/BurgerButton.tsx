"use client";

import styles from "./BurgerButton.module.css";

interface ButtonBurgerProps {
  onClick: () => void;
}

export default function ButtonBurger({ onClick }: ButtonBurgerProps) {
  return (
    <button onClick={onClick} className={styles.burger}>
      <img src="/burger-icon.png" alt="Menu" className={styles.icon} />
    </button>
  );
}
