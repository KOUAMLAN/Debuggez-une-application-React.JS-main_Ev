// src/pages/Home/index.test.js

import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { DataContext } from "../../contexts/DataContext";
import React from "react";

// Données simulées pour le test
const fakeEvents = [
  { id: 1, title: "Événement test", cover: "/img1.jpg", date: "2024-05-25", type: "soirée" }
];
const fakeLast = fakeEvents[0];

// Fonction utilitaire pour fournir des données via le contexte
function renderWithDataContext(ui) {
  return render(
    <DataContext.Provider value={{ events: fakeEvents, last: fakeLast }}>
      {ui}
    </DataContext.Provider>
  );
}

// Tests liés au formulaire (inchangés)
describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    renderWithDataContext(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      renderWithDataContext(<Home />);
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

//  Tests d'intégration du composant Home
describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    const { container } = renderWithDataContext(<Home />);
    const nosReal = container.querySelector("#realisationTitle");
    expect(nosReal.innerHTML).toEqual("Nos réalisations");
    const events = container.querySelector("#events");
    expect(events).toBeInTheDocument();
  });

  it("a list of people is displayed", async () => {
    renderWithDataContext(<Home />);
    await screen.findByText("CEO");
    await screen.findByText("Alice");
    await screen.findByText("Isabelle");
  });

  it("a footer is displayed", () => {
    renderWithDataContext(<Home />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    renderWithDataContext(<Home />);
    const eventCardElements = await screen.findAllByTestId("event-card");
    expect(eventCardElements.length).toBeGreaterThan(0);
    await screen.findByText("Événement test");
  });
});
