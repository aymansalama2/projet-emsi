import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validation des champs
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Connexion Firebase
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      setSuccess("Connexion réussie !");
      setTimeout(() => {
        navigate(`/profile/${auth.currentUser.uid}`); // Redirige vers la page de profil
      }, 1000);
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

        {/* Messages d'erreur et de succès */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block mb-1">Mot de passe</label>
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400 transition"
          >
            Se connecter
          </button>
        </form>

        {/* Lien vers l'inscription */}
        <div className="mt-4 text-center">
          <p>
            Pas encore inscrit ?{" "}
            <a href="/signup" className="text-teal-500 hover:underline">
              Créez un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
