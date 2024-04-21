import { render, screen } from "@testing-library/react";
import { simulateInvestmentDataMock } from "../../../../mock/mock";
import { SimulateInvestment } from "./";

describe("SimulateInvestment", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should empty id there arent data", async () => {
    render(<SimulateInvestment />);
    expect(screen.getByTestId("empty-simulate")).toBeInTheDocument();
  });
  it("should show data", async () => {
    render(<SimulateInvestment data={simulateInvestmentDataMock} />);
    expect(
      screen.getByText(`USD ${simulateInvestmentDataMock.amount}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`USD ${simulateInvestmentDataMock.profitability_amount}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${simulateInvestmentDataMock.profitability}%`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${simulateInvestmentDataMock.mont_term} meses`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(simulateInvestmentDataMock.parking)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `USD ${
          simulateInvestmentDataMock.amount +
          simulateInvestmentDataMock.profitability_amount
        }`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(simulateInvestmentDataMock.payment)
    ).toBeInTheDocument();
  });
});
