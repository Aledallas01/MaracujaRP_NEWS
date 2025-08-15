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
  Heart,
  Star,
  Zap,
  Trophy,
  UserPlus,
  Download,
  ExternalLink,
} from "lucide-react";

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-900">
    {/* Navigation */}
    <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center">
              <Server className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">MaracujaRP</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#intro"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Chi Siamo
            </a>
            <a
              href="#attivita"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Attività
            </a>
            <a
              href="#community"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Community
            </a>
            <a
              href="#join"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Unisciti
            </a>
          </div>
        </div>
      </div>
    </nav>

    {/* Hero Section */}
    <section
      id="home"
      className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32 relative min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')",
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
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FE9900] to-[#FF7701] hover:from-[#FF8801] hover:to-[#FF6601] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105 animate-fadeIn delay-400">
            <Play className="w-6 h-6" />
            <span>GIOCA ORA</span>
          </button>
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] hover:from-[#1EFF48] hover:to-[#52B62B] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105 animate-fadeIn delay-400">
            <ExternalLink className="w-6 h-6" />
            <span>Gestionale</span>
          </button>
        </div>
      </div>
    </section>

    {/* Introduzione */}
    <section id="intro" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Benvenuto su{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FFB347]">
              MaracujaRP
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            MaracujaRP è il server Minecraft italiano che trasforma il gioco in
            un'esperienza unica di roleplay. Immergiti in un mondo dove ogni
            scelta conta, ogni personaggio ha una storia e ogni giorno porta
            nuove avventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 hover:border-[#FF6A00] transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Mondo Autentico
            </h3>
            <p className="text-gray-300">
              Un server completamente personalizzato con ambientazioni tropicali
              uniche e una lore ricca di dettagli.
            </p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 hover:border-[#1EFE86] transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Community Attiva
            </h3>
            <p className="text-gray-300">
              Oltre 1000 giocatori attivi che creano storie indimenticabili
              insieme ogni giorno.
            </p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 hover:border-[#FFB347] transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
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
          <div>
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Imprese Personalizzate
                  </h3>
                  <p className="text-gray-300">
                    Crea la tua attività unica: ristoranti, negozi, servizi di
                    trasporto e molto altro.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Economia Realistica
                  </h3>
                  <p className="text-gray-300">
                    Sistema economico complesso con mercato libero, investimenti
                    e partnership.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Competizione Sana
                  </h3>
                  <p className="text-gray-300">
                    Competi con altri giocatori in un ambiente equo e
                    stimolante.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-[#FF6A00]/20 to-[#1EFE86]/20 p-8 rounded-2xl border border-gray-600">
              <img
                src="https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Business"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h3 className="text-2xl font-bold text-white mb-4">
                Statistiche Economiche
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#FF6A00]">200+</div>
                  <div className="text-gray-300">Attività Attive</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#1EFE86]">50M+</div>
                  <div className="text-gray-300">Volume Affari</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Crime vs Police */}
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-red-500">Crime</span> vs{" "}
            <span className="text-blue-500">Police</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Scegli il tuo destino: unisciti alle forze dell'ordine per mantenere
            la pace o abbraccia la vita criminale per costruire il tuo impero
            illegale. Ogni scelta ha le sue conseguenze.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Crime Side */}
          <div className="bg-gradient-to-br from-red-900/30 to-red-700/20 p-8 rounded-2xl border border-red-500/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">Vita Criminale</h3>
            </div>

            <p className="text-gray-300 mb-6">
              Costruisci il tuo impero criminale attraverso rapine, traffici e
              alleanze strategiche. Ma attento: ogni mossa sbagliata potrebbe
              costarti tutto.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-red-500" />
                <span>Organizzazioni criminali strutturate</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-red-500" />
                <span>Sistema di territorio e controllo</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-red-500" />
                <span>Meccaniche di ricerca e latitanza</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-red-500" />
                <span>Economia parallela e riciclaggio</span>
              </li>
            </ul>
          </div>

          {/* Police Side */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-700/20 p-8 rounded-2xl border border-blue-500/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">
                Forze dell'Ordine
              </h3>
            </div>

            <p className="text-gray-300 mb-6">
              Proteggi la città e i suoi cittadini. Conduci indagini, arresta i
              criminali e mantieni l'ordine in un mondo dove il crimine non
              dorme mai.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500" />
                <span>Dipartimenti specializzati (SWAT, Narcotics)</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500" />
                <span>Sistema di indagini e prove</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500" />
                <span>Operazioni undercover</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-blue-500" />
                <span>Carriera e promozioni realistiche</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Community */}
    <section id="community" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            La Nostra{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#1EFE86]">
              Community
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            MaracujaRP non è solo un server, è una famiglia. Unisciti alla
            nostra community vibrante e scopri un mondo di amicizie,
            collaborazioni e momenti indimenticabili.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-300">Giocatori Attivi</div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-300">Support Discord</div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">5000+</div>
            <div className="text-gray-300">Ore di Roleplay</div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#FF6A00] to-[#1EFE86] rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-300">Rating Medio</div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Connettiti con Noi
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-2xl text-white font-bold shadow-lg transform transition duration-300 hover:scale-105">
              <MessageCircle className="w-6 h-6" />
              <span>Discord</span>
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] hover:from-[#FF8801] hover:to-[#FF6601] rounded-2xl text-white font-bold shadow-lg transform transition duration-300 hover:scale-105">
              <Globe className="w-6 h-6" />
              <span>Forum</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* How to Join */}
    <section id="join" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Come{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EFE86] to-[#26BE3C]">
              Unirti
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Iniziare su MaracujaRP è semplice! Segui questi passi per immergerti
            subito nel mondo del roleplay più coinvolgente d'Italia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 text-center group hover:border-[#FF6A00] transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              1. Registrazione
            </h3>
            <p className="text-gray-300">
              Crea il tuo account sul nostro sito web e completa la whitelist
              con la tua storia personale.
            </p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 text-center group hover:border-[#1EFE86] transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              2. Setup Client
            </h3>
            <p className="text-gray-300">
              Scarica le mod necessarie e configura il tuo client Minecraft per
              l'esperienza ottimale.
            </p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 text-center group hover:border-[#FFB347] transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FFB347] to-[#FF7701] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              3. Inizia a Giocare
            </h3>
            <p className="text-gray-300">
              Entra nel server, crea il tuo personaggio e inizia la tua
              avventura nel mondo di MaracujaRP!
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FF6A00]/10 to-[#1EFE86]/10 p-8 rounded-2xl border border-gray-600">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">IP Server:</h3>
            <div className="bg-gray-800/50 px-6 py-4 rounded-xl inline-block mb-6">
              <span className="text-2xl font-mono text-[#FF6A00] font-bold">
                play.maracujaRP.it
              </span>
            </div>
            <p className="text-gray-300 mb-8">
              Versione supportata:{" "}
              <span className="text-white font-bold">1.20.1</span> | Modalità:{" "}
              <span className="text-white font-bold">Roleplay</span> |
              Whitelist: <span className="text-white font-bold">Attiva</span>
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FE9900] to-[#FF7701] hover:from-[#FF8801] hover:to-[#FF6601] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105">
                <UserPlus className="w-6 h-6" />
                <span>Richiedi Whitelist</span>
              </button>
              <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] hover:from-[#1EFF48] hover:to-[#52B62B] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105">
                <Download className="w-6 h-6" />
                <span>Download Mod Pack</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
