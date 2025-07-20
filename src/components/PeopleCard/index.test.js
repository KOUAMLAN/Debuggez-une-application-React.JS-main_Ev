import React from "react";
import { render, screen } from "@testing-library/react";
import PeopleCard from "./index";

describe("When a people card is created", () => {
  it("displays image with alt value", () => {
    render(
      <PeopleCard
        imageSrc="/image.jpg"
        name="test name"
        role="test role"
      />
    );

    const image = screen.getByTestId("card-image-testid");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/image.jpg");
  });

  it("displays name and role correctly", () => {
    render(
      <PeopleCard
        imageSrc="/example.png"
        name="Samira"
        role="CEO"
      />
    );

    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
  });
});