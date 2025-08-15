import React from "react";
import { ArrowRight } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gray-800 py-20 px-6 text-center rounded-b-3xl shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Benvenuto su <span className="text-blue-500">MaracujaRP</span>
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto mb-6">
          Vivi l’esperienza definitiva di Minecraft Roleplay italiano, esplora
          il mondo, interagisci con la community e divertiti.
        </p>
        <a
          href="/store"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Visita lo Store <ArrowRight className="h-5 w-5" />
        </a>
      </section>

      {/* Features Section */}
      <section className="px-6 mb-12">
        <h2 className="text-2xl font-bold mb-6">Cosa Ti Aspetta</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6 hover:shadow-lg transition flex flex-col"
            >
              <div className="h-40 bg-gray-700 rounded-md mb-4 flex items-center justify-center text-gray-400">
                Immagine {item}
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">
                Titolo Funzione {item}
              </h3>
              <p className="text-gray-300 flex-1">
                Descrizione breve della funzione o feature del server, scritta
                in modo chiaro e accattivante.
              </p>
              <button className="mt-4 self-start px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition">
                Scopri di più
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 py-12 text-center rounded-3xl mx-6 mb-12 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Unisciti a MaracujaRP oggi!</h2>
        <p className="text-gray-300 mb-6">
          Entra nel miglior server Minecraft Roleplay italiano e scopri
          avventure uniche insieme alla community.
        </p>
        <a
          href="/store"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Visita lo Store <ArrowRight className="h-5 w-5" />
        </a>
      </section>
    </div>
  );
};

export default HomePage;
