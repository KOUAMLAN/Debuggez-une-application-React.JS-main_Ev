// src/pages/Home/index.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";

// Import du contexte mock
import { DataContext } from "../../contexts/DataContext";

//Données simulées
const fakeEvents = [
  {
    id: 1,
    title: "Événement test",
    cover: "/img1.jpg",
    date: "2024-05-25",
    type: "soirée",
  },
];

const fakeLast = fakeEvents[0];

// Fonction utilitaire pour injecter le contexte
function renderWithDataContext(ui) {
  return render(
    <DataContext.Provider
      value={{
        events: fakeEvents,
        last: fakeLast,
        data: { events: fakeEvents },
        error: null,
      }}
    >
      {ui}
    </DataContext.Provider>
  );
}

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    const { container } = renderWithDataContext(<Home />);
    const nosReal = container.querySelector("#realisationTitle");
    expect(nosReal).toBeInTheDocument();
    expect(nosReal.textContent).toEqual("Nos réalisations");
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

    // Option 1 : Recherche par texte (robuste)
    const cardByText = await screen.findByText(/Événement\s*test/i);
    expect(cardByText).toBeInTheDocument();

    // Option 2 : Si `data-testid="event-card"` est dans EventCard.jsx
    // const cards = await screen.findAllByTestId("event-card");
    // expect(cards.length).toBeGreaterThan(0);
  });
});