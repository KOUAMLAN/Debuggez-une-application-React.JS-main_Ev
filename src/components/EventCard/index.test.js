// src/components/EventCard/index.test.js

import { render, screen } from "@testing-library/react";
import EventCard from "./index";

describe("When a event card is created", () => {
  it("is displayed", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        label="test label"
        title="test event"
        date={new Date("2024-04-15")}
      />
    );
    const cardImage = screen.getByTestId("card-image-testid");
    expect(cardImage).toHaveAttribute("src", expect.stringContaining("src-image"));
    expect(cardImage).toHaveAttribute("alt", "image-alt-text");
    expect(screen.getByText("test event")).toBeInTheDocument();
    expect(screen.getByText("test label")).toBeInTheDocument();
    expect(screen.getByText(/avril/i)).toBeInTheDocument(); // Mois en français
  });

  it("with small props ➜ a modifier small is added", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        label="test label"
        title="test event"
        date={new Date("2024-04-15")}
        small={true}
      />
    );

    // CIBLER le bon data-testid
    const cardElement = screen.getByTestId("event-card");
    expect(cardElement.className).toContain("EventCard--small");
  });
});