import { ArrowUpRight, BookOpen, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { PageHeading } from "../components/page-heading";

type Source = {
  title: string;
  detail: string;
  href?: string;
};

const documentSources: Source[] = [
  {
    title: "Simone E. Tropea, «Identità digitale (?) L’eclissi del soggetto e l’ipotesi della post-cultura»",
    detail:
      "In «Aretè» 6/2021. È il riferimento da cui i documenti prendono il termine antropofonia: la parola che si svuota di logos e diventa didascalia dell’immagine.",
    href: "http://arete.unimarconi.it/wp-content/uploads/arete_6_2021_25_Simone_Tropea.pdf",
  },
  {
    title: "Papa Leone XIV, Lettera enciclica «Magnifica Humanitas»",
    detail:
      "15 maggio 2026, sulla custodia della persona umana nel tempo dell’intelligenza artificiale. Nei documenti il riferimento è stato corretto da «Leone XV» a «Leone XIV».",
    href: "https://www.vatican.va/content/leo-xiv/it/encyclicals/documents/20260515-magnifica-humanitas.html",
  },
];

const readings: { theme: string; items: Source[] }[] = [
  {
    theme: "Neutralità e strumenti",
    items: [
      {
        title: "Luciano Floridi, The Fourth Revolution",
        detail: "Oxford University Press, 2014. L’infosfera e la ridefinizione di identità e agency.",
      },
      {
        title: "Melvin Kranzberg, «Technology and History: Kranzberg’s Laws»",
        detail:
          "«Technology and Culture», 27(3), 1986. La tecnologia non è né buona né cattiva, ma non è neutrale.",
      },
    ],
  },
  {
    theme: "Delega e cognizione",
    items: [
      {
        title: "Nicholas Carr, The Shallows",
        detail: "Norton, 2010. Attenzione, memoria e lettura nell’ecosistema digitale.",
      },
      {
        title: "Nicholas Carr, The Glass Cage",
        detail: "Norton, 2014. Automazione, perdita di competenza e di pratica.",
      },
      {
        title: "John Sweller, «Cognitive Load During Problem Solving»",
        detail: "«Cognitive Science», 12(2), 1988. Perché il carico cognitivo conta nell’apprendimento.",
      },
    ],
  },
  {
    theme: "Linguaggio e voce",
    items: [
      {
        title: "Emily M. Bender, Timnit Gebru et al., «On the Dangers of Stochastic Parrots»",
        detail: "FAccT, 2021. Linguaggio fluido, scala e rischi di omologazione.",
      },
      {
        title: "Emily M. Bender, Alexander Koller, «Climbing towards NLU»",
        detail: "ACL, 2020. Forma linguistica e significato: perché la fluidità non basta.",
      },
    ],
  },
  {
    theme: "Potere e infrastrutture",
    items: [
      {
        title: "Shoshana Zuboff, The Age of Surveillance Capitalism",
        detail: "PublicAffairs, 2019. Dati, previsione del comportamento e potere asimmetrico.",
      },
      {
        title: "Kate Crawford, Atlas of AI",
        detail: "Yale University Press, 2021. La materialità di calcolo, energia e lavoro dietro l’IA.",
      },
      {
        title: "Frank Pasquale, The Black Box Society",
        detail: "Harvard University Press, 2015. Opacità algoritmica e responsabilità.",
      },
    ],
  },
  {
    theme: "Tempo, memoria e giudizio",
    items: [
      {
        title: "Hartmut Rosa, Social Acceleration",
        detail: "Columbia University Press, 2013. Accelerazione sociale e presentismo.",
      },
      {
        title: "Daniel Kahneman, Thinking, Fast and Slow",
        detail: "Farrar, Straus and Giroux, 2011. Intuizione, riflessione e trappole del giudizio.",
      },
    ],
  },
  {
    theme: "Scuola e pratiche",
    items: [
      {
        title: "Neil Selwyn, Should Robots Replace Teachers?",
        detail: "Polity, 2019. Automazione educativa e ruolo del docente.",
      },
      {
        title: "Daisy Christodoulou, Teachers vs Tech?",
        detail: "Oxford University Press, 2020. Tecnologia, memoria e progettazione didattica.",
      },
      {
        title: "Paul A. Kirschner, John Sweller, Richard E. Clark, «Why Minimal Guidance During Instruction Does Not Work»",
        detail: "«Educational Psychologist», 41(2), 2006. Guida istruttiva e scaffolding.",
      },
      {
        title: "Cathy O’Neil, Weapons of Math Destruction",
        detail: "Crown, 2016. Modelli opachi, decisioni automatiche e disuguaglianze.",
      },
    ],
  },
];

export function SourcesSection() {
  return (
    <main className="inner-main" id="contenuto" tabIndex={-1}>
      <PageHeading
        label="BIBLIOGRAFIA · VERIFICA · CREDITI"
        title="Le fonti, e come verificarle."
        text="I documenti del percorso sono testi argomentativi, non articoli scientifici. Qui trovi da dove vengono i concetti, cosa resta interpretazione e come controllare una fonte prima di usarla in classe."
      />

      <div className="sources-grid">
        <section className="sources-card sources-card-wide">
          <span className="label">
            <FileText size={14} /> RIFERIMENTI CITATI NEI DOCUMENTI
          </span>
          <h2>Le due fonti esplicite</h2>
          <ul className="source-list">
            {documentSources.map((source) => (
              <li key={source.title}>
                <strong>{source.title}</strong>
                <span>{source.detail}</span>
                {source.href && (
                  <a href={source.href} target="_blank" rel="noreferrer noopener">
                    Apri la fonte <ArrowUpRight size={13} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="sources-card sources-card-wide">
          <span className="label">
            <BookOpen size={14} /> LETTURE PER TEMA
          </span>
          <h2>Dove approfondire</h2>
          <p className="sources-intro">
            Non sono fonti citate parola per parola nei capitoli: sono le opere di riferimento sui
            temi che il percorso attraversa. Le annotazioni dicono cosa cercare, non sostituiscono
            la lettura.
          </p>
          {readings.map((group) => (
            <div className="source-theme" key={group.theme}>
              <h3>{group.theme}</h3>
              <ul className="source-list">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="sources-card">
          <span className="label">
            <ShieldCheck size={14} /> VERIFICARE UNA FONTE
          </span>
          <h2>Tre domande prima di citare</h2>
          <ol className="source-steps">
            <li>
              <strong>Chi lo dice?</strong> Autore, ente, anno. Se manca uno dei tre, la frase resta
              un’opinione finché non trovi il documento originale.
            </li>
            <li>
              <strong>Con quali prove?</strong> Distingui dato, interpretazione e ipotesi. Una
              metafora utile non è una misura: «potatura neurale» è un’immagine, non un risultato
              sperimentale.
            </li>
            <li>
              <strong>Chi lo contraddice?</strong> Cerca la critica più forte, non solo la conferma.
              Confronta almeno due fonti indipendenti e annota la data.
            </li>
          </ol>
        </section>

        <section className="sources-card">
          <span className="label">
            <CheckCircle2 size={14} /> CREDITI
          </span>
          <h2>Chi ha fatto cosa</h2>
          <ul className="credit-list">
            <li>
              <strong>Testi e revisione</strong> prof. Riefolo Giovanni, docente IRC al
              Ferraris-Fermi di Verona.
            </li>
            <li>
              <strong>Documenti originali</strong> testi dell’autore, adattati per il web senza
              riscrittura. Le sezioni duplicate del glossario restano nascoste; la sezione
              «Temporalità Disintegrata» è stata ripristinata.
            </li>
            <li>
              <strong>Illustrazioni</strong> grafica vettoriale originale del progetto.
            </li>
            <li>
              <strong>Mappa concettuale</strong> file interattivo DigiMap AI, autonomo dal sito.
            </li>
            <li>
              <strong>Icone e font</strong> Lucide (licenza ISC); Instrument Serif e Poppins (SIL
              Open Font License), serviti localmente.
            </li>
            <li>
              <strong>Video</strong> YouTube, canale dell’autore. Nessun tracker, nessun analytics:
              progressi e appunti restano nel browser.
            </li>
          </ul>
        </section>
      </div>

      <p className="revision-note">
        <strong>Nota di revisione — 13 novembre 2026.</strong> Riaperta la sezione «Temporalità
        Disintegrata», nascosta per errore con il glossario duplicato. Corretto il riferimento
        all’enciclica <em>Magnifica Humanitas</em> da Leone XV a Leone XIV. Aggiunta questa pagina
        per rendere verificabili i riferimenti e separare i testi argomentativi dalle fonti
        scientifiche.
      </p>
    </main>
  );
}
