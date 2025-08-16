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
import { motion } from "framer-motion";

// Variants per animazioni
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-900">
    {/* Navigation */}
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center">
              <Server className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">MaracujaRP</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Chi Siamo", "Attività", "Community", "Unisciti"].map(
              (item, i) => (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  whileHover={{ scale: 1.1, color: "#fff" }}
                  className="text-gray-300 transition-colors"
                >
                  {item}
                </motion.a>
              )
            )}
          </div>
        </div>
      </div>
    </motion.nav>

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
      <motion.div
        className="relative z-10 max-w-4xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl"
          variants={fadeInUp}
        >
          SERVER MINECRAFT <br /> ROLEPLAY ITALIANO
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-md"
          variants={fadeInUp}
        >
          Vivi una nuova esperienza di gioco con MaracujaRP: esplora, crea e
          interagisci in un mondo ricco di avventure e atmosfere tropicali.
        </motion.p>
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={fadeInUp}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FE9900] to-[#FF7701] rounded-3xl text-white text-lg font-bold shadow-lg transition duration-300"
          >
            <Play className="w-6 h-6" />
            <span>
              <a href="#join">GIOCA ORA</a>
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#1EFE86] to-[#26BE3C] rounded-3xl text-white text-lg font-bold shadow-lg transition duration-300"
          >
            <ExternalLink className="w-6 h-6" />
            <span>
              <a href="/news">Gestionale</a>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>

    {/* Introduzione */}
    <motion.section
      id="intro"
      className="py-20 bg-gray-800"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Benvenuto su{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FFB347]">
              MaracujaRP
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            MaracujaRP è il server Minecraft italiano che trasforma il gioco in
            un'esperienza unica di roleplay. Immergiti in un mondo dove ogni
            scelta conta, ogni personaggio ha una storia e ogni giorno porta
            nuove avventure.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: "Mondo Autentico",
              text: "Un server completamente personalizzato con ambientazioni uniche e una lore ricca di dettagli.",
            },
            {
              icon: Users,
              title: "Community Attiva",
              text: "Oltre 100 giocatori attivi che creano storie indimenticabili insieme ogni giorno.",
            },
            {
              icon: Zap,
              title: "Roleplay Dinamico",
              text: "Sistema di roleplay avanzato con meccaniche uniche per un'esperienza immersiva totale.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 hover:border-[#FF6A00] transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF6A00] to-[#FFB347] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {card.title}
              </h3>
              <p className="text-gray-300">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

    {/* --- LE ALTRE SEZIONI (Attività, Crime vs Police, Community, Join) --- */}
    {/* Con lo stesso schema puoi applicare fadeInUp, slideInLeft, slideInRight */}
    {/* alle varie parti per dare fluidità e dinamismo */}
  </div>
);

export default HomePage;
