import { apiRoutes } from "@/data/ROUTES";

export async function postContact(email: string, message: string) {
  const res = await fetch(apiRoutes.CONTACT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, message }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'envoi du message");
  return res.json();
}
