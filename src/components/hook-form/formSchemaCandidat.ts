import { z } from "zod";

export const schema = z.object({
    email: z.string().email(),
    sexe: z
      .string()
      .refine((value) => ["Homme", "Femme", "Autre"].includes(value), {
        message: "Veuillez choisir une option valide ('Homme', ou bien 'Femme').",
      }),
    nom: z.string().min(3).max(20).nonempty(),
    prenom: z.string().min(3).max(20).nonempty(),
    age: z.number().int().min(18).max(65),
    adresse: z.string().min(3).max(50).nonempty(),
    numTelephone: z
      .string()
      .refine((value) => value.length === 8 && /^\d+$/.test(value), {
        message: "Le numéro de téléphone doit contenir exactement 8 chiffres.",
      }),
    competences: z
      .array(z.string())
      .min(1, "Veuillez sélectionner au moins une compétence."),
  });