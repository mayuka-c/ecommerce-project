import axios from "axios";
import { MemoryRouter } from "react-router";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { HomePage } from "./HomePage";

vi.mock("axios");

describe("HomePage Component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              keywords: ["socks", "sports", "apparel"],
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              createdAt: "2025-08-10T18:30:19.994Z",
              updatedAt: "2025-08-10T18:30:19.994Z",
            },
            {
              keywords: ["sports", "basketballs"],
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              createdAt: "2025-08-10T18:30:19.995Z",
              updatedAt: "2025-08-10T18:30:19.995Z",
            },
          ],
        };
      }

      const productContainers = await screen.findAllByTestId(
        "product-container"
      );

      expect(productContainers.length).toBe(2);
      expect(
        within(productContainers[0]).getByText(
          "Black and Gray Athletic Cotton Socks - 6 Pairs"
        )
      ).toBeInTheDocument();
            expect(
        within(productContainers[1]).getByText(
          "Intermediate Size Basketball"
        )
      ).toBeInTheDocument();
    });
  });

  it("displays product correctly", () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
  });
});
