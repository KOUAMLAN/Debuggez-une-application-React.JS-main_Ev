// src/components/PeopleCard/index.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import PeopleCard from "./index";

describe("When a people card is created", () => {
  it("an image is display with alt value", () => {
    render(
      <PeopleCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        name="test name"
        role="test role" // ✅ CORRIGÉ ici
      />
    );

    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });

  it("a title and a role are displayed", () => {
    render(
      <PeopleCard
        imageSrc="/img.jpg"
        name="test name"
        role="test role" // ✅ CORRIGÉ ici
      />
    );

    const nameElement = screen.getByText(/test name/);
    const roleElement = screen.getByText(/test role/); //  mis à jour aussi
    expect(nameElement).toBeInTheDocument();
    expect(roleElement).toBeInTheDocument();
  });
});