export const url =
  "https://02ede33a-b196-40a7-87ea-40cc76ac4399.mock.pstmn.io/test/";

export const login = (data: { email: string; password: string }) =>
  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

export const getModels = () =>
  fetch(url + "getModels", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

export const getCurrencies = () =>
  fetch(url + "getCurrencies", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

export const getPayment = () =>
  fetch(url + "getPayment", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

export const simulateInvestment = (data: {
  modelId: number;
  currencyId: number;
  amount: number;
}) =>
  fetch(url + "simulateInvestment", {
    method: "POST",
    body: JSON.stringify({
      model_id: data.modelId,
      currency_id: data.currencyId,
      amount: data.amount,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

export const storeInvestment = (files: File[]) => {
  const formdata = new FormData();
  files.forEach((element) => {
    formdata.append("receipt", element);
  });

  return fetch(url + "storeInvestment", {
    method: "POST",
    body: formdata,
  });
};
