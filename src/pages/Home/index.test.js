// src/pages/Home/index.test.js

import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
// Optionnel : mock du contexte de données (exemple si tu utilises Recoil/Context)

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours", {}, { timeout: 3000 });
      await screen.findByText("Message envoyé !", {}, { timeout: 3000 });
    });
  });
});

// Ajout de tests d'intégration
describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    const { container } = render(<Home />);
    const nosReal = container.querySelector("#realisationTitle");
    expect(nosReal.innerHTML).toEqual("Nos réalisations");
    // correction : div#events doit maintenant exister !
    const events = container.querySelector("#events");
    expect(events).toBeInTheDocument();
  });

  it("a list of people is displayed", async () => {
    render(<Home />);
    await screen.findByText("CEO");
    await screen.findByText("Alice");
    await screen.findByText("Isabelle");
  });

  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    // On attend que l'event-card apparaisse (peut être plusieurs !)
    // On teste juste la présence de l'event-card
    const eventCardElements = await screen.findAllByTestId("event-card");
    expect(eventCardElements.length).toBeGreaterThan(0);
    // Optionnel : tester un titre si tu mocks le DataContext pour mettre une valeur prévisible à `last.title`
    // await screen.findByText("NomDeLEventMocké");
  });
});