import React, { Dispatch, useEffect } from "react";
import "./PreData.css";
import { useLoaderData } from "react-router-dom";
import { InvestFormData, ScreenInvestData } from "../../Invest";
import { Select } from "../../../../components/Select";
import { Input } from "../../../../components/Input";

type PreDataProps = {
  currency: string;
  model: string;
  amount: string;
  onChangeValue: Dispatch<React.SetStateAction<InvestFormData>>;
};

export const PreData = ({
  amount,
  onChangeValue,
  currency,
  model,
}: PreDataProps) => {
  const data = useLoaderData() as ScreenInvestData;

  useEffect(() => {
    onChangeValue((prev) => ({
      ...prev,
      currency: Object.entries(data.currencies)?.[0]?.[0],
      model: Object.entries(data.models)?.[0]?.[0],
    }));
  }, [data.currencies, data.models, onChangeValue]);

  return (
    <div className="invest-card">
      <div className="predata-content" data-testid="predata-content">
        <Select
          classname="predata-input1"
          options={Object.entries(data.models).map((d) => ({
            key: d[0],
            value: d[0],
            label: d[1],
          }))}
          label="Tipo de inversión*"
          onChange={(e) =>
            onChangeValue((prev) => ({ ...prev, model: e.target.value }))
          }
          value={model}
          extraText="Ver más sobre tipos de inversión"
        />
        <Select
          classname="predata-input2"
          options={Object.entries(data.currencies).map((d) => ({
            key: d[0],
            value: d[0],
            label: d[1],
          }))}
          label="Moneda*"
          onChange={(e) =>
            onChangeValue((prev) => ({ ...prev, currency: e.target.value }))
          }
          value={currency}
        />
        <Input
          classname="predata-input3"
          label="Monto a invertir*"
          onChange={(e) =>
            onChangeValue((prev) => ({ ...prev, amount: e.target.value }))
          }
          value={amount}
          type="number"
        />
      </div>
    </div>
  );
};
