import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./index";
import DataContext from "../../contexts/DataContext";

const mockEvents = [
  {
    id: 1,
    title: "Événement Test",
    type: "conférence",
    cover: "/test.jpg",
    date: "2024-10-10T10:00:00.000Z"
  }
];

const mockLast = mockEvents[0];

const fakeContext = {
  data: { events: mockEvents },
  events: mockEvents,
  last: mockLast,
  error: null
};

const renderWithContext = (component) => {
  return render(
    <DataContext.Provider value={fakeContext}>
      {component}
    </DataContext.Provider>
  );
};

describe("Page", () => {
  it("affiche la section 'Nos réalisations'", async () => {
    renderWithContext(<Page />);
    const title = await screen.findByTestId("realisationTitle");
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toContain("Nos réalisations");
  });

  it("affiche la liste des événements (event card)", async () => {
    renderWithContext(<Page />);
    const eventsSection = await screen.findByTestId("events-list");
    expect(eventsSection).toBeInTheDocument();
  });

  it("affiche les personnes de l'équipe", () => {
    renderWithContext(<Page />);
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
  });

  it("affiche le pied de page", () => {
    renderWithContext(<Page />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("affiche l'événement last dans le footer", () => {
    renderWithContext(<Page />);
    const eventCard = screen.getAllByTestId("event-card")[0];
    expect(eventCard).toBeInTheDocument();
  });
});