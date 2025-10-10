import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrandNewModels } from "./BrandNewModels";
import { vi } from "vitest";

describe("BrandNewModels", () => {
  test("renderiza título com a tag correta e exibe children", () => {
    render(
      <BrandNewModels title="Meu Produto" level={2} data-testid="brand-title">
        <div data-testid="child">CHILD</div>
      </BrandNewModels>
    );

    const title = screen.getByTestId("brand-title");
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe("h2");
    expect(title).toHaveTextContent("Meu Produto");

    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("CHILD");
  });

  test("chama onButtonClick ao clicar no botão e na imagem", () => {
    const handleClick = vi.fn();

    render(
      <BrandNewModels
        title="Produto X"
        level={3}
        onButtonClick={handleClick}
        data-testid="brand-title"
      />
    );

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    expect(handleClick).toHaveBeenCalledTimes(1);

    const addFavourites = screen.getByTestId("add-favourites");
    fireEvent.click(addFavourites);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test("tem atributos de acessibilidade e container renderizado", () => {
    render(<BrandNewModels title="Acessível" level={4} />);

    const region = screen.getByRole("region", { name: /brand new models/i });
    expect(region).toBeInTheDocument();

    const title = screen.getByText("Acessível");
    expect(title).toBeInTheDocument();
  });
});
