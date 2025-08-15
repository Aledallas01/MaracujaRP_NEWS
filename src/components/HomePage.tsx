import React from "react";
import { ArrowRight } from "lucide-react";
import { FaPalm } from "react-icons/fa";

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
    {/* Hero */}
    <section
      className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32 relative"
      style={{
        backgroundImage: "url('/tropical-hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#FF6A00]/40 to-[#FFB347]/60"></div>
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl animate-fadeIn">
          SERVER MINECRAFT <br /> ROLEPLAY ITALIANO
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-md animate-fadeIn delay-200">
          Vivi una nuova esperienza di gioco con MaracujaRP: esplora, crea e
          interagisci in un mondo ricco di avventure e atmosfere tropicali.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] hover:from-[#FFB347] hover:to-[#FF6A00] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105 animate-fadeIn delay-400">
            <a href="#gioca">
              GIOCA <ArrowRight className="h-6 w-6" />
            </a>
          </button>
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#00C9A7] to-[#00F2FE] hover:from-[#00F2FE] hover:to-[#00C9A7] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105 animate-fadeIn delay-400">
            <a href="/news">
              Gestionale <ArrowRight className="h-6 w-6" />
            </a>
          </button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-24 px-6 bg-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
          UN ROLEPLAY <FaPalm className="inline text-[#FF6A00]" />
        </h3>
        <h2 className="text-4xl font-extrabold mb-4 text-[#FF6A00] tracking-wide">
          DIVERSO
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          MaracujaRP offre un'esperienza di gioco unica, con un'ampia gamma di
          funzionalità che rendono il roleplay coinvolgente e realistico. Dalla
          creazione di personaggi personalizzati alla gestione di attività
          economiche, ogni aspetto del gioco è pensato per offrire un'esperienza
          immersiva e divertente. Unisciti a noi e scopri un mondo dove ogni
          scelta conta e le avventure sono infinite!
          <br />
          Con una community attiva e appassionata, MaracujaRP è il luogo ideale
          per vivere storie indimenticabili, fare nuove amicizie e creare
          ricordi che dureranno nel tempo.
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-center mb-10 text-[#FF6A00] tracking-wide">
          Avvia la tua attività
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-1 transition duration-300">
            <h4 className="text-xl font-semibold mb-4">Imprese</h4>
            <p>
              Avvia la tua impresa e diventa un imprenditore di successo!
              Personalizza la tua attività, assumi dipendenti e interagisci con
              altri giocatori per costruire il tuo business in un mondo
              tropicale e dinamico.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-1 transition duration-300">
            <h4 className="text-xl font-semibold mb-4">Servizi</h4>
            <p>
              Offri servizi unici e diventa un punto di riferimento nella
              community! Che tu sia un meccanico, un parrucchiere o un
              elettricista, metti in mostra le tue abilità sotto i colori caldi
              del tropico.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Community */}
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
          COMMUNITY <FaPalm className="inline text-[#00F2FE]" />
        </h3>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          La community di MaracujaRP è il cuore pulsante del server. Unisciti a
          noi per eventi, avventure e amicizie tropicali! Resta aggiornato sulle
          ultime novità e partecipa a una community attiva e accogliente.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-1 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Discord</h4>
          <p>
            Unisciti al nostro server Discord per rimanere sempre aggiornato su
            eventi, novità e comunicazioni importanti.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-1 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Telegram</h4>
          <p>
            Segui il nostro canale Telegram per ricevere aggiornamenti rapidi e
            comunicazioni direttamente sul tuo smartphone.
          </p>
        </div>
      </div>
    </section>

    {/* Crime vs Police */}
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
          CRIMINE VS POLIZIA
        </h3>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          In MaracujaRP, il crimine e la legge si scontrano in un gioco di
          strategia e astuzia. Scegli di diventare criminale o agente di polizia
          e vivi sfide uniche.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-1 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Criminali</h4>
          <p>
            Pianifica rapine audaci, gestisci traffici illeciti e sfida le forze
            dell'ordine. Ogni scelta porta a conseguenze uniche!
          </p>
          <p className="text-[#FFB347] font-bold mt-2">
            Pacchetto Formazione Gang
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-1 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Polizia</h4>
          <p>
            Lavora in squadra con altri agenti, combatti il crimine e proteggi i
            cittadini. Ogni missione mette alla prova abilità tattiche e
            coraggio.
          </p>
          <p className="text-[#00F2FE] font-bold mt-2">
            Pacchetto Nuovo Agente
          </p>
        </div>
      </div>
    </section>

    {/* How to Join */}
    <section className="py-24 px-6 bg-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
          UNISCITI ORA A MARACUJARP
        </h3>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Segui questi passaggi per iniziare la tua avventura tropicale:
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {[
          "1. Avvia Minecraft e vai nella sezione MultiPlayer",
          "2. Clicca su Aggiungi Server",
          "3. Inserisci l'IP (Coming Soon...)",
          "4. Abilita le Risorse",
          "Ora sei pronto per giocare! Leggi il regolamento prima di entrare nel Server!",
        ].map((step, i) => (
          <div
            key={i}
            className="bg-gray-700 p-8 rounded-3xl shadow-lg text-white hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <h4 className="text-xl font-semibold mb-4">{step}</h4>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default HomePage;
