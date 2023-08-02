/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useEmployee from "../../custom hooks/useEmployee";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../hook-form/formSchemaEmployee";
import Role from "../../entities/role";
import Competence from "../../entities/competence";
import { z } from "zod";

const AjouterEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const [employee, setEmployee] = useEmployee();
  const [error, setError] = useState("");

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "company") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        company: { name: value },
      }));
    } else if (
      name === "competences" &&
      e.target instanceof HTMLSelectElement
    ) {
      const selectedCompetences = Array.from(
        e.target.selectedOptions,
        (option) => ({
          id: Number(option.value), // Assuming option value is the ID
          nom: option.text,
        })
      );
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        competences: selectedCompetences,
      }));
    } else if (name === "roles") {
      // New condition for handling roles
      const selectedRole = roles.find((role) => role.nom === value);
      if (selectedRole != undefined) {
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          role: selectedRole,
        }));
      }
    } else if (name === "username") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        login: {
          ...prevEmployee.login,
          username: value,
        },
      }));
    } else if (name === "password") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        login: {
          ...prevEmployee.login,
          password: value,
        },
      }));
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };

  type FormData = z.infer<typeof schema>;

  const onSubmit = () => {
    //e.preventDefault();
    // Create an object containing both employee and login data
    const employeeData = {
      ...employee,
      login: {
        username: employee.login.username,
        password: employee.login.password,
      },
    };
    console.log(employeeData);
    axios
      .post("http://localhost:8080/api/employee", employeeData)
      .then(() => navigate("/listeEmployes"))
      .catch((error: Error) => setError(error.message));
  };

  const [listeCompetence, setListeCompetences] = useState<Competence[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchCompetences();
    fetchRoles();
  }, []);

  const fetchCompetences = () => {
    axios
      .get<Competence[]>("http://localhost:8080/api/competences")
      .then((response) => {
        setListeCompetences(response.data);
      })
      .catch((error) => {
        console.error("Error fetching competences:", error);
      });
  };

  const fetchRoles = () => {
    axios
      .get<Role[]>("http://localhost:8080/api/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching competences:", error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ajouter employé</h2>
          {<p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Employee details */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nom d'utilisateur
              </label>
              <input
                {...register("username")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le nom d'utilisateur"
                name="username"
                id="username"
                value={employee.login.username}
                onChange={onInputChange}
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                {...register("password")}
                required
                type="password"
                className="form-control"
                placeholder="Entrer le mot de passe"
                name="password"
                id="password"
                value={employee.login.password}
                onChange={onInputChange}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
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
                value={employee.nom}
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
                value={employee.prenom}
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
                value={employee.age !== null ? employee.age : ""}
                id="age"
                onChange={onInputChange}
              />
              {errors.age && (
                <p className="text-danger">{errors.age.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="job" className="form-label">
                Emploi
              </label>
              <select
                {...register("job")}
                className="form-control"
                name="job"
                id="job"
                value={employee.job}
                onChange={onInputChange}
              >
                <option value="">Sélectionner l'emploi</option>
                <option value="Développeur Backend">Développeur Backend</option>
                <option value="Développeur Frontend">
                  Développeur Frontend
                </option>
                <option value="Développeur Fullstack">
                  Développeur Fullstack
                </option>
                <option value="Ressources Humaines">Ressources Humaines</option>
                <option value="Comptable">Comptable</option>
                <option value="Spécialiste Marketing">
                  Spécialiste Marketing
                </option>
                <option value="Designer Graphique">Designer Graphique</option>
                <option value="Chef de Projet">Chef de Projet</option>
                <option value="Représentant Commercial">
                  Représentant Commercial
                </option>
                <option value="Analyste de Données">Analyste de Données</option>
                <option value="Responsable des Ressources Humaines">
                  Responsable des Ressources Humaines
                </option>
                <option value="Responsable Informatique">
                  Responsable Informatique
                </option>
              </select>
              {errors.job && (
                <p className="text-danger">{errors.job.message}</p>
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
                value={employee.sexe}
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
              <label htmlFor="salaire" className="form-label">
                Salaire
              </label>
              <input
                {...register("salaire", { valueAsNumber: true })}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le salaire"
                name="salaire"
                id="salaire"
                value={employee.salaire !== null ? employee.salaire : ""}
                onChange={onInputChange}
              />
              {errors.salaire && (
                <p className="text-danger">{errors.salaire.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="departement" className="form-label">
                Département
              </label>
              <input
                {...register("departement")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le département"
                name="departement"
                id="departement"
                value={employee.departement}
                onChange={onInputChange}
              />
              {errors.departement && (
                <p className="text-danger">{errors.departement.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="cin" className="form-label">
                CIN
              </label>
              <input
                {...register("cin")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le CIN"
                name="cin"
                id="cin"
                value={employee.cin !== null ? employee.cin : ""}
                onChange={onInputChange}
              />
              {errors.cin && (
                <p className="text-danger">{errors.cin.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="cnss" className="form-label">
                CNSS
              </label>
              <input
                {...register("cnss")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le CNSS"
                name="cnss"
                id="cnss"
                value={employee.cnss !== null ? employee.cnss : ""}
                onChange={onInputChange}
              />
              {errors.cnss && (
                <p className="text-danger">{errors.cnss.message}</p>
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
                value={employee.adresse}
                onChange={onInputChange}
              />
              {errors.adresse && (
                <p className="text-danger">{errors.adresse.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="etatSocial" className="form-label">
                Etat Social
              </label>
              <select
                {...register("etatSocial")}
                className="form-control"
                name="etatSocial"
                id="etatSocial"
                value={employee.etatSocial}
                onChange={onInputChange}
              >
                <option value="">Sélectionner l'état social</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
              </select>
              {errors.etatSocial && (
                <p className="text-danger">{errors.etatSocial.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="matricule" className="form-label">
                Matricule
              </label>
              <input
                {...register("matricule")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le matricule"
                name="matricule"
                id="matricule"
                value={employee.matricule !== null ? employee.matricule : ""}
                onChange={onInputChange}
              />
              {errors.matricule && (
                <p className="text-danger">{errors.matricule.message}</p>
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
                value={employee.email}
                onChange={onInputChange}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="numeroTelephone" className="form-label">
                Numéro de téléphone
              </label>
              <input
                {...register("numeroTelephone")}
                required
                type="text"
                className="form-control"
                placeholder="Entrer le numéro de téléphone"
                name="numeroTelephone"
                id="numeroTelephone"
                value={
                  employee.numeroTelephone !== null
                    ? employee.numeroTelephone
                    : ""
                }
                onChange={onInputChange}
              />
              {errors.numeroTelephone && (
                <p className="text-danger">{errors.numeroTelephone.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="roles" className="form-label">
                Role
              </label>
              <select
                {...register("roles")}
                className="form-control"
                name="roles"
                id="roles"
                onChange={onInputChange}
              >
                <option value="">Sélectionner un rôle</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nom}>
                    {role.nom}
                  </option>
                ))}
              </select>
              {errors.roles && (
                <p className="text-danger">{errors.roles.message}</p>
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
                onClick={() => navigate("/home")}
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

export default AjouterEmployee;
