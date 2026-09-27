import { fireEvent, render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("is closed by default and opens as a dialog on click", () => {
    render(<Avatar src="/photo.jpg" alt="Alisson Henriques" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Alisson Henriques" }));
    const dialog = screen.getByRole("dialog", { name: "Alisson Henriques" });
    expect(dialog).toBeInTheDocument();
  });

  it("renders the photo in both the trigger and the expanded dialog", () => {
    render(<Avatar src="/photo.jpg" alt="Alisson Henriques" />);
    fireEvent.click(screen.getByRole("button", { name: "Alisson Henriques" }));

    const images = screen.getAllByRole("img", { name: "Alisson Henriques" });
    expect(images).toHaveLength(2);
    images.forEach((img) => expect(img).toHaveAttribute("src", "/photo.jpg"));
  });

  it("closes on Escape", () => {
    render(<Avatar src="/photo.jpg" alt="Alisson Henriques" />);
    fireEvent.click(screen.getByRole("button", { name: "Alisson Henriques" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on a backdrop click but not on a dialog click", () => {
    render(<Avatar src="/photo.jpg" alt="Alisson Henriques" />);
    fireEvent.click(screen.getByRole("button", { name: "Alisson Henriques" }));

    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(dialog.parentElement as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on the × button, with a custom closeLabel", () => {
    render(<Avatar src="/photo.jpg" alt="Alisson Henriques" closeLabel="Fechar" />);
    fireEvent.click(screen.getByRole("button", { name: "Alisson Henriques" }));

    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("locks page scroll while open and restores it on close", () => {
    render(<Avatar src="/photo.jpg" alt="Alisson Henriques" />);
    fireEvent.click(screen.getByRole("button", { name: "Alisson Henriques" }));
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).toBe("");
  });

  it("applies size, expandedSize and objectPosition to the thumbnail and dialog", () => {
    render(
      <Avatar
        src="/photo.jpg"
        alt="Alisson Henriques"
        size={64}
        expandedSize="300px"
        objectPosition="top"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Alisson Henriques" });
    expect(trigger.style.width).toBe("64px");

    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(dialog.style.width).toBe("300px");

    const images = screen.getAllByRole("img", { name: "Alisson Henriques" });
    images.forEach((img) => expect(img.style.objectPosition).toBe("top"));
  });
});
