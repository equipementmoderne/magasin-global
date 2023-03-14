import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FirestoreError } from "firebase/firestore";
import { UseQueryResult } from "react-query";

import { Record } from "./utils/select";
import App from "./App";
import * as useGetList from "./hooks/useGetList";

const mutate = vi.fn();
vi.mock("./hooks/useCreate", () => ({
  default: () => ({
    mutate,
  }),
}));

describe("App", () => {
  describe("without products", () => {
    beforeEach(() => {
      vi.spyOn(useGetList, "default").mockImplementation(
        () =>
          ({
            data: [],
          } as UseQueryResult<never[], FirestoreError>)
      );
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("renders title", () => {
      render(<App />);
      expect(screen.getByText("Magasin Global")).toBeInTheDocument();
    });

    it("mutates product on click", () => {
      render(<App />);
      fireEvent.click(screen.getByRole("button", { name: "Create a product" }));
      expect(mutate).toHaveBeenCalledWith({});
    });

    it("renders counter", () => {
      render(<App />);
      expect(screen.getByText("Product count is 0")).toBeInTheDocument();
    });
  });

  describe("with products", () => {
    beforeEach(() => {
      vi.spyOn(useGetList, "default").mockImplementation(
        () =>
          ({
            data: [{ id: "1" }, { id: "2" }],
          } as UseQueryResult<Record<unknown>[], FirestoreError>)
      );
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("renders counter", () => {
      render(<App />);
      expect(screen.getByText("Product count is 2")).toBeInTheDocument();
    });
  });
});
