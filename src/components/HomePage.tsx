import React from "react";
import { ArrowRight } from "lucide-react";

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
    {/* Hero */}
    <section
      className="flex-1 flex flex-col justify-center items-center text-center px-6 py-24 relative"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          SERVER MINECRAFT <br /> ROLEPLAY ITALIANO
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mb-8 drop-shadow-md">
          Vivi una nuova esperienza di gioco con MaracujaRP: esplora, crea e
          interagisci in un mondo ricco di avventure e opportunità.
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FE9900] hover:bg-blue-700 rounded-2xl text-white text-lg font-semibold transition transform hover:scale-105">
          GIOCA <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 px-6 bg-gray-800 rounded-t-3xl">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#FE9900]">
          Cosa Ti Aspetta
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Esplora missioni, guida veicoli, lavora nell'economia dinamica del
          server e scopri una community attiva!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Missioni Epiche",
            desc: "Partecipa a missioni create dalla community.",
            icon: "🎯",
          },
          {
            title: "Veicoli Personalizzati",
            desc: "Guida auto, moto e mezzi speciali.",
            icon: "🚗",
          },
          {
            title: "Economia Realistica",
            desc: "Apri attività, compra case e costruisci ricchezza.",
            icon: "💰",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Crime vs Police */}
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h3 className="text-3xl font-bold mb-2 text-red-500">Crime</h3>
          <p className="text-gray-300">
            Gang, pirati o mafia: scegli il lato oscuro del roleplay.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h3 className="text-3xl font-bold mb-2 text-blue-500">Police</h3>
          <p className="text-gray-300">
            Difendi la legge: Polizia, Carabinieri, GdF e tanto altro.
          </p>
        </div>
      </div>
    </section>

    {/* How to join */}
    <section className="py-20 px-6 bg-gray-800 rounded-t-3xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#FE9900]">
        Come Entrare
      </h2>
      <ol className="max-w-xl mx-auto list-decimal list-inside text-gray-200 space-y-4 text-lg">
        <li>Apri Minecraft Java Edition (v1.19.4+).</li>
        <li>Clicca su Multigiocatore → Aggiungi server.</li>
        <li>
          Inserisci{" "}
          <span className="text-[#FE9900] font-semibold">
            play.maracujarp.it
          </span>{" "}
          e attiva le Pack.
        </li>
        <li>Leggi il regolamento prima di entrare in gioco.</li>
      </ol>
    </section>

    {/* Footer CTA */}
    <section className="py-12 px-6 text-center text-gray-300">
      <p className="mb-4">
        Unisciti alla community di MaracujaRP e vivi la tua avventura!
      </p>
      <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FE9900] hover:bg-blue-700 rounded-2xl text-white font-semibold transition transform hover:scale-105">
        GIOCA ORA <ArrowRight className="h-5 w-5" />
      </button>
    </section>
  </div>
);

export default HomePage;
