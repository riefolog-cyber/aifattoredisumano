export function NotFound() {
  return (
    <main className="error-fallback">
      <p className="eyebrow">PAGINA NON TROVATA</p>
      <h1>Qui non c’è un capitolo.</h1>
      <p>Il percorso comincia dalla home: torna indietro e scegli una tappa.</p>
      <div className="error-actions">
        <a className="primary" href={import.meta.env.BASE_URL}>
          Torna al percorso
        </a>
      </div>
    </main>
  );
}
