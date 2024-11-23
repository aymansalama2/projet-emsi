import React from 'react';
import { motion } from 'framer-motion';
import v1 from "../assets/v1.mp4"

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={v1} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <motion.div
          className="text-center z-20 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient ">
            Plongez dans l'Univers du Développement Web
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            Apprenez à coder, construisez des applications, et rejoignez une communauté dynamique de développeurs.
          </p>
          <a
            href="#signup"
            className="mt-6 inline-block bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-full shadow-xl transition-all duration-300"
          >
            Rejoignez-nous
          </a>
        </motion.div>
      </section>

      {/* Mission du club */}
      <section id="mission" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gradient ">
            Notre Mission
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Nous offrons un espace pour les passionnés du développement web où vous pouvez apprendre, créer et collaborer.
          </p>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Que vous soyez débutant ou confirmé, notre club vous permet de progresser avec des projets réels et des ateliers pratiques.
          </p>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gradient ">
            Nos Fonctionnalités
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[ 
              {
                title: 'Apprentissage Pratique',
                description: 'Accédez à des ressources pratiques et des défis de codage.',
                icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995576.png',
              },
              {
                title: 'Projets Collaboratifs',
                description: 'Collaborez avec d\'autres développeurs sur des projets concrets.',
                icon: 'https://cdn-icons-png.flaticon.com/512/2913/2913963.png',
              },
              {
                title: 'Technologies Modernes',
                description: 'Apprenez à utiliser des frameworks modernes comme React et Node.js.',
                icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-6 shadow-2xl hover:shadow-3xl transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-indigo-300">{feature.title}</h3>
                <p className="mt-2 text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Événements à venir */}
      <section id="events" className="py-20 bg-gray-900">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gradient ">
            Événements à Venir
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[ 
              {
                title: 'Hackathon Web',
                date: '25 Décembre 2024',
                description: 'Rejoignez notre hackathon pour développer des solutions innovantes avec des technologies modernes.',
              },
              {
                title: 'Atelier React',
                date: '15 Janvier 2025',
                description: 'Apprenez à construire des applications avec React et explorez les dernières pratiques.',
              },
              {
                title: 'Séminaire Node.js',
                date: '5 Février 2025',
                description: 'Venez découvrir Node.js et son utilisation pour créer des applications web performantes.',
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-6 shadow-2xl hover:shadow-3xl transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-indigo-300">{event.title}</h3>
                <p className="mt-2 text-gray-300">{event.date}</p>
                <p className="mt-2 text-gray-300">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-gray-400">
        &copy; 2024 EMSI Dev Squad. Tous droits réservés.
      </footer>
    </div>
  );
};

export default Home;
