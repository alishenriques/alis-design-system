import { render, screen } from "@testing-library/react";
import { PipelineBadges } from "./PipelineBadges";

describe("PipelineBadges", () => {
  it("renders one item per step, label and value", () => {
    render(
      <PipelineBadges
        steps={[
          { label: "lint", value: "✓" },
          { label: "test", value: "29 ✓" },
        ]}
      />,
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("lint")).toBeInTheDocument();
    expect(screen.getByText("29 ✓")).toBeInTheDocument();
  });
});
