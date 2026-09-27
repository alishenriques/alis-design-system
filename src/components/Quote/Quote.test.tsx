import { render, screen } from "@testing-library/react";
import { Quote } from "./Quote";

describe("Quote", () => {
  it("renders as a blockquote carrying the given text", () => {
    render(<Quote>Sistemas simples de entender, seguros para modificar.</Quote>);
    const quote = screen.getByText(/Sistemas simples de entender/).closest("blockquote");
    expect(quote).toBeInTheDocument();
  });

  it("shows a '#' marker by default, customisable via the marker prop", () => {
    const { rerender } = render(<Quote>Texto</Quote>);
    expect(screen.getByText("#")).toBeInTheDocument();

    rerender(<Quote marker="//">Texto</Quote>);
    expect(screen.getByText("//")).toBeInTheDocument();
  });

  it("shows the cursor by default, and can hide it", () => {
    const { container, rerender } = render(<Quote>Texto</Quote>);
    expect(container.querySelector("[class*='cursor']")).not.toBeNull();

    rerender(
      <Quote cursor={false}>Texto</Quote>,
    );
    expect(container.querySelector("[class*='cursor']")).toBeNull();
  });

  it("stays inline by default, and floats left/right when asked", () => {
    const { container, rerender } = render(<Quote>Texto</Quote>);
    const blockquote = () => container.querySelector("blockquote") as HTMLElement;
    expect(blockquote().className).not.toMatch(/float/i);

    rerender(<Quote float="left">Texto</Quote>);
    expect(blockquote().className).toMatch(/floatLeft/);

    rerender(<Quote float="right">Texto</Quote>);
    expect(blockquote().className).toMatch(/floatRight/);
  });
});
