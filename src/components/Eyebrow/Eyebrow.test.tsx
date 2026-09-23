import { render, screen } from "@testing-library/react";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders its content", () => {
    render(<Eyebrow>Alisson Henriques · Front-End Sênior</Eyebrow>);
    expect(screen.getByText("Alisson Henriques · Front-End Sênior")).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    render(<Eyebrow className="extra">Label</Eyebrow>);
    expect(screen.getByText("Label")).toHaveClass("extra");
  });
});
