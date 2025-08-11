import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formats 1999 cents as $19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });

  it("displays 2 decimals", () => {
    expect(formatMoney(1000)).toBe("$10.00");
    expect(formatMoney(2090)).toBe("$20.90");
    expect(formatMoney(100)).toBe("$1.00");
  });
});
