import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Assurez-vous d'importer correctement Firebase
import { getDatabase, ref, get, push, remove } from "firebase/database"; // Utilisez Realtime Database
import { signOut } from "firebase/auth"; // Importez la fonction de déconnexion
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUsersWithMessages, setShowUsersWithMessages] = useState(false);
  const navigate = useNavigate();

  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const dbRef = ref(getDatabase(), "users"); // Référence à la base de données Realtime
      const snapshot = await get(dbRef); // Récupérer les données de la base de données
      if (snapshot.exists()) {
        const usersList = [];
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val(); // Données de chaque utilisateur
          usersList.push({ ...userData, id: childSnapshot.key }); // Ajoutez les utilisateurs à la liste
        });
        setUsers(usersList); // Mettre à jour l'état avec la liste des utilisateurs
      } else {
        console.log("Aucun utilisateur trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour envoyer un message à tous les utilisateurs
  const sendMessage = async () => {
    if (!message) {
      alert("Veuillez entrer un message.");
      return;
    }
    try {
      const messageRef = ref(getDatabase(), "adminMessages"); // Référence à la collection "adminMessages"
      await push(messageRef, { // Utilisation de push pour ajouter un message sans écraser les autres
        text: message,
        sentBy: auth.currentUser.email,
        timestamp: new Date().toISOString(),
      });
      setMessage(""); // Réinitialiser le message après envoi
      alert("Message envoyé !");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      alert("Erreur lors de l'envoi du message : " + error.message);
    }
  };

  // Fonction pour supprimer un message
  

  // Fonction pour afficher uniquement les utilisateurs ayant envoyé des messages
  const filteredUsers = showUsersWithMessages
    ? users.filter((user) => user.messages && Object.values(user.messages).length > 0)
    : users;

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige vers la page d'accueil après la déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
      alert("Erreur lors de la déconnexion : " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* Section de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="p-2 rounded bg-gray-700 text-white w-full sm:w-80"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Button to toggle display of users with messages */}
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={() => setShowUsersWithMessages(!showUsersWithMessages)}
      >
        {showUsersWithMessages ? "Afficher tous les utilisateurs" : "Afficher les utilisateurs avec messages"}
      </button>

      {/* Table des utilisateurs */}
      <h2 className="text-2xl mb-4">Liste des utilisateurs</h2>
      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-lg">
          <table className="min-w-full table-auto text-sm text-left text-gray-200">
            <thead className="bg-gray-600">
              <tr>
                <th className="p-3">Prénom</th>
                <th className="p-3">Nom</th>
                <th className="p-3">Email</th>
                <th className="p-3">Téléphone</th>
                <th className="p-3">Groupe</th>
                <th className="p-3">Niveau Scolaire</th>
                <th className="p-3">École</th>
                <th className="p-3">Message</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-600 hover:bg-gray-600">
                  <td className="p-3">{user.firstName || "Prénom inconnu"}</td>
                  <td className="p-3">{user.lastName || "Nom inconnu"}</td>
                  <td className="p-3">{user.email || "Email inconnu"}</td>
                  <td className="p-3">{user.phone || "Téléphone inconnu"}</td>
                  <td className="p-3">{user.group || "Groupe inconnu"}</td>
                  <td className="p-3">{user.educationLevel || "Niveau inconnu"}</td>
                  <td className="p-3">{user.school || "École inconnue"}</td>
                  <td className="p-3">
                    {user.messages && Object.values(user.messages).length > 0
                      ? Object.values(user.messages).map((msg, index) => (
                          <div key={index} className="flex items-center">
                            <span>{msg.message || "Message inconnu"}</span>
                            
                          </div>
                        ))
                      : "Aucun message"}
                  </td>
                  <td className="p-3">
                    {/* Additional actions */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Aucun utilisateur trouvé.</p>
      )}

      {/* Section d'envoi de message */}
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Envoyer un message à tous les utilisateurs</h2>
        <textarea
          rows="4"
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Écrivez votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
          onClick={sendMessage}
        >
          Envoyer le message
        </button>
      </div>

      {/* Section de déconnexion */}
      <div className="mt-8">
        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
