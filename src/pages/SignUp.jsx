import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    group: "",
    educationLevel: "",
    school: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phone,
      group,
      educationLevel,
      school,
      password,
    } = formData;

    // Validation des champs
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !group ||
      !educationLevel ||
      !school ||
      !password
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      // Créer un utilisateur avec Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Sauvegarder les données utilisateur dans Firebase Database
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        firstName,
        lastName,
        email,
        phone,
        group,
        educationLevel,
        school,
        userId: user.uid,
      });

      // Réinitialiser le formulaire et afficher le succès
      setSuccess("Inscription réussie !");
      setError("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        group: "",
        educationLevel: "",
        school: "",
        password: "",
      });

      // Rediriger vers la page de profil
      navigate(`/profile/${user.uid}`); // Utiliser navigate avec l'ID utilisateur
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Inscrivez-vous au EMSI Dev Squad
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block mb-1">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre prénom"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre email"
            />
          </div>
          <div>
            <label className="block mb-1">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre téléphone"
            />
          </div>
          <div>
            <label className="block mb-1">Groupe</label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre groupe"
            />
          </div>
          <div>
            <label className="block mb-1">Niveau Scolaire</label>
            <input
              type="text"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre niveau scolaire"
            />
          </div>
          <div>
            <label className="block mb-1">École</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre école"
            />
          </div>
          <div>
            <label className="block mb-1">Mot de Passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              placeholder="Votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-400"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
