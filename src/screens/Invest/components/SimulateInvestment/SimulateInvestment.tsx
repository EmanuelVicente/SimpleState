import { SimulateInvestmentData } from "../../../../models/investment";
import "./SimulateInvestment.css";

type SimulateInvestmentProps = {
  data?: SimulateInvestmentData;
  classname?: string;
};

export const SimulateInvestment = ({
  data,
  classname = "",
}: SimulateInvestmentProps) => {
  if (!data) return <div data-testid="empty-simulate" />;

  return (
    <div
      className={`invest-card simulate-invest ${classname}`}
      data-testid="simulate-invest"
    >
      <div className="simulate-investment-content">
        <span>
          Total de la inversión: <span>USD {data.amount}</span>
        </span>
        <span>
          Ganancia anual estimada: <span>USD {data.profitability_amount}</span>
        </span>
        <div className="simulate-line" />
      </div>
      <div className="simulate-investment-content">
        <span>
          Tipo de inversión: <span> No existe la data</span>
        </span>
        <span>
          Tasa anual: <span>{data.profitability}%</span>
        </span>
        <span>
          Tiempo de inversión: <span>{data.mont_term} meses</span>
        </span>
        <span>
          Podes retirarte: <span>{data.parking}</span>
        </span>
        <span>
          Recibirás al final del plazo:{" "}
          <span>USD {data.amount + data.profitability_amount}</span>
        </span>
        <span>
          Cuándo cobras las ganancias: <span>{data.payment}</span>
        </span>
      </div>
    </div>
  );
};
