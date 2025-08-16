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
    {/* Navigation */}
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

    {/* Hero Section */}
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

    {/* Introduzione */}
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
            un'esperienza unica di roleplay. Immergiti in un mondo dove ogni
            scelta conta, ogni personaggio ha una storia e ogni giorno porta
            nuove avventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 transition-all duration-500 hover:scale-105 hover:border-[#FF6A00] animate-fadeInUp">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-white animate-bounceSlow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Mondo Autentico
            </h3>
            <p className="text-gray-300">
              Un server completamente personalizzato con ambientazioni uniche e
              una lore ricca di dettagli.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 transition-all duration-500 hover:scale-105 hover:border-[#1EFE86] animate-fadeInUp [animation-delay:0.3s] opacity-0">
            <div className="w-16 h-16 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white animate-bounceSlow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Community Attiva
            </h3>
            <p className="text-gray-300">
              Oltre 100 giocatori attivi che creano storie indimenticabili
              insieme ogni giorno.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 transition-all duration-500 hover:scale-105 hover:border-[#FFB347] animate-fadeInUp [animation-delay:0.6s] opacity-0">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white animate-bounceSlow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Roleplay Dinamico
            </h3>
            <p className="text-gray-300">
              Sistema di roleplay avanzato con meccaniche uniche per
              un'esperienza immersiva totale.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Avvia la tua attività */}
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
              Su MaracujaRP puoi costruire il tuo impero economico. Dalle
              piccole attività locali alle grandi corporazioni, ogni giocatore
              può diventare un imprenditore di successo.
            </p>

            <div className="space-y-6">
              {/* Locali */}
              <div className="flex items-start gap-4 animate-fadeInUp">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Locali</h3>
                  <p className="text-gray-300">
                    Crea il tuo locale: ristorante, negozio di abbigliamento o
                    bar. Gestisci il tuo business e attira clienti con offerte
                    uniche.
                  </p>
                </div>
              </div>

              {/* Servizi */}
              <div className="flex items-start gap-4 animate-fadeInUp [animation-delay:0.3s] opacity-0">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Servizi</h3>
                  <p className="text-gray-300">
                    Crea il tuo servizio: trasporto, riparazioni o consulenze.
                    Offri servizi di qualità e costruisci una reputazione
                    solida.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Qui puoi aggiungere un'immagine illustrativa o mockup */}
        </div>
      </div>
    </section>

    {/* Le altre sezioni (Crime vs Police, Community, Join) puoi farle con lo stesso schema */}
  </div>
);

export default HomePage;
