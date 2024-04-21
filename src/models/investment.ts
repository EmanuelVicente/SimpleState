export type SimulateInvestmentData = {
  amount: string;
  currency_id: 1;
  profitability_amount: number;
  profitability: number;
  mont_term: number;
  parking: string;
  payment: string;
};

export type PaymentData = {
  bank: string;
  account_type: string;
  account_number: string;
  cuit: string;
  name: string;
  cbu: string;
};
