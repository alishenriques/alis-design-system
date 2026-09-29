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
});
