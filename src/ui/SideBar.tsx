"use client";

import styles from "./SideBar.module.css";

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
          &times;
        </button>

        <nav>
          <ul>
            <li>
              <a href="about" onClick={onClose}>
                About
              </a>
            </li>
            <li>
              <a href="contact" onClick={onClose}>
                Contact
              </a>
            </li>
            <li>
              <a href="account" onClick={onClose}>
                Account
              </a>
            </li>
            <li>
              <a href="inscription" onClick={onClose}>
                Subscription
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
