import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";
import DataContext from "../../contexts/DataContext"; // ✅ Corrigé ici

const fakeEvents = [
  {
    id: 1,
    title: "Événement test",
    cover: "/img.jpg",
    date: "2023-10-10",
    type: "conférence",
  },
];

const fakeLast = fakeEvents[0];

function renderWithDataContext(component) {
  return render(
    <DataContext.Provider
      value={{
        data: { events: fakeEvents },
        events: fakeEvents,
        last: fakeLast,
        error: null,
      }}
    >
      {component}
    </DataContext.Provider>
  );
}

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    renderWithDataContext(<Home />);

    const title = await screen.findByRole("heading", { name: "Nos réalisations" });
    expect(title).toBeInTheDocument();

    const eventsList = await screen.findByTestId("events-list");
    expect(eventsList).toBeInTheDocument();

    const cards = await screen.findAllByTestId("event-card");
    expect(cards.length).toBeGreaterThan(0);
  });
});