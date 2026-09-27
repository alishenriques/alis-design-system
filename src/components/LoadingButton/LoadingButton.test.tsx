import { fireEvent, render, screen } from "@testing-library/react";
import { LoadingButton } from "./LoadingButton";

describe("LoadingButton", () => {
  it("renders its children and stays enabled while idle", () => {
    render(
      <LoadingButton isLoading={false} loadingText="sending">
        Send
      </LoadingButton>,
    );

    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toBeEnabled();
    expect(button).not.toHaveAttribute("aria-busy");
  });

  it("swaps to the terminal-style loading label and disables the button while loading", () => {
    render(
      <LoadingButton isLoading loadingText="sending">
        Send
      </LoadingButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("Send")).not.toBeInTheDocument();
    expect(button).toHaveTextContent("sending");
  });

  it("stays disabled while loading even if the caller passes disabled={false}", () => {
    render(
      <LoadingButton isLoading loadingText="sending" disabled={false}>
        Send
      </LoadingButton>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("overrides a conflicting inline background/opacity while loading, so it wins regardless of stylesheet order", () => {
    render(
      <LoadingButton isLoading loadingText="sending" style={{ background: "red", opacity: 0.6 }}>
        Send
      </LoadingButton>,
    );

    const button = screen.getByRole("button");
    expect(button.style.background).toContain("var(--ds-color-bg)");
    expect(button.style.opacity).toBe("1");
  });

  it("behaves like a normal button when idle: fires onClick, keeps its type", () => {
    const onClick = vi.fn();
    render(
      <LoadingButton type="submit" isLoading={false} loadingText="sending" onClick={onClick}>
        Send
      </LoadingButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
