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
          <a href="#gioca">
            GIOCA <ArrowRight className="h-6 w-6" />
          </a>
        </button>

        <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#FE9900] to-[#FFB347] hover:from-[#FFB347] hover:to-[#FE9900] rounded-3xl text-white text-lg font-bold shadow-lg transform transition duration-300 hover:scale-105 animate-fadeIn delay-400">
          <a href="/news">
            Gestionale <ArrowRight className="h-6 w-6" />
          </a>
        </button>
      </div>
    </section>

    {/* Features */}
    <section className="py-24 px-6 bg-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
          UN ROLEPALY
        </h3>
        <h2 className="text-4xl font-extrabold mb-4 text-[#FE9900] tracking-wide">
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
          ricordi che dureranno nel tempo. Che tu sia un veterano del roleplay o
          un nuovo arrivato, troverai sempre qualcosa di nuovo da esplorare e da
          fare.
        </p>
      </div>

      {/* Avvia la tua attività */}
      <div>
        <h3 className="text-3xl font-bold text-center mb-10 text-[#FE9900] tracking-wide">
          Avvia la tua attività
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-r from-green-700 to-green-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
            <h4 className="text-xl font-semibold mb-4">Imprese</h4>
            <p>
              Avvia la tua impresa e diventa un imprenditore di successo! <br />
              Sfrutta le opportunità offerte dal nostro sistema economico
              avanzato per creare e gestire attività uniche. Che tu voglia
              aprire un ristorante, un negozio di abbigliamento, una
              concessionaria o qualsiasi altra attività, il nostro mondo ti
              offre gli strumenti giusti per farlo. Personalizza la tua impresa,
              assumi dipendenti e interagisci con altri giocatori per costruire
              il tuo business. Ogni decisione che prendi avrà un impatto sul tuo
              successo, rendendo l'esperienza di gioco ancora più coinvolgente e
              realistica. Dimostra le tue capacità imprenditoriali e lascia il
              tuo segno nel mondo di MaracujaRP!
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-700 to-purple-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
            <h4 className="text-xl font-semibold mb-4">Servizi</h4>
            <p>
              Offri servizi unici e diventa un punto di riferimento nella
              community! <br />
              Che tu sia un meccanico, un elettricista, un parrucchiere o un
              altro professionista, MaracujaRP ti permette di mettere in mostra
              le tue abilità. Crea il tuo profilo, pubblicizza i tuoi servizi e
              interagisci con altri giocatori per costruire una clientela
              fedele. Ogni servizio che offri può influenzare la tua reputazione
              e il tuo successo nel gioco. Sfrutta le opportunità offerte dal
              nostro sistema di roleplay per diventare un professionista
              rispettato e apprezzato nella nostra community!
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Community */}
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
          COMMUNITY
        </h3>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          La community di MaracujaRP è il cuore pulsante del server. Con
          giocatori attivi, ogni giorno si creano nuove storie, avventure e
          amicizie. Unisciti a noi per rimanere aggiornato sulle ultime novità,
          partecipare a eventi esclusivi e interagire con altri appassionati di
          roleplay. Siamo una community accogliente e pronta ad aiutarti a
          iniziare la tua avventura!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Discord</h4>
          <p>
            Unisciti al nostro server Discord per rimanere sempre aggiornato su
            eventi, novità e comunicazioni importanti. La nostra community è
            attiva e pronta ad accoglierti!
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-700 to-green-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Telegram</h4>
          <p>
            Segui il nostro canale Telegram per ricevere aggiornamenti rapidi e
            comunicazioni importanti direttamente sul tuo smartphone. Resta
            connesso con la community ovunque tu sia!
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
          strategia e astuzia. I giocatori possono scegliere di diventare
          criminali, impegnandosi in attività illecite come rapine, traffico di
          droga e altro ancora, oppure unirsi alle forze dell'ordine per
          mantenere l'ordine e combattere il crimine. Ogni scelta porta a
          conseguenze uniche e sfide emozionanti, rendendo ogni sessione di
          gioco un'esperienza unica e coinvolgente.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gradient-to-r from-red-700 to-red-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Criminali</h4>
          <p>
            Scegli la vita da criminale e immergiti in un mondo di avventure
            pericolose! <br />
            Pianifica rapine audaci, gestisci traffici illeciti e sfida le forze
            dell'ordine in emozionanti inseguimenti. Ogni decisione che prendi
            può portarti a grandi ricchezze o a conseguenze disastrose. Dimostra
            le tue abilità strategiche e diventa il criminale più temuto del
            server!
          </p>
          <p>
            Crea la tua gang con il
            <p className="text-[#FE9900]">Pacchetto Formazione Gang</p>
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 rounded-3xl shadow-2xl text-white hover:shadow-3xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">Polizia</h4>
          <p>
            Unisciti alle forze dell'ordine e combatti il crimine! <br />
            Lavora in squadra con altri agenti per mantenere l'ordine, risolvere
            crimini e proteggere i cittadini. Ogni missione ti metterà alla
            prova, richiedendo abilità tattiche e coraggio. Dimostra il tuo
            valore come agente di polizia e guadagna il rispetto della
            community!
          </p>
          <p>
            Salta tutti i provini e unisciti subito alla polizia con il
            <p className="text-[#FE9900]">Pacchetto Nuovo Agente</p>
          </p>
        </div>
      </div>
    </section>

    {/* How to join */}
    <section className="py-24 px-6 bg-gray-800">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h3 className="text-4xl font-extrabold mb-4 text-white tracking-wide">
          UNISCITI ORA A MARACUJARP
        </h3>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Unirsi a MaracujaRP è semplice e veloce! Segui questi passaggi per
          iniziare la tua avventura:
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-700 p-8 rounded-3xl shadow-lg text-white hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">
            1. Avvia Minecraft e vai nella sezione MultiPlayer
          </h4>
        </div>

        <div className="bg-gray-700 p-8 rounded-3xl shadow-lg text-white hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">
            2. Clicca su <b>Aggiungi Server</b>
          </h4>
        </div>

        <div className="bg-gray-700 p-8 rounded-3xl shadow-lg text-white hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">
            3. Inserisci l'<b>IP</b>
          </h4>
          <p>Coming Soon...</p>
        </div>

        <div className="bg -gray-700 p-8 rounded-3xl shadow-lg text-white hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
          <h4 className="text-xl font-semibold mb-4">4. Abilita le Risorse</h4>
        </div>

        <div className="bg-gray-700 p-8 rounded-3xl shadow-lg text-white hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">
            Ora sei pronto per giocare
          </h3>
          <p>
            Leggi il <a href="/rules">regolamento</a> prima di entrare nel
            Server!
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
