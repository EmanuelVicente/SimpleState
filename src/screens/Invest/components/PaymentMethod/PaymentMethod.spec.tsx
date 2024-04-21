import { fireEvent, render, screen } from "@testing-library/react";
import { useLoaderData } from "react-router-dom";
import { PaymentMethod } from "./PaymentMethod";
import { PaymentData } from "../../../../models/investment";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useLoaderData: jest.fn(),
  };
});

const paymentMock: PaymentData = {
  account_number: "XXXX",
  account_type: "TYPE",
  bank: "Santander",
  cbu: "00000000000000000",
  cuit: "20-3242154-5",
  name: "Banco X",
};

const file = new File(["content"], "file.txt", {
  type: "text/plain",
});

describe("PaymentMethod", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLoaderData as jest.Mock).mockReturnValue({
      payment: paymentMock,
    });
  });
  it("should preload selects", async () => {
    render(<PaymentMethod files={[]} setFiles={() => {}} />);
    expect(
      screen.getByText("Forma de pago: Transferencia bancaria")
    ).toBeInTheDocument();
  });
  it("should show tag File", async () => {
    render(<PaymentMethod files={[file]} setFiles={() => {}} />);
    expect(screen.getByText("file.txt")).toBeInTheDocument();
  });
  it("should delete tag File", async () => {
    const setFilesMock = jest.fn();
    render(<PaymentMethod files={[file]} setFiles={setFilesMock} />);

    const cross = screen.getByTestId("payment-method-cross");

    fireEvent.click(cross);

    expect(setFilesMock).toBeCalledTimes(1);
  });
  it("should call onDrop", async () => {
    const setFilesMock = jest.fn();
    render(<PaymentMethod files={[file]} setFiles={setFilesMock} />);

    const dropBox = screen.getByTestId("payment-method-drop");

    fireEvent.drop(dropBox, { dataTransfer: { files: [file] } });
    fireEvent.dragOver(dropBox);

    expect(setFilesMock).toBeCalledTimes(1);
  });

  it("should call onSelect", async () => {
    const setFilesMock = jest.fn();
    render(<PaymentMethod files={[file]} setFiles={setFilesMock} />);

    const input = screen.getByTestId("payment-method-drop-input");

    fireEvent.change(input, { target: { files: [file] } });

    expect(setFilesMock).toBeCalledTimes(1);
  });
});
