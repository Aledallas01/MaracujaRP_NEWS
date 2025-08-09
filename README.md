# MaracujaRP - Guida all'Installazione e Utilizzo

Benvenuto in **MaracujaRP**! Questa guida ti aiuterà a configurare il file `.env`, collegare il database al progetto, impostare le variabili e utilizzare il sito.

---

## 1. Configurazione del File `.env`

Il file `.env` è essenziale per configurare le variabili di ambiente del progetto. Segui questi passaggi:

1. **Crea il file `.env`** nella directory principale del progetto (se non esiste).
2. **Aggiungi le seguenti variabili** al file `.env`:

   ```env
   VITE_SUPABASE_ANON_KEY=
   VITE_SUPABASE_URL=

   VITE_USERNAME=
   VITE_PASSWORD=

   VITE_LINK_SUPPORTO_DISCORD=
   VITE_LINK_YOUTUBE=
   VITE_LINK_DISCORD=
   VITE_LINK_TIKTOK=

   VITE_VERSION_NEWS=0.0.0
   ```

3. **Personalizza i valori** in base alla tua configurazione locale.

---

## 2. Collegare il Database al Progetto

Per collegare il database al progetto, segui questi passaggi:

1. **Assicurati di avere un account Supabase attivo**.
2. **Configura le variabili `VITE_SUPABASE_ANON_KEY` e `VITE_SUPABASE_URL`** con i valori forniti dal tuo progetto Supabase.
3. **Verifica la connessione**:
   - Controlla che le credenziali nel file `.env` siano corrette.
   - Avvia il progetto e verifica che non ci siano errori di connessione.

---

## 3. Impostare le Variabili

Le variabili di ambiente configurate nel file `.env` vengono utilizzate dal progetto per:

- **Connessione al database Supabase**: `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_URL`.
- **Configurazione dell'applicazione**: `VITE_USERNAME`, `VITE_PASSWORD`, `VITE_VERSION_NEWS`.
- **Link utili**: `VITE_LINK_SUPPORTO_DISCORD`, `VITE_LINK_YOUTUBE`, `VITE_LINK_DISCORD`, `VITE_LINK_TIKTOK`.

Assicurati che tutte le variabili siano correttamente impostate per evitare malfunzionamenti.

---

## 4. Utilizzo del Sito

Dopo aver configurato il progetto, segui questi passaggi per utilizzare il sito:

1. **Avvia il server**:

   ```bash
   npm install
   npm run dev
   ```

2. **Accedi al sito**:
   - Apri il browser e vai su `http://localhost:5173`

---

## 5. Creare una Sezione

Per creare una sezione bisogna:

1. **Entrare nella Dashboard**:
   -Clicca il tasto dell'ingranaggio presente nell'Header
   -Inserisci Nome Utente e Password (impostati in .env)
2. **Selezionare SEZIONI nella SideBar**
3. **Cliccare su Nuova Sezione**
4. **Compilare i campi**:
   -Titolo: Nome della Sezione
   -Descrizione: Descrizione della Sezione (opzionale)
   -Icona: Simbolo della Sezione **(Shield, Users, Heart, AlertTriangle, X, Palmtree, Info,)**
   -Ordine: Peso della Sezione (più è alto, più la regola sarà in basso)
5. **Cliccare Salva**

---

## 6. Creare una Regola

Per creare una regola bisogna:

1. **Entrare nella Dashboard**:
   -Clicca il tasto dell'ingranaggio presente nell'Header
   -Inserisci Nome Utente e Password (impostati in .env)
2. **Selezionare **REGOLE** nella SideBar**
3. **Cliccare su Aggiungi Regola**
4. **Compilare i campi**:
   -Sezione: Sezione Padre della Regola
   -Titolo: Nome della Regola
   -Contenuto: Testo della Regola (min. 10 caratteri)
5. **Cliccare Crea Regola**

---

## 7. Modificare una Sezione

Per modificare una sezione bisogna:

1. **Entrare nella Dashboard**:
   -Clicca il tasto dell'ingranaggio presente nell'Header
   -Inserisci Nome Utente e Password (impostati in .env)
2. **Selezionare **SEZIONI** nella SideBar**
3. **Cliccare sul simbolo della **Matita** presente nella card della sezione che si desidera modificare**
4. **Compilare i campi**:
   -Titolo: Nome della Sezione
   -Descrizione: Descrizione della Sezione (opzionale)
   -Icona: Simbolo della Sezione **(Shield, Users, Heart, AlertTriangle, X, Palmtree, Info,)**
   -Ordine: Peso della Sezione (più è alto, più la regola sarà in basso)
5. **Cliccare Salva**

---

## 8. Modificare una Regola

Per modificare una sezione bisogna:

1. **Entrare nella Dashboard**:
   -Clicca il tasto dell'ingranaggio presente nell'Header
   -Inserisci Nome Utente e Password (impostati in .env)
2. **Selezionare **REGOLE** nella SideBar**
3. **Cliccare sul simbolo della **Matita** presente nella card della regola che si desidera modificare**
4. **Compilare i campi**:
   -Titolo: Nome della Regola
   -Contenuto: Testo della Regola (min. 10 caratteri)
5. **Cliccare Salva Modifiche**
