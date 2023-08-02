import { z } from "zod";


export const schema = z.object({
    username: z.string().min(3).max(20).nonempty(),
  password: z.string().min(3).max(20).nonempty(),
  email: z.string().email(),
  sexe: z
    .string()
    .refine((value) => ["Homme", "Femme", "Autre"].includes(value), {
      message: "Veuillez choisir une option valide ('Homme', ou bien 'Femme').",
    }),
  job: z
    .string()
    .refine(
      (value) =>
        [
          "Développeur Backend",
          "Développeur Frontend",
          "Développeur Fullstack",
          "Ressources Humaines",
          "Comptable",
          "Spécialiste Marketing",
          "Designer Graphique",
          "Chef de Projet",
          "Représentant Commercial",
          "Analyste de Données",
          "Responsable des Ressources Humaines",
          "Responsable Informatique",
        ].includes(value),
      {
        message: "Veuillez choisir une option valide.",
      }
    ),
  nom: z.string().min(3).max(20).nonempty(),
  prenom: z.string().min(3).max(20).nonempty(),
  age: z.number().int().min(18).max(65),
  salaire: z
    .number({ invalid_type_error: "Entrer le salaire" })
    .min(500)
    .max(5000),
  departement: z.string().min(3).max(20).nonempty(),
  cin: z.string().refine((value) => value.length === 8 && /^\d+$/.test(value), {
    message: "Le CIN doit contenir exactement 8 chiffres.",
  }),

  cnss: z.string().regex(/^\d{6,10}$/, {
    message: "Le CNSS doit contenir entre 6 et 10 chiffres.",
  }),
  adresse: z.string().min(3).max(50).nonempty(),
  etatSocial: z
    .string()
    .refine(
      (value) => ["Célibataire", "Marié(e)", "Divorcé(e)"].includes(value),
      {
        message:
          "Veuillez choisir une option valide ('Célibataire', 'Marié(e)' ou bien 'Divorcé(e)').",
      }
    ),
  matricule: z.string().regex(/^\d{6,10}$/, {
    message: "Le matricule doit contenir entre 6 et 10 chiffres.",
  }),
  numeroTelephone: z
    .string()
    .refine((value) => value.length === 8 && /^\d+$/.test(value), {
      message: "Le numéro de téléphone doit contenir exactement 8 chiffres.",
    }),
  roles: z.string().refine((value) => ["Admin", "Employé"].includes(value), {
    message: "Veuillez choisir une option valide ('Admin' ou bien 'Employé').",
  }),
  competences: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins une compétence."),
});
