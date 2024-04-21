import { fireEvent, render, screen } from "@testing-library/react";
import { ModalRegisteredInvest } from "./";

const text =
  "Nuestro equipo estará validando el pago. En unos minutos, podrás ver el estado de la inversión en tus movimientos.";
describe("ModalRegisteredInvest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render modal", async () => {
    render(<ModalRegisteredInvest isVisible={true} onClose={() => {}} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
  it("shouldnt render modal", async () => {
    render(<ModalRegisteredInvest isVisible={false} onClose={() => {}} />);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });
  it("shouldnt press onClose", async () => {
    const onCloseMock = jest.fn();
    render(<ModalRegisteredInvest isVisible={true} onClose={onCloseMock} />);

    const cross = screen.getByTestId("modal-registered-cross");

    fireEvent.click(cross);

    expect(onCloseMock).toBeCalledTimes(1);
  });
});
