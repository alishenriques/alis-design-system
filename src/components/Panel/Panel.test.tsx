import { render, screen } from "@testing-library/react";
import { Panel } from "./Panel";

describe("Panel", () => {
  it("renders its children", () => {
    render(
      <Panel>
        <p>Content</p>
      </Panel>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies the dot-grid utility class when dots is set", () => {
    render(<Panel dots>Content</Panel>);
    expect(screen.getByText("Content")).toHaveClass("ds-dot-grid");
  });

  it("omits the dot-grid class by default", () => {
    render(<Panel>Content</Panel>);
    expect(screen.getByText("Content")).not.toHaveClass("ds-dot-grid");
  });
});
