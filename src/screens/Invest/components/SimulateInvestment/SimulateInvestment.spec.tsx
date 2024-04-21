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
    const { data } = simulateInvestmentDataMock;
    render(<SimulateInvestment data={data} />);
    expect(screen.getByText(`USD ${data.amount}`)).toBeInTheDocument();
    expect(
      screen.getByText(`USD ${data.profitability_amount}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${data.profitability}%`)).toBeInTheDocument();
    expect(screen.getByText(`${data.mont_term} meses`)).toBeInTheDocument();
    expect(screen.getByText(data.parking)).toBeInTheDocument();
    expect(
      screen.getByText(`USD ${data.amount + data.profitability_amount}`)
    ).toBeInTheDocument();
    expect(screen.getByText(data.payment)).toBeInTheDocument();
  });
});
