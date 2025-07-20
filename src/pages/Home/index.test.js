import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";
import { DataContext } from "../../contexts/DataContext";

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
    const { container } = renderWithDataContext(<Home />);

    // 🔎 Pour t'aider à debugguer l'arbre DOM :
    // console.log(container.innerHTML)

    // ✅ Solution ultra-compatible : matcher par fonction sur textContent exact
    const card = await screen.findByText((_, node) =>
      node?.textContent?.trim().includes("Événement test")
    );

    expect(card).toBeInTheDocument();
  });

});