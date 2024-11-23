import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, update } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const UserProfile = () => {
  const { userId } = useParams(); // Récupérer l'ID utilisateur depuis l'URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Charger les données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setError("Utilisateur introuvable.");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des données.");
      }
    };

    fetchUserData();
  }, [userId]);

  // Gérer la mise à jour des données
  const handleUpdate = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);
      await update(userRef, userData);
      setSuccess("Informations mises à jour avec succès !");
      setEditMode(false);
    } catch (err) {
      setError("Erreur lors de la mise à jour des données.");
    }
  };

  // Envoyer un message
  const handleSendMessage = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}/messages`);
      const updatedMessages = userData.messages || [];
      updatedMessages.push({
        message: newMessage,
        timestamp: Date.now(),
      });
      await update(ref(db, `users/${userId}`), { messages: updatedMessages });
      setSuccess("Message envoyé avec succès !");
      setNewMessage("");
    } catch (err) {
      setError("Erreur lors de l'envoi du message.");
    }
  };

  // Déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Rediriger vers la page de connexion
    } catch (err) {
      setError("Erreur lors de la déconnexion.");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Profil Utilisateur</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-full hover:bg-red-400 transition"
          >
            Déconnexion
          </button>
        </div>

        {/* Messages de succès ou d'erreur */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Section d'affichage et de modification des données utilisateur */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nom</label>
            {editMode ? (
              <input
                type="text"
                value={userData.lastName || ""}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            ) : (
              <p className="p-2 bg-gray-700 rounded">{userData.lastName}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Prénom</label>
            {editMode ? (
              <input
                type="text"
                value={userData.firstName || ""}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            ) : (
              <p className="p-2 bg-gray-700 rounded">{userData.firstName}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <p className="p-2 bg-gray-700 rounded">{userData.email}</p>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Téléphone</label>
            {editMode ? (
              <input
                type="text"
                value={userData.phone || ""}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            ) : (
              <p className="p-2 bg-gray-700 rounded">{userData.phone}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Groupe</label>
            {editMode ? (
              <input
                type="text"
                value={userData.group || ""}
                onChange={(e) =>
                  setUserData({ ...userData, group: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            ) : (
              <p className="p-2 bg-gray-700 rounded">{userData.group}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">École</label>
            {editMode ? (
              <input
                type="text"
                value={userData.school || ""}
                onChange={(e) =>
                  setUserData({ ...userData, school: e.target.value })
                }
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
              />
            ) : (
              <p className="p-2 bg-gray-700 rounded">{userData.school}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          {editMode ? (
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-400 transition"
            >
              Enregistrer
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400 transition"
            >
              Modifier
            </button>
          )}
          {editMode && (
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-400 transition"
            >
              Annuler
            </button>
          )}
        </div>

        {/* Section pour envoyer un message */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Envoyer un message</h2>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none"
            placeholder="Écrivez votre message ici..."
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="mt-4 px-4 py-2 bg-teal-500 rounded hover:bg-teal-400 transition"
          >
            Envoyer
          </button>
        </div>

        {/* Liste des messages existants */}
        {userData.messages && userData.messages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Vos messages</h2>
            <ul className="space-y-4">
              {userData.messages.map((msg, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-700 rounded border border-gray-600"
                >
                  {msg.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;