import { fireEvent, render, screen } from "@testing-library/react";
import { SidePanel } from "./SidePanel";

// Stays mounted and slides off-screen via a CSS transform (not
// display/visibility), so its accessibility is driven by `aria-hidden` on
// the dialog — getByRole excludes aria-hidden subtrees by default.
describe("SidePanel", () => {
  it("is hidden from the accessibility tree while closed", () => {
    render(
      <SidePanel open={false} onClose={vi.fn()} label="Respire C'alma">
        <p>Detail content</p>
      </SidePanel>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("exposes the dialog and its content while open", () => {
    render(
      <SidePanel open onClose={vi.fn()} label="Respire C'alma">
        <p>Detail content</p>
      </SidePanel>,
    );
    expect(screen.getByRole("dialog", { name: "Respire C'alma" })).toBeInTheDocument();
    expect(screen.getByText("Detail content")).toBeInTheDocument();
  });

  it("locks page scroll only while open", () => {
    const { rerender } = render(
      <SidePanel open onClose={vi.fn()} label="Respire C'alma">
        content
      </SidePanel>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <SidePanel open={false} onClose={vi.fn()} label="Respire C'alma">
        content
      </SidePanel>,
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("asks to close from the close button, the backdrop and Escape", () => {
    const onClose = vi.fn();
    render(
      <SidePanel open onClose={onClose} label="Respire C'alma">
        content
      </SidePanel>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.click(document.querySelector("[aria-hidden='true']") as HTMLElement);

    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("does not react to Escape while closed", () => {
    const onClose = vi.fn();
    render(
      <SidePanel open={false} onClose={onClose} label="Respire C'alma">
        content
      </SidePanel>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("uses a custom close label when given", () => {
    render(
      <SidePanel open onClose={vi.fn()} label="Respire C'alma" closeLabel="Fechar">
        content
      </SidePanel>,
    );
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
  });
});
