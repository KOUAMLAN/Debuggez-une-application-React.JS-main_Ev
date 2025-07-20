import React from "react";
import { render, screen } from "@testing-library/react";
import PeopleCard from "./index";

describe("When a people card is created", () => {
  it("an image is display with alt value", () => {
    render(
      <PeopleCard
        imageSrc="http://src-image"
        name="test name"
        position="test position"
      />
    );

    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("test name"); // ✅ corrigé ici
  });

  it("name and position are displayed", () => {
    render(
      <PeopleCard
        imageSrc="/image.jpg"
        name="Jane Doe"
        position="Directrice"
      />
    );

    expect(screen.getByTestId("people-name")).toHaveTextContent("Jane Doe");
    expect(screen.getByTestId("people-position")).toHaveTextContent("Directrice");
  });
});