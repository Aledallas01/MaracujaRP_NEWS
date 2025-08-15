import React from "react";
import { ArrowRight } from "lucide-react";

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
    {/* Hero */}
    <section
      className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32 relative"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl animate-fadeIn">
          SERVER MINECRAFT <br /> ROLEPLAY ITALIANO
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-md animate-fadeIn delay-200">
          Vivi una nuova esperienza di gioco con MaracujaRP: esplora, crea e
          interagisci in un mondo ricco di avventure e opportunità.
        </p>
        <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FE9900] to-[#FFB347] hover:from-[#FFB347] hover:to-[#FE9900] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105 animate-fadeIn delay-400">
          GIOCA <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </section>

    {/* Features */}
    <section className="py-24 px-6 bg-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 text-[#FE9900] tracking-wide">
          Cosa Ti Aspetta
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Esplora missioni, guida veicoli, lavora nell'economia dinamica del
          server e scopri una community attiva!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
            className="bg-gradient-to-b from-gray-700 to-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition duration-300"
          >
            <div className="text-6xl mb-6">{f.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-white">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Crime vs Police */}
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gradient-to-r from-red-700 to-red-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
          <h3 className="text-3xl font-bold mb-4">Crime</h3>
          <p>Gang, pirati o mafia: scegli il lato oscuro del roleplay.</p>
        </div>
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
          <h3 className="text-3xl font-bold mb-4">Police</h3>
          <p>Difendi la legge: Polizia, Carabinieri, GdF e tanto altro.</p>
        </div>
      </div>
    </section>

    {/* How to join */}
    <section className="py-24 px-6 bg-gray-800 rounded-t-3xl">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-[#FE9900] tracking-wide">
        Come Entrare
      </h2>
      <ol className="max-w-xl mx-auto list-decimal list-inside text-gray-200 space-y-6 text-lg">
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
    <section className="py-16 px-6 text-center text-gray-300 bg-gray-900">
      <p className="mb-6 text-lg">
        Unisciti alla community di MaracujaRP e vivi la tua avventura!
      </p>
      <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FE9900] to-[#FFB347] hover:from-[#FFB347] hover:to-[#FE9900] rounded-3xl text-white font-bold shadow-lg transform transition duration-300 hover:scale-105">
        GIOCA ORA <ArrowRight className="h-5 w-5" />
      </button>
    </section>
  </div>
);

export default HomePage;
