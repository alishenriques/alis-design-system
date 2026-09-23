import { render, screen } from "@testing-library/react";
import { TagList } from "./TagList";

describe("TagList", () => {
  it("renders one item per tag", () => {
    render(<TagList tags={["React", "TypeScript"]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
