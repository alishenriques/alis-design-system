import { fireEvent, render, screen } from "@testing-library/react";
import { Timeline } from "./Timeline";

const items = [
  { id: "a", label: "Project A", iconUrl: "https://example.com/a.png" },
  { id: "b", label: "Project B" },
  { id: "c", label: "Project C" },
];

describe("Timeline", () => {
  it("renders one node per item, in order, with an accessible name matching its label", () => {
    render(<Timeline items={items} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((button) => button.getAttribute("aria-pressed") !== null)).toEqual([true, true, true]);
    expect(screen.getByRole("button", { name: "Project A" })).toBe(buttons[0]);
    expect(screen.getByRole("button", { name: "Project B" })).toBe(buttons[1]);
    expect(screen.getByRole("button", { name: "Project C" })).toBe(buttons[2]);
  });

  it("calls onSelect with the clicked item's id", () => {
    const onSelect = vi.fn();
    render(<Timeline items={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("button", { name: "Project B" }));
    expect(onSelect).toHaveBeenCalledWith("b");
  });

  it("marks the selected item's node as pressed, and no other", () => {
    render(<Timeline items={items} selectedId="b" />);
    expect(screen.getByRole("button", { name: "Project A" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "Project B" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Project C" })).toHaveAttribute("aria-pressed", "false");
  });

  it("falls back to the label's first letter when there's no iconUrl", () => {
    render(<Timeline items={[{ id: "b", label: "Bravo" }, { id: "c", label: "Charlie" }]} />);
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("connects every item except the last with a line", () => {
    const { container } = render(<Timeline items={items} />);
    expect(container.querySelectorAll("[class*='line']")).toHaveLength(items.length - 1);
  });

  it("renders a single node with no connecting line", () => {
    const { container } = render(<Timeline items={[items[0]]} />);
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(container.querySelectorAll("[class*='line']")).toHaveLength(0);
  });

  it("shows the type and description on the same line as the label, when given", () => {
    render(
      <Timeline
        items={[{ id: "a", label: "Respire C'alma", typeLabel: "E-Commerce", description: "Velas terapêuticas." }]}
      />,
    );
    expect(screen.getByText("E-Commerce")).toBeInTheDocument();
    expect(screen.getByText(/Velas terapêuticas\./)).toBeInTheDocument();
    // Real content, not decorative — included in the accessible name too.
    expect(
      screen.getByRole("button", { name: /Respire C'alma.*E-Commerce.*Velas terapêuticas\./ }),
    ).toBeInTheDocument();
  });

  it("omits the type and description when not given", () => {
    render(<Timeline items={[{ id: "a", label: "Project A" }]} />);
    expect(screen.getByRole("button", { name: "Project A" })).toBeInTheDocument();
  });

  it("keeps real spacing between label, type and description in the accessible name", () => {
    // Regression test: the visual "|"/"–" separators are aria-hidden and
    // contribute no whitespace of their own, so relying on child-node name
    // computation ran adjacent words together ("ASummary", not "A Summary").
    render(<Timeline items={[{ id: "a", label: "A", typeLabel: "T", description: "D" }]} />);
    expect(screen.getByRole("button", { name: "A — T — D" })).toBeInTheDocument();
  });

  it("marks only the featured row, and widens the rail for every row when one is featured", () => {
    const { container } = render(<Timeline items={[{ ...items[0], featured: true }, items[1]]} />);
    const rows = container.querySelectorAll("li");
    expect(rows[0].className).toMatch(/rowFeatured/);
    expect(rows[1].className).not.toMatch(/rowFeatured/);
    expect(container.querySelector("ol")?.className).toMatch(/listWithFeatured/);
  });

  it("keeps the normal rail when nothing is featured", () => {
    const { container } = render(<Timeline items={items} />);
    expect(container.querySelector("ol")?.className).not.toMatch(/listWithFeatured/);
  });

  it("renders badges with a tooltip each and adds their labels to the accessible name", () => {
    render(
      <Timeline
        items={[
          {
            id: "a",
            label: "A",
            typeLabel: "T",
            badges: [
              { label: "React", icon: <svg data-testid="react-icon" /> },
              { label: "GraphQL", icon: <svg data-testid="graphql-icon" /> },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByTestId("react-icon")).toBeInTheDocument();
    expect(screen.getByTitle("GraphQL")).toContainElement(screen.getByTestId("graphql-icon"));
    expect(screen.getByRole("button", { name: "A — T — React, GraphQL" })).toBeInTheDocument();
  });

  it("renders no badge row for an empty badges list", () => {
    const { container } = render(<Timeline items={[{ id: "a", label: "A", badges: [] }]} />);
    expect(container.querySelector("[class*='badges']")).toBeNull();
    expect(screen.getByRole("button", { name: "A" })).toBeInTheDocument();
  });
});
