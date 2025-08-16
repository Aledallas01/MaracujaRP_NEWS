import React from "react";
import {
  Play,
  Users,
  Building2,
  Shield,
  MessageCircle,
  ArrowRight,
  Server,
  Globe,
  Zap,
  Trophy,
  ExternalLink,
} from "lucide-react";

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-900">
    {/* NAVBAR */}
    <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center">
              <Server className="w-6 h-6 text-white animate-bounceSlow" />
            </div>
            <span className="text-2xl font-bold text-white">MaracujaRP</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Chi Siamo", "Attività", "Community", "Unisciti"].map(
              (item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-gray-300 hover:text-white transition-colors animate-fadeInUp [animation-delay:0.2s] opacity-0"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </nav>

    {/* HERO */}
    <section
      id="home"
      className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32 relative min-h-screen"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#FF6A00]/40 to-[#FFB347]/60"></div>
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl animate-fadeInUp">
          SERVER MINECRAFT <br /> ROLEPLAY ITALIANO
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-md animate-fadeInUp [animation-delay:0.3s] opacity-0">
          Vivi una nuova esperienza di gioco con MaracujaRP: esplora, crea e
          interagisci in un mondo ricco di avventure e atmosfere tropicali.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FE9900] to-[#FF7701] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-110 animate-fadeInUp [animation-delay:0.6s] opacity-0">
            <Play className="w-6 h-6 animate-bounceSlow" />
            <span>
              <a href="#join">GIOCA ORA</a>
            </span>
          </button>
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-110 animate-fadeInUp [animation-delay:0.9s] opacity-0">
            <ExternalLink className="w-6 h-6 animate-bounceSlow" />
            <span>
              <a href="/news">Gestionale</a>
            </span>
          </button>
        </div>
      </div>
    </section>

    {/* INTRO */}
    <section id="intro" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeInUp">
            Benvenuto su{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FFB347]">
              MaracujaRP
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fadeInUp [animation-delay:0.2s] opacity-0">
            MaracujaRP è il server Minecraft italiano che trasforma il gioco in
            un'esperienza unica di roleplay. Ogni scelta conta, ogni personaggio
            ha una storia e ogni giorno porta nuove avventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 transition-all duration-500 hover:scale-105 hover:border-[#FF6A00] animate-fadeInUp">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-white animate-bounceSlow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Mondo Autentico
            </h3>
            <p className="text-gray-300">
              Ambientazioni uniche e una lore ricca di dettagli.
            </p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 transition-all duration-500 hover:scale-105 hover:border-[#1EFE86] animate-fadeInUp [animation-delay:0.3s] opacity-0">
            <div className="w-16 h-16 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white animate-bounceSlow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Community Attiva
            </h3>
            <p className="text-gray-300">
              Oltre 100 giocatori attivi ogni giorno.
            </p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 transition-all duration-500 hover:scale-105 hover:border-[#FFB347] animate-fadeInUp [animation-delay:0.6s] opacity-0">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white animate-bounceSlow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Roleplay Dinamico
            </h3>
            <p className="text-gray-300">
              Meccaniche avanzate per un'esperienza immersiva.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ATTIVITÀ */}
    <section id="attivita" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slideInLeft">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Avvia la Tua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EFE86] to-[#26BE3C]">
                Attività
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Crea il tuo business: dai locali alle grandi corporazioni.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 animate-fadeInUp">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Locali</h3>
                  <p className="text-gray-300">
                    Ristoranti, bar, negozi: gestisci la tua attività e attira
                    clienti.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fadeInUp [animation-delay:0.3s] opacity-0">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Servizi</h3>
                  <p className="text-gray-300">
                    Offri servizi unici: trasporto, riparazioni, consulenze.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-slideInRight">
            <img
              src="/business.png"
              alt="Business"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    {/* CRIME VS POLICE */}
    <section id="crimevspolice" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 animate-fadeInUp">
          Crime <span className="text-[#FF6A00]">vs</span>{" "}
          <span className="text-[#1EFE86]">Police</span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="animate-slideInLeft">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#1EFE86]" /> Police
            </h3>
            <p className="text-gray-300">
              Unisciti alle forze dell’ordine, mantieni l’ordine e difendi i
              cittadini.
            </p>
          </div>
          <div className="animate-slideInRight">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-[#FF6A00]" /> Crime
            </h3>
            <p className="text-gray-300">
              Scegli la strada del crimine, organizza colpi e diventa una
              leggenda urbana.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* COMMUNITY */}
    <section id="community" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 animate-fadeInUp">
          La nostra <span className="text-[#1EFE86]">Community</span>
        </h2>
        <p className="text-xl text-gray-300 mb-10 animate-fadeInUp [animation-delay:0.3s] opacity-0">
          Più di 100 player attivi ogni giorno: eventi, tornei e tanto
          divertimento.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 animate-fadeInUp">
            <Users className="w-10 h-10 text-[#1EFE86] mx-auto mb-4 animate-bounceSlow" />
            <h3 className="text-xl font-bold text-white">+100 Giocatori</h3>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 animate-fadeInUp [animation-delay:0.3s] opacity-0">
            <Zap className="w-10 h-10 text-[#FF6A00] mx-auto mb-4 animate-bounceSlow" />
            <h3 className="text-xl font-bold text-white">Eventi Settimanali</h3>
          </div>
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 animate-fadeInUp [animation-delay:0.6s] opacity-0">
            <Trophy className="w-10 h-10 text-[#FFB347] mx-auto mb-4 animate-bounceSlow" />
            <h3 className="text-xl font-bold text-white">Competizioni RP</h3>
          </div>
        </div>
      </div>
    </section>

    {/* JOIN */}
    <section id="join" className="py-20 bg-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fadeInUp">
        Unisciti a <span className="text-[#FF6A00]">MaracujaRP</span>
      </h2>
      <p className="text-xl text-gray-300 mb-10 animate-fadeInUp [animation-delay:0.3s] opacity-0">
        Segui pochi semplici passi e inizia subito la tua avventura!
      </p>
      <ol className="space-y-4 max-w-2xl mx-auto text-left">
        <li className="flex items-center gap-3 animate-fadeInUp">
          <ArrowRight className="w-6 h-6 text-[#FF6A00]" />
          <span className="text-white">Scarica Minecraft Java Edition</span>
        </li>
        <li className="flex items-center gap-3 animate-fadeInUp [animation-delay:0.3s] opacity-0">
          <ArrowRight className="w-6 h-6 text-[#FF6A00]" />
          <span className="text-white">Aggiungi l’IP: play.maracujarp.it</span>
        </li>
        <li className="flex items-center gap-3 animate-fadeInUp [animation-delay:0.6s] opacity-0">
          <ArrowRight className="w-6 h-6 text-[#FF6A00]" />
          <span className="text-white">Unisciti al nostro Discord</span>
        </li>
      </ol>
      <a
        href="https://discord.gg/XXXXX"
        target="_blank"
        className="inline-block mt-10 px-8 py-4 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] text-white font-bold rounded-xl hover:scale-110 transition duration-300 animate-fadeInUp [animation-delay:0.9s] opacity-0"
      >
        ENTRA ORA
      </a>
    </section>

    {/* FOOTER */}
    <footer className="py-6 bg-gray-900 border-t border-gray-800 text-center text-gray-400 text-sm">
      © 2025 MaracujaRP - Tutti i diritti riservati
    </footer>
  </div>
);

export default HomePage;
