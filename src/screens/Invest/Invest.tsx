import React, { useEffect, useMemo, useState } from "react";
import "./Invest.css";
import { Header } from "../../components/Header";
import { PreData } from "./components/PreData";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg";
import { simulateInvestment, storeInvestment } from "../../api/apis";
import { PaymentData, SimulateInvestmentData } from "../../models/investment";
import { SimulateInvestment } from "./components/SimulateInvestment";
import { PaymentMethod } from "./components/PaymentMethod";
import { ModalRegisteredInvest } from "./components/ModalRegisteredInvest";

export type ScreenInvestData = {
  currencies: { [key: string]: string };
  models: { [key: string]: string };
  payment: PaymentData;
};

export type InvestFormData = {
  currency: string;
  model: string;
  amount: string;
};

export const Invest = () => {
  const [form, setForm] = useState<InvestFormData>({
    amount: "",
    currency: "",
    model: "",
  });
  const [simulateData, setSimulateData] = useState<SimulateInvestmentData>();
  const [files, setFiles] = useState<File[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const getSimulate = async () => {
      const { amount, currency, model } = form;
      if (!!amount && !!currency && !!model) {
        const resp = await simulateInvestment({
          amount: Number(amount),
          currencyId: Number(currency),
          modelId: Number(model),
        });
        const data = await resp.json();
        if (data) {
          setSimulateData(data.data);
        }
      }
    };
    getSimulate();
  }, [form, form.amount, form.currency, form.model]);

  const disabledButtonSubmit = useMemo(() => {
    if (step === 1) {
      return !acceptTerms || !files.length;
    }
    return !simulateData;
  }, [acceptTerms, files.length, simulateData, step]);

  const onSubmit = async () => {
    if (step === 1) {
      const resp = await storeInvestment(files);
      const data = await resp.json();

      if (data.status === "success") {
        setModalVisible(true);
      }
    } else {
      return setStep((prev) => prev + 1);
    }
  };

  const onGoBack = () => {
    if (step > 0) {
      return setStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="invest-container">
        <Header />
        <div style={{ marginRight: "48px", marginLeft: "48px" }}>
          <div className="invest-content">
            <div className="invest-go-back-container" onClick={onGoBack}>
              <ArrowLeft />
              <span>Volver</span>
            </div>
            <span className="invest-title">Nueva Inversion</span>
            {step === 0 && (
              <>
                <PreData
                  amount={form.amount}
                  currency={form.amount}
                  model={form.model}
                  onChangeValue={setForm}
                />
                <SimulateInvestment
                  data={simulateData}
                  classname="invest-simulate-investment"
                />
              </>
            )}
            {step === 1 && (
              <>
                <PaymentMethod
                  amount={form.amount}
                  files={files}
                  setFiles={setFiles}
                />
                <div className="invest-checkbox-container">
                  <input
                    checked={acceptTerms}
                    className="checkbox"
                    type="checkbox"
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>
                    Leí y acepto <span>Términos y condiciones*</span>
                  </span>
                </div>
              </>
            )}
            <button
              className={`invest-button button-primary ${
                !disabledButtonSubmit ? "button-primary-validated" : ""
              }`}
              onClick={onSubmit}
              data-testid="invest-continue-button"
              disabled={disabledButtonSubmit}
            >
              {step === 1 ? "Finalizar" : "Continuar"}
            </button>
          </div>
        </div>
      </div>
      <ModalRegisteredInvest
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};
