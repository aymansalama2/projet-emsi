import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Assurez-vous d'importer correctement Firebase
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth"; // Importez la fonction de déconnexion

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = async () => {
    const usersCollection = collection(db, "users"); // Assurez-vous que vous utilisez la bonne collection Firebase
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setUsers(userList);
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
    const messageRef = collection(db, "adminMessages");
    await addDoc(messageRef, {
      text: message,
      sentBy: auth.currentUser.email,
      timestamp: new Date().toISOString(),
    });
    setMessage("");
    alert("Message envoyé !");
  };

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Déconnexion réussie");
    } catch (error) {
      alert("Erreur lors de la déconnexion");
    }
  };

  // Fonction de recherche
  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* Section de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des utilisateurs */}
      <h2 className="text-2xl mb-4">Utilisateurs</h2>
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li key={user.id} className="bg-gray-700 p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>

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
