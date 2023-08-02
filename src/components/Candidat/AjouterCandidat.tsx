/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useCandidat from "../../custom hooks/useCandidat";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../hook-form/formSchemaCandidat";
import Competence from "../../entities/competence";
import { z } from "zod";

const AjouterCandidat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const [candidat, setCandidat] = useCandidat();

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "competences" && e.target instanceof HTMLSelectElement) {
      const selectedCompetences = Array.from(
        e.target.selectedOptions,
        (option) => ({
          id: Number(option.value), // Assuming option value is the ID
          nom: option.text,
        })
      );

      setCandidat((prevCandidat) => ({
        ...prevCandidat,
        competences: selectedCompetences,
      }));
    } else {
      // Here, value needs to be cast to the appropriate type if needed
      setCandidat((prevCandidat) => ({
        ...prevCandidat,
        [name]: value,
      }));
    }
  };
  type FormData = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    axios
      .post("http://localhost:8080/api/cv", data)
      .then(() => navigate("/consulterCandidats"))
      .catch((error: Error) => {
        console.error("An error occurred:", error);
      });
  };

  const [listeCompetence, setListeCompetences] = useState<Competence[]>([]);
  useEffect(() => {
    axios
      .get<Competence[]>("http://localhost:8080/api/competences")
      .then((response) => {
        setListeCompetences(response.data);
      })
      .catch((error) => {
        console.error("Error fetching competences:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ajouter candidat</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                {...register("nom")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le nom"
                name="nom"
                id="nom"
                value={candidat.nom}
                onChange={onInputChange}
              />
              {errors.nom && (
                <p className="text-danger">{errors.nom.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prénom
              </label>
              <input
                {...register("prenom")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le prénom"
                name="prenom"
                value={candidat.prenom}
                id="prenom"
                onChange={onInputChange}
              />
              {errors.prenom && (
                <p className="text-danger">{errors.prenom.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                {...register("age", { valueAsNumber: true })}
                required
                type="number"
                className="form-control"
                placeholder="Entrer l'âge"
                name="age"
                value={candidat.age !== null ? candidat.age : ""}
                id="age"
                onChange={onInputChange}
              />
              {errors.age && (
                <p className="text-danger">{errors.age.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="sexe" className="form-label">
                Sexe
              </label>
              <select
                {...register("sexe")}
                className="form-control"
                name="sexe"
                id="sexe"
                value={candidat.sexe}
                onChange={onInputChange}
              >
                <option value="">Sélectionner le sexe</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
              {errors.sexe && (
                <p className="text-danger">{errors.sexe.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="adresse" className="form-label">
                Adresse
              </label>
              <input
                {...register("adresse")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer l'adresse"
                name="adresse"
                id="adresse"
                value={candidat.adresse}
                onChange={onInputChange}
              />
              {errors.adresse && (
                <p className="text-danger">{errors.adresse.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="numTelephone" className="form-label">
                Numéro de téléphone
              </label>
              <input
                {...register("numTelephone")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le numéro de téléphone"
                name="numTelephone"
                id="numTelephone"
                value={
                  candidat.numTelephone !== null ? candidat.numTelephone : ""
                }
                onChange={onInputChange}
              />
              {errors.numTelephone && (
                <p className="text-danger">{errors.numTelephone.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer l'email"
                name="email"
                id="email"
                value={candidat.email}
                onChange={onInputChange}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="competences" className="form-label">
                Compétences
              </label>
              <select
                {...register("competences")}
                multiple
                className="form-control"
                name="competences"
                id="competences"
                onChange={onInputChange}
              >
                {listeCompetence.map((competence) => (
                  <option key={competence.id} value={competence.nom}>
                    {competence.nom}
                  </option>
                ))}
              </select>
              {errors.competences && (
                <p className="text-danger">{errors.competences.message}</p>
              )}
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button type="submit" className="btn btn-success mx-2">
                Ajouter
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/consulterCandidats")}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterCandidat;
