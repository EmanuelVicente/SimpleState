import { fireEvent, render, screen } from "@testing-library/react";
import { useLoaderData } from "react-router-dom";
import { PreData } from "./PreData";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useLoaderData: jest.fn(),
  };
});

describe("PreData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLoaderData as jest.Mock).mockReturnValue({
      currencies: { "1": "USD", "2": "ARS", "3": "MXN" },
      models: {
        "1": "Retiro Flex (6% anual)",
        "2": "Renta Mensual (8% anual)",
        "3": "Renta Final (10% anual)",
      },
    });
  });
  it("should preload selects", async () => {
    const mockOnChangeValue = jest.fn();
    render(
      <PreData
        amount=""
        currency=""
        model=""
        onChangeValue={mockOnChangeValue}
      />
    );
    expect(mockOnChangeValue).toHaveBeenCalledTimes(1);
  });

  it("should call onChange when change values", async () => {
    const mockOnChangeValue = jest.fn();
    render(
      <PreData
        amount=""
        currency=""
        model=""
        onChangeValue={mockOnChangeValue}
      />
    );

    const selects = screen.getAllByTestId("select-component");
    const inputAmount = screen.getByTestId("input");
    const selectModel = selects[0];
    const selectCurrency = selects[1];

    fireEvent.change(selectModel, { target: { value: "1" } });
    fireEvent.change(selectCurrency, { target: { value: "1" } });
    fireEvent.change(inputAmount, { target: { value: "1000" } });

    expect(mockOnChangeValue).toHaveBeenCalledTimes(4);
  });
});
