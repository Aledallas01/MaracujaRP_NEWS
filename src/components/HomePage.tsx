import React from "react";
import { ArrowRight } from "lucide-react";

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
    {/* Hero */}
    <section
      className="flex-1 flex flex-col justify-center items-center text-center px-6"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        SERVER MINECRAFT <br /> ROLEPLAY ITALIANO
      </h1>
      <p className="text-xl text-gray-200 max-w-2xl mb-8 drop-shadow-md">
        Vivi una nuova esperienza di gioco con MaracujaRP: esplora, crea e
        interagisci in un mondo ricco di avventure e opportunità.
      </p>
      <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FE9900] hover:bg-blue-700 rounded-lg text-white text-lg font-semibold transition">
        GIOCA <ArrowRight className="h-6 w-6" />
      </button>
    </section>

    {/* Info Section */}
    <section className="py-16 px-6 space-y-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Vivi una nuova esperienza</h2>
        <p className="text-gray-300">
          Esplora le Isole Canarie, crea il tuo personaggio, frequenta corsi,
          trova un lavoro, costruisci il tuo impero o decidi tra law & crime.
        </p>
      </div>

      {/* Crime vs Police */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Crime</h3>
          <p className="text-gray-300">
            Gang, pirati o mafia: scegli il lato oscuro del roleplay.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Police</h3>
          <p className="text-gray-300">
            Difendi la legge: Polizia, Carabinieri, GdF e tanto altro.
          </p>
        </div>
      </div>
    </section>

    {/* How to join */}
    <section className="py-16 px-6 bg-gray-800 rounded-t-3xl">
      <h2 className="text-3xl font-bold text-center mb-8">Come Entrare</h2>
      <ol className="max-w-xl mx-auto list-decimal list-inside text-gray-200 space-y-4">
        <li>Apri Minecraft Java Edition (v1.19.4+).</li>
        <li>Clicca su Multigiocatore → Aggiungi server.</li>
        <li>Inserisci play.maracujarp.it e attiva le Pack.</li>
        <li>Leggi il regolamento prima di entrare in gioco.</li>
      </ol>
    </section>
  </div>
);

export default HomePage;
