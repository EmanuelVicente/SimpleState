import { act, fireEvent, render, screen } from "@testing-library/react";
import { useLoaderData } from "react-router-dom";
import { simulateInvestment } from "../../api/apis";
import { simulateInvestmentDataMock, useLoaderDataMock } from "../../mock/mock";
import { Invest } from "./";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useLoaderData: jest.fn(),
  };
});

jest.mock("../../api/apis", () => {
  return {
    simulateInvestment: jest.fn(),
  };
});

describe("Invest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLoaderData as jest.Mock).mockReturnValue(useLoaderDataMock);
    (simulateInvestment as jest.Mock).mockImplementation(async () => {
      return { json: jest.fn(async () => simulateInvestmentDataMock) };
    });
  });

  it("should render First Card", () => {
    render(<Invest />);
    expect(screen.getByTestId("predata-content")).toBeInTheDocument();
    expect(screen.queryByTestId("simulate-invest")).not.toBeInTheDocument();
    expect(screen.queryByTestId("payment-method")).not.toBeInTheDocument();
  });

  it("should render Second Card", async () => {
    render(<Invest />);
    expect(screen.getByTestId("predata-content")).toBeInTheDocument();
    expect(screen.queryByTestId("simulate-invest")).not.toBeInTheDocument();
    expect(screen.queryByTestId("payment-method")).not.toBeInTheDocument();

    const selects = screen.getAllByTestId("select-component");
    const inputAmount = screen.getByTestId("input");
    const selectModel = selects[0];
    const selectCurrency = selects[1];

    fireEvent.change(selectModel, { target: { value: "1" } });
    fireEvent.change(selectCurrency, { target: { value: "1" } });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(inputAmount, { target: { value: "1000" } });
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(screen.getByTestId("predata-content")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-simulate")).not.toBeInTheDocument();
    expect(screen.getByTestId("simulate-invest")).toBeInTheDocument();
    expect(screen.queryByTestId("payment-method")).not.toBeInTheDocument();
  });

  it("should render Third Card", async () => {
    render(<Invest />);
    expect(screen.getByTestId("predata-content")).toBeInTheDocument();
    expect(screen.queryByTestId("simulate-invest")).not.toBeInTheDocument();
    expect(screen.queryByTestId("payment-method")).not.toBeInTheDocument();

    const selects = screen.getAllByTestId("select-component");
    const inputAmount = screen.getByTestId("input");
    const selectModel = selects[0];
    const selectCurrency = selects[1];

    fireEvent.change(selectModel, { target: { value: "1" } });
    fireEvent.change(selectCurrency, { target: { value: "1" } });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(inputAmount, { target: { value: "1000" } });
    });

    expect(screen.getByTestId("predata-content")).toBeInTheDocument();
    expect(screen.getByTestId("simulate-invest")).toBeInTheDocument();
    expect(screen.queryByTestId("payment-method")).not.toBeInTheDocument();

    const buttonContinue = screen.getByTestId(
      "invest-continue-button"
    ) as HTMLButtonElement;

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(buttonContinue);
    });

    expect(screen.queryByTestId("predata-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("simulate-invest")).not.toBeInTheDocument();
    expect(screen.getByTestId("payment-method")).toBeInTheDocument();
  });
});
