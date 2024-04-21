import { isAuthenticated } from "./";

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

describe("Input", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });
  it("should return false", () => {
    expect(isAuthenticated()).toBeFalsy();
  });
  it("should return true", () => {
    localStorage.setItem("token", "tokenMock");
    expect(isAuthenticated()).toBeTruthy();
  });
});
