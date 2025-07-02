"use client";

import styles from "./ButtonBurger.module.css";

interface ButtonBurgerProps {
  onClick: () => void;
}

export default function ButtonBurger({ onClick }: ButtonBurgerProps) {
  return <button onClick={onClick} className={styles.burger}></button>;
}
