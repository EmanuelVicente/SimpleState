import "./ModalRegisteredInvest.css";
import { ReactComponent as Cross } from "../../../../assets/icons/cross.svg";

type ModalRegisteredInvestProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const ModalRegisteredInvest = ({
  isVisible,
  onClose,
}: ModalRegisteredInvestProps) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className={"modal-registered-container"}>
      <div className={"modal-registered-content"}>
        <Cross
          className={"modal-registered-cross"}
          onClick={onClose}
          data-testid="modal-registered-cross"
        />
        <img
          width="120"
          height="120"
          alt={"horn"}
          src={require("../../../../assets/horn.png")}
        />
        <span className={"modal-registered-text"}>
          Ya registramos tu inversión
        </span>
        <span className={"modal-registered-description"}>
          Nuestro equipo estará validando el pago. En unos minutos, podrás ver
          el estado de la inversión en tus movimientos.{" "}
        </span>
        <div className={"modal-registered-button-container"}>
          <button className="button-secondary">Salir</button>
          <button className="button-primary button-primary-validated">
            Ver movimiento
          </button>
        </div>
      </div>
    </div>
  );
};
