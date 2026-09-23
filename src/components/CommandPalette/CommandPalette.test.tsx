import { fireEvent, render, screen } from "@testing-library/react";
import { CommandPalette } from "./CommandPalette";

const items = [
  { label: "Sobre", href: "#sobre", hint: "perfil" },
  { label: "Experiência", href: "#experiencia", hint: "7 empresas" },
  { label: "GitHub", href: "https://github.com/alishenriques" },
];

describe("CommandPalette", () => {
  it("is closed by default and opens on trigger click", () => {
    render(<CommandPalette items={items} triggerLabel="Buscar" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("filters items as the user types", () => {
    render(<CommandPalette items={items} />);
    fireEvent.click(screen.getByRole("button"));

    fireEvent.change(screen.getByPlaceholderText(/type a command/i), { target: { value: "git" } });

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.queryByText("Sobre")).not.toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<CommandPalette items={items} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on a backdrop click but not on a dialog click", () => {
    render(<CommandPalette items={items} />);
    fireEvent.click(screen.getByRole("button"));

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(dialog.parentElement as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on Cmd/Ctrl+K from anywhere and toggles closed on a second press", () => {
    render(<CommandPalette items={items} />);
    fireEvent.keyDown(document, { key: "k", metaKey: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "k", ctrlKey: true });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when an item is picked", () => {
    render(<CommandPalette items={items} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Sobre"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders items that share a label without a duplicate-key warning", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const duplicateLabels = [
      { label: "Contato", href: "#contato" },
      { label: "Contato", href: "mailto:alishenriques@gmail.com" },
    ];

    render(<CommandPalette items={duplicateLabels} />);
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getAllByText("Contato")).toHaveLength(2);
    expect(errorSpy).not.toHaveBeenCalledWith(expect.stringContaining("same key"));
    errorSpy.mockRestore();
  });
});
