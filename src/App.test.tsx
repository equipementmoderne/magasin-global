import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

it("renders title", () => {
  render(<App />);
  expect(screen.getByText("Vite + React")).toBeInTheDocument();
});

it("renders counter", () => {
  render(<App />);
  expect(screen.getByText("count is 0")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "count is 0" }));
  expect(screen.getByText("count is 1")).toBeInTheDocument();
});
