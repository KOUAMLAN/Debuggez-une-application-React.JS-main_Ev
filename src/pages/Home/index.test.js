import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { DataContext } from "../../contexts/DataContext";
import React from "react";

// Mock data pour le DataContext
const fakeEvents = [
  { id: 1, title: "Événement test", cover: "/img1.jpg", date: "2024-05-25", type: "soirée" }
];
const fakeLast = fakeEvents[0];

function renderWithDataContext(ui) {
  return render(
    <DataContext.Provider value={{ events: fakeEvents, last: fakeLast }}>
      {ui}
    </DataContext.Provider>
  );
}

describe("When Form is created", () => {
  // ... tes tests du formulaire peuvent rester inchangés
});

// Ajout de tests d'intégration
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