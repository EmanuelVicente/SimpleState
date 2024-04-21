import {
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  SetStateAction,
} from "react";
import "./PaymentMethod.css";
import { ScreenInvestData } from "../../Invest";
import { useLoaderData } from "react-router-dom";
import { ReactComponent as Clip } from "../../../../assets/icons/clip.svg";
import { ReactComponent as Cross } from "../../../../assets/icons/cross.svg";

type PaymentMethodProps = {
  classname?: string;
  amount?: string;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export const PaymentMethod = ({
  classname,
  amount = "",
  files,
  setFiles,
}: PaymentMethodProps) => {
  const { payment } = useLoaderData() as ScreenInvestData;

  const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files) as File[];
    setFiles((prev) => [...prev, ...files]);
  };

  const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  const onDeleteFile = (name: string) => {
    setFiles((prev) => prev.filter((p) => p.name !== name));
  };

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files
      ? (Array.from(event.target.files) as File[])
      : [];
    setFiles((prev) => [...prev, ...files]);
  };

  return (
    <div
      className={`invest-card simulate-invest ${classname}`}
      data-testid="payment-method"
    >
      <div className="payment-method-content">
        <span className="payment-method-method-title">
          Forma de pago: Transferencia bancaria
        </span>
        <div>
          <span className="payment-method-amount-to-pay">
            Monto a pagar <span>USD {amount}</span>
          </span>
        </div>
      </div>
      <div className="payment-method-content">
        <span className="payment-method-subtitle payment-method-subtitle-hidden">
          Datos para transferencia
        </span>
      </div>
      <div className="payment-method-content">
        <span>
          Banco: <span>{payment.bank}</span>
        </span>
        <span>
          CUIT: <span>{payment.cuit}</span>
        </span>
        <span>
          Tipo de cuenta: <span>{payment.account_type}</span>
        </span>
        <span>
          Numero de cuenta: <span>{payment.account_number}</span>
        </span>
        <span>
          Razon social: <span>{payment.name}</span>
        </span>
        <span>
          CBU: <span>{payment.cbu}</span>
        </span>
      </div>
      <div className="payment-method-drop-content">
        <span className="payment-method-subtitle">
          Adjuntar comprobante de pago
        </span>
        <div
          className="payment-method-drop"
          onDrop={onDrop}
          onDragOver={onDragOver}
          data-testid="payment-method-drop"
        >
          <input
            className="payment-method-drop-input"
            type="file"
            id="fileInput"
            multiple
            onChange={onSelectFile}
            data-testid="payment-method-drop-input"
          />
          <Clip />
          <label htmlFor="fileInput" className="payment-method-drop-label">
            Arrastra la imagen o adjuntala aqui
          </label>
        </div>
        <div className="payment-method-tag-container">
          {Array.from(files).map((e) => (
            <div>
              <span>{e.name}</span>
              <Cross
                className="payment-method-tag-cross"
                onClick={() => onDeleteFile(e.name)}
                data-testid="payment-method-cross"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
