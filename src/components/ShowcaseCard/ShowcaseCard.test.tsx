import { render, screen } from "@testing-library/react";
import { ShowcaseCard } from "./ShowcaseCard";

describe("ShowcaseCard", () => {
  it("renders the image, title, site label and footer", () => {
    render(
      <ShowcaseCard
        imageUrl="https://example.com/cover.jpg"
        siteLabel="respirecalma.eco.br"
        title="Respire C'alma"
        description="E-commerce de velas terapêuticas."
        footer={<a href="/projetos">+ sobre esse projeto</a>}
      />,
    );

    const image = screen.getByAltText("") as HTMLImageElement;
    expect(image.src).toBe("https://example.com/cover.jpg");
    expect(screen.getByRole("heading", { name: "Respire C'alma" })).toBeInTheDocument();
    expect(screen.getByText("respirecalma.eco.br")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "+ sobre esse projeto" })).toHaveAttribute(
      "href",
      "/projetos",
    );
  });

  it("renders without a site label when none is given", () => {
    const { container } = render(
      <ShowcaseCard imageUrl="https://example.com/cover.jpg" title="T" description="D" footer={null} />,
    );
    // The browser-chrome dots still render either way; just no address text.
    expect(container.querySelectorAll("[class*='dot']").length).toBeGreaterThan(0);
    expect(container.querySelector("[class*='siteLabel']")).toBeNull();
  });

  it("renders one tag per item, and omits the list entirely when there are none", () => {
    const { rerender } = render(
      <ShowcaseCard
        imageUrl="https://example.com/cover.jpg"
        title="T"
        description="D"
        tags={["react", "graphql"]}
        footer={null}
      />,
    );
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("graphql")).toBeInTheDocument();

    rerender(
      <ShowcaseCard imageUrl="https://example.com/cover.jpg" title="T" description="D" footer={null} />,
    );
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders the description text (present in the DOM, revealed on hover/focus via CSS)", () => {
    render(
      <ShowcaseCard
        imageUrl="https://example.com/cover.jpg"
        title="T"
        description="A longer mini bio about the project."
        footer={null}
      />,
    );
    expect(screen.getByText("A longer mini bio about the project.")).toBeInTheDocument();
  });

  it("uses a custom image alt when given, empty (decorative) by default", () => {
    const { rerender, container } = render(
      <ShowcaseCard imageUrl="https://example.com/cover.jpg" title="T" description="D" footer={null} />,
    );
    expect(container.querySelector("img")).toHaveAttribute("alt", "");

    rerender(
      <ShowcaseCard
        imageUrl="https://example.com/cover.jpg"
        imageAlt="Screenshot"
        title="T"
        description="D"
        footer={null}
      />,
    );
    expect(screen.getByAltText("Screenshot")).toBeInTheDocument();
  });
});
