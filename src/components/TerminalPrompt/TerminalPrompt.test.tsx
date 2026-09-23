import { render, screen } from "@testing-library/react";
import { TerminalPrompt } from "./TerminalPrompt";

describe("TerminalPrompt", () => {
  it("renders the user, host and command", () => {
    render(<TerminalPrompt user="alisson" host="portfolio" command="whoami" />);
    expect(screen.getByText("alisson@portfolio")).toBeInTheDocument();
    expect(screen.getByText(/whoami/)).toBeInTheDocument();
  });
});
