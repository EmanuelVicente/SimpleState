import {
  login,
  getModels,
  getCurrencies,
  getPayment,
  simulateInvestment,
  storeInvestment,
  url,
} from "./apis";

const mockUrl = url;

// Mock para fetch
global.fetch = jest.fn();

describe("Api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("makes a POST request with correct data to login", async () => {
      const email = "test@example.com";
      const password = "password";

      await login({ email, password });

      expect(fetch).toHaveBeenCalledWith(mockUrl + "login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
    it("makes a GET request with correct data to getModels", async () => {
      await getModels();

      expect(fetch).toHaveBeenCalledWith(mockUrl + "getModels", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
    it("makes a GET request with correct data to getCurrencies", async () => {
      await getCurrencies();

      expect(fetch).toHaveBeenCalledWith(mockUrl + "getCurrencies", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
    it("makes a GET request with correct data to getPayment", async () => {
      await getPayment();

      expect(fetch).toHaveBeenCalledWith(mockUrl + "getPayment", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
    it("makes a POST request with correct data to simulateInvestment", async () => {
      const data = { amount: 10, currencyId: 1, modelId: 2 };
      await simulateInvestment({ amount: 10, currencyId: 1, modelId: 2 });

      expect(fetch).toHaveBeenCalledWith(mockUrl + "simulateInvestment", {
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
    });
    it("makes a POST request with correct data to storeInvestment", async () => {
      const mockFiles = [
        new File(["file1 content"], "file1.txt", { type: "text/plain" }),
        new File(["file2 content"], "file2.txt", { type: "text/plain" }),
      ];

      // Simulamos una respuesta exitosa de la API
      (fetch as jest.Mock).mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce({ message: "Success" }),
      });

      await storeInvestment(mockFiles);

      expect(fetch).toHaveBeenCalledWith(mockUrl + "storeInvestment", {
        method: "POST",
        body: expect.any(FormData),
      });
    });
  });
});
