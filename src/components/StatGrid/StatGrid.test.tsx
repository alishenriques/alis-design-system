import { render, screen } from "@testing-library/react";
import { StatGrid } from "./StatGrid";

describe("StatGrid", () => {
  it("renders each stat's value and label", () => {
    render(
      <StatGrid
        stats={[
          { value: "17+", label: "anos de experiência" },
          { value: "29", label: "testes automatizados" },
        ]}
      />,
    );

    expect(screen.getByText("17+")).toBeInTheDocument();
    expect(screen.getByText("anos de experiência")).toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
  });
});
