import { expect, test } from "@playwright/test";

test.describe("Il Fattore Umano", () => {
  test("la home mostra contenuto, credito autore e navigazione", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Il pensiero resta");
    await expect(page.locator(".author-credit")).toContainText("prof. Riefolo Giovanni");
    await expect(page.locator(".author-credit")).toContainText("Ferraris-Fermi di Verona");
    await expect(page.locator(".footer-credit")).toContainText("prof. Riefolo Giovanni");
    await expect(page.getByRole("navigation", { name: "Navigazione principale" })).toBeVisible();
  });

  test("l'hash routing apre le sezioni e il tasto indietro torna alla home", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Documenti", exact: true }).click();
    await expect(page).toHaveURL(/#\/documenti\/\d+\/\d+$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Leggi. Fermati. Interroga.");

    await page.getByRole("button", { name: "Glossario", exact: true }).click();
    await expect(page).toHaveURL(/#\/glossario$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Un lessico del pensiero.");

    await page.goBack();
    await expect(page).toHaveURL(/#\/documenti\/\d+\/\d+$/);
    await page.goBack();
    await expect(page).toHaveURL(/#\/percorso$/);
  });

  test("lo skip-link porta il focus al contenuto principale", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Vai al contenuto" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#contenuto")).toBeFocused();
  });

  test("la ricerca si apre, filtra e si chiude con Esc", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Cerca nei documenti" }).click();
    const dialog = page.getByRole("dialog", { name: "Ricerca nei documenti" });
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole("combobox", { name: "Cerca nei documenti" });
    await expect(input).toBeFocused();
    await input.fill("pensiero");
    await expect(dialog.getByRole("status")).toContainText("passaggi trovati");
    await input.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.locator(".search-button")).toBeFocused();
  });

  test("il capitolo ha un link diretto e resta nell'URL", async ({ page }) => {
    await page.goto("/#/documenti/2/2");
    await expect(page.locator(".reader-sidebar button.selected")).toContainText(
      "La Mutazione Cognitiva",
    );
    await expect(page.locator(".reading-paper h2")).toContainText("La Mutazione Cognitiva");
    await expect(page).toHaveURL(/#\/documenti\/2\/2$/);
  });

  test("tornando su Documenti la ricerca non riapre il paragrafo", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Cerca nei documenti" }).click();
    const input = page.getByRole("combobox", { name: "Cerca nei documenti" });
    await input.fill("pensiero");
    await expect(page.getByRole("option").first()).toBeVisible();
    await input.press("Enter");
    await expect(page.locator(".search-hit")).toHaveCount(1);

    await page.getByRole("button", { name: "Percorso", exact: true }).click();
    await page.getByRole("button", { name: "Documenti", exact: true }).click();
    await expect(page.locator(".search-hit")).toHaveCount(0);
    await expect(page.locator("mark.search-term")).toHaveCount(0);
  });

  test("un percorso sconosciuto mostra la pagina di fallback", async ({ page }) => {
    await page.goto("/pagina-inesistente");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Qui non c’è un capitolo.");
    await expect(page.getByRole("link", { name: "Torna al percorso" })).toBeVisible();
  });

  test("il menu mobile si chiude con Esc e restituisce il focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Apri menu" });
    await menu.click();
    await expect(page.locator(".nav.open")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".nav.open")).toHaveCount(0);
    await expect(menu).toBeFocused();
  });

  test("la ricerca si naviga da tastiera e apre il paragrafo trovato", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Cerca nei documenti" }).click();
    const dialog = page.getByRole("dialog", { name: "Ricerca nei documenti" });
    const input = dialog.getByRole("combobox", { name: "Cerca nei documenti" });
    await input.fill("pensiero");
    await expect(dialog.getByRole("option").first()).toBeVisible();

    await input.press("ArrowDown");
    const first = dialog.getByRole("option").first();
    await expect(first).toHaveAttribute("aria-selected", "true");
    await expect(input).toHaveAttribute("aria-activedescendant", "search-result-0");

    await input.press("Enter");
    await expect(page).toHaveURL(/#\/documenti\/\d+\/\d+$/);
    await expect(page.locator(".paragraph-block.search-hit")).toHaveCount(1);
    await expect(page.locator("mark.search-term").first()).toBeVisible();
  });

  test("con movimento ridotto il risultato apre il capitolo e le occorrenze sono marcate", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: "Cerca nei documenti" }).click();
    const input = page.getByRole("combobox", { name: "Cerca nei documenti" });
    await input.fill("pensiero");
    await expect(page.getByRole("option").first()).toBeVisible();
    await input.press("Enter");
    await expect(page).toHaveURL(/#\/documenti\/\d+\/\d+$/);
    await expect(page.locator("mark.search-term").first()).toBeVisible();
  });

  test("il tema chiaro si attiva e resta dopo il ricaricamento", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    const initial = await html.getAttribute("data-theme");
    const next = initial === "light" ? "dark" : "light";

    await page.locator(".theme-button").click();
    await expect(html).toHaveAttribute("data-theme", next);
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", next);

    await page.locator(".theme-button").click();
    await expect(html).toHaveAttribute("data-theme", initial ?? "dark");
  });

  test("il quiz salva la ripresa e mostra il risultato finale", async ({ page }) => {
    await page.goto("/#/laboratorio");
    await page.getByRole("button", { name: /Autoverifica/ }).click();
    await expect(page.locator(".quiz-top .label")).toContainText("DOMANDA 1 / 10");

    await page.locator(".answer-options button").first().click();
    await page.getByRole("button", { name: /Verifica la risposta/ }).click();
    await expect(page.locator(".quiz-explanation")).toBeVisible();

    const saved = await page.evaluate(() => localStorage.getItem("fd-quiz"));
    expect(saved).toBeTruthy();
    expect(JSON.parse(saved as string).selected).not.toBeNull();

    await page.getByRole("button", { name: "Prossima domanda" }).click();
    for (let index = 1; index < 10; index += 1) {
      await page.locator(".answer-options button").first().click();
      await page.getByRole("button", { name: "Verifica la risposta" }).click();
      await page
        .getByRole("button", { name: index === 9 ? "Vedi il risultato" : "Prossima domanda" })
        .click();
    }
    await expect(page.locator(".quiz-result")).toBeVisible();
    await expect(page.getByRole("button", { name: /Esporta l.esito/ })).toBeVisible();
  });

  test("il confronto dei modelli ha dodici attività senza la tappa 03", async ({ page }) => {
    await page.goto("/#/laboratorio");
    await expect(page.locator(".subject-grid button")).toHaveCount(12);
    await expect(page.locator(".comparison-lab")).not.toContainText("RENDI VISIBILE");
    await expect(page.locator(".reflection-workspace")).toHaveCount(0);
    await expect(page.locator(".compare-counter")).toContainText("0/12");
    await expect(page.locator(".guided-question")).toHaveCount(2);
    await page.locator(".subject-grid button").nth(11).click();
    await expect(page.locator(".scenario-brief h3")).toHaveText(
      "Descrivi ciò che vedi, non ciò che sai.",
    );
  });

  test("il glossario filtra i termini", async ({ page }) => {
    await page.goto("/#/glossario");
    const input = page.getByRole("textbox", { name: "Cerca nel glossario" });
    await input.fill("antropofonia");
    await expect(page.locator(".gloss-item")).toHaveCount(1);
    await page.locator(".gloss-item button").first().click();
    await expect(page.locator(".gloss-definition")).toContainText(
      "DEFINIZIONE DAL DOCUMENTO ORIGINALE",
    );
  });

  test("i progressi si esportano e si importano", async ({ page }) => {
    await page.goto("/#/documenti/1/1");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Esporta progressi" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("il-fattore-umano-progressi.json");

    await page.locator('input[type="file"]').setInputFiles({
      name: "progressi.json",
      mimeType: "application/json",
      buffer: Buffer.from(
        JSON.stringify({
          app: "il-fattore-umano",
          version: 1,
          exportedAt: new Date().toISOString(),
          completed: ["0:0"],
          bestScore: 6,
        }),
      ),
    });
    await expect(page.getByText("Importati 1 capitoli completati.")).toBeVisible();
    await expect(page.locator(".mark-complete")).toContainText("Capitolo completato");

    await page.reload();
    await expect(page.locator(".mark-complete")).toContainText("Capitolo completato");
  });

  test("in stampa restano copertina e contenuti del capitolo", async ({ page }) => {
    await page.goto("/#/documenti/1/1");
    await expect(page.getByRole("button", { name: "Stampa / PDF" })).toBeVisible();
    await page.emulateMedia({ media: "print" });
    await expect(page.locator(".header")).toBeHidden();
    await expect(page.locator(".reading-footer")).toBeHidden();
    await expect(page.locator(".doc-toolbar")).toBeHidden();
    await expect(page.locator(".print-cover")).toBeVisible();
    await expect(page.locator(".print-cover h1")).toContainText("Orientamento");
    await expect(page.locator(".reading-visual")).toBeHidden();
  });

  test("la scorciatoia apre la ricerca e gli snippet evidenziano il termine", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.keyboard.press("/");
    const dialog = page.getByRole("dialog", { name: "Ricerca nei documenti" });
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole("combobox", { name: "Cerca nei documenti" });
    await input.fill("pensiero");
    await expect(dialog.locator("mark.search-term").first()).toBeVisible();
  });

  test("cambiando sezione il focus va al contenuto e viene annunciato", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Glossario", exact: true }).click();
    await expect(page.locator("#contenuto")).toBeFocused();
    await expect(page.locator(".sr-only[role=\"status\"]")).toContainText(
      "Sezione Glossario aperta.",
    );
  });

  test("la sezione Temporalità Disintegrata è tornata leggibile", async ({ page }) => {
    await page.goto("/#/documenti/2/5");
    await expect(page.locator(".reading-paper h2")).toContainText("Temporalità Disintegrata");
    await expect(page.locator(".reader-sidebar button")).toHaveCount(6);
    await expect(page.locator(".concept-diagram")).toContainText("Presente istantaneo");
  });

  test("i capitoli mostrano la sintesi e i diagrammi leggibili", async ({ page }) => {
    await page.goto("/#/documenti/2/2");
    await expect(page.locator(".chapter-summary")).toContainText("IN TRE PUNTI");
    await expect(page.locator(".chapter-summary li")).toHaveCount(3);
    await expect(page.locator(".concept-diagram")).toContainText("Verifica");
    await expect(page.locator(".concept-diagram")).toContainText("Delega totale");
  });

  test("a 390 px i diagrammi restano leggibili senza overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#/documenti/2/2");
    const tops = await page.locator(".diagram-step").evaluateAll((nodes) =>
      nodes.map((node) => Math.round(node.getBoundingClientRect().top)),
    );
    expect(new Set(tops).size).toBe(3);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
    ).toBeLessThanOrEqual(1);

    await page.goto("/#/laboratorio");
    await page.getByRole("button", { name: /Autoverifica/ }).click();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
    ).toBeLessThanOrEqual(1);
  });

  test("la dimensione del testo si regola e resta dopo il ricaricamento", async ({ page }) => {
    await page.goto("/#/documenti/1/1");
    const paragraph = page.locator(".paragraph-block p").first();
    const before = await paragraph.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    await page.getByRole("button", { name: "Ingrandisci il testo" }).click();
    const after = await paragraph.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(after).toBeGreaterThan(before);
    await page.reload();
    await expect(page.locator(".reading-scale")).toHaveText("110%");
  });

  test("il quiz riprende posizione e risposte dopo il ricaricamento", async ({ page }) => {
    await page.goto("/#/laboratorio");
    await page.getByRole("button", { name: /Autoverifica/ }).click();
    const first = await page.locator(".quiz-panel h2").textContent();
    await page.locator(".answer-options button").first().click();
    await page.getByRole("button", { name: /Verifica la risposta/ }).click();
    await page.getByRole("button", { name: "Prossima domanda" }).click();
    const second = await page.locator(".quiz-panel h2").textContent();

    await page.reload();
    await page.getByRole("button", { name: /Autoverifica/ }).click();
    await expect(page.locator(".quiz-top .label")).toContainText("DOMANDA 2 / 10");
    await expect(page.locator(".quiz-panel h2")).toHaveText(second ?? "");
    await expect(page.locator(".quiz-top .small-muted")).toContainText("1/10 risposte");
    expect(first).not.toBe(second);
  });

  test("i documenti distinguono le tappe dagli approfondimenti", async ({ page }) => {
    await page.goto("/#/documenti/1/1");
    const extra = page.locator("details.extra-sections");
    await expect(extra).toBeVisible();
    await extra.locator("summary").click();
    await expect(extra).toContainText("Questionario di Autoverifica");
  });

  test("la pagina Fonti raccoglie riferimenti, crediti e revisione", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Fonti e letture" }).click();
    await expect(page).toHaveURL(/#\/fonti$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Le fonti, e come verificarle.");
    await expect(page.getByRole("link", { name: /Apri la fonte/ }).first()).toHaveAttribute(
      "href",
      /arete/,
    );
    await expect(page.locator(".revision-note")).toContainText("Leone XIV");
  });

  test("la guida docenti include la rubrica di autovalutazione", async ({ page }) => {
    await page.goto("/#/docenti");
    await expect(page.locator(".rubric-table")).toContainText("Ascolto e obiezione");
    await expect(page.locator(".rubric-self")).toContainText("So spiegare la tesi opposta");
  });

  test("gli appunti del dibattito si salvano ed esportano in Markdown", async ({ page }) => {
    await page.goto("/#/dibattito");
    const notes = page.getByRole("textbox", { name: "Il tuo spazio di riflessione" });
    await notes.fill("La mia tesi di prova.");
    await expect(page.locator(".notes-counter")).toContainText("caratteri");

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Esporta tutti gli appunti" }).first().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("il-fattore-umano-appunti.md");

    await page.reload();
    await expect(notes).toHaveValue("La mia tesi di prova.");
  });
});
