import { PaymentData, SimulateInvestmentData } from "../models/investment";

export const currenciesMock = {
  "1": "USD",
  "2": "ARS",
  "3": "MXN",
};

export const modelsMock = {
  "1": "Retiro Flex (6% anual)",
  "2": "Renta Mensual (8% anual)",
  "3": "Renta Final (10% anual)",
};

export const paymentMock: PaymentData = {
  account_number: "XXXX",
  account_type: "TYPE",
  bank: "Santander",
  cbu: "00000000000000000",
  cuit: "20-3242154-5",
  name: "Banco X",
};

export const useLoaderDataMock = {
  currencies: currenciesMock,
  models: modelsMock,
  payment: paymentMock,
};

export const simulateInvestmentDataMock: { data: SimulateInvestmentData } = {
  data: {
    amount: "10",
    currency_id: 1,
    profitability_amount: 20,
    profitability: 50,
    mont_term: 70,
    parking: "two month",
    payment: "end of year",
  },
};
