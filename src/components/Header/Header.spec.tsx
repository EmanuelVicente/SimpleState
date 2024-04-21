import { render, screen } from "@testing-library/react";
import { Header } from "./";

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render child if it is Auth", () => {
    render(<Header />);
    expect(screen.getByAltText("Simple State")).toBeInTheDocument();
  });
});
