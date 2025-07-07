"use client";

import styles from "./Sidebar.module.css";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <aside className={styles.sidebar}>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src="/retour.png" alt="retour" className={styles.icon} />
        </button>

        <nav className={styles.sidebarNavContent}>
          <ul className={styles.sidebarUl}>
            <li className={styles.about}>
              <Link href="/about" onClick={onClose}>
                À propos
              </Link>
            </li>
            <li className={styles.contact}>
              <Link href="/contact" onClick={onClose}>
                Contact
              </Link>
            </li>
            <li className={styles.account}>
              <Link href="/compte" onClick={onClose}>
                Compte
              </Link>
            </li>
            <li className={styles.subscription}>
              <Link href="/inscription" onClick={onClose}>
                Inscription
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
