import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the provided label", () => {
    render(<Button>Open work</Button>);
    expect(screen.getByRole("button", { name: "Open work" })).toBeInTheDocument();
  });

  it("applies the ghost variant class", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "ghost");
  });
});
