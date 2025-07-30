"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { apiRoutes } from "@/data/ROUTES";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    setErrors({});
    setSuccessMessage("");

    const validationErrors: { email?: string; message?: string } = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      validationErrors.email = "Email invalide";
    }
    if (!message.trim()) {
      validationErrors.message = "Le message est obligatoire";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(apiRoutes.CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ email, message: data.error });
        return;
      }

      setSuccessMessage("Votre message a bien été envoyé !");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErrors({ email, message: "Erreur serveur" });
    }
  };

  return (
    <div>
      <div>
        <Link href="/" className={styles.btn}>
          Accueil
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.contactContainer}>
        <h2>CONTACT</h2>
        <section className={styles.form}>
          <label className={styles.label} htmlFor="email">
            Votre Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            placeholder="Votre email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </section>
        <section className={styles.form}>
          <label className={styles.label} htmlFor="message">
            Votre message à notre équipe
          </label>
          <textarea
            className={styles.textarea}
            id="message"
            value={message}
            placeholder="Votre message"
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message && (
            <p className={styles.errorMessage}>{errors.message}</p>
          )}
        </section>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <button className={styles.buttonSubmit} type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}
