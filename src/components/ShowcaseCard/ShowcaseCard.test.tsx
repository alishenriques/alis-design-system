import { render, screen } from "@testing-library/react";
import { ShowcaseCard } from "./ShowcaseCard";

describe("ShowcaseCard", () => {
  it("renders the image, title, description and footer", () => {
    render(
      <ShowcaseCard
        imageUrl="https://example.com/cover.jpg"
        title="Respire C'alma"
        description="E-commerce de velas terapêuticas."
        footer={<a href="/projetos">+ sobre esse projeto</a>}
      />,
    );

    const image = screen.getByAltText("") as HTMLImageElement;
    expect(image.src).toBe("https://example.com/cover.jpg");
    expect(screen.getByRole("heading", { name: "Respire C'alma" })).toBeInTheDocument();
    expect(screen.getByText("E-commerce de velas terapêuticas.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "+ sobre esse projeto" })).toHaveAttribute(
      "href",
      "/projetos",
    );
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
