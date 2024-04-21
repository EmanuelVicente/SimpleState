import { useNavigate } from "react-router-dom";
import { login } from "../../api/apis";
import { Login } from "./";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  };
});

jest.mock("../../api/apis", () => {
  return {
    login: jest.fn(),
  };
});

const email = "test@gmail.com";
const paswword = "testgmailcom";

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Login", () => {
    render(<Login />);
    expect(screen.getByText("Correo electronico")).toBeInTheDocument();
    expect(screen.getByText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText("Ingresar")).toBeInTheDocument();
    expect(screen.getByText("¿Ya tienes cuenta?")).toBeInTheDocument();
  });

  it("should complete field and submit", async () => {
    render(<Login />);

    const buttonSubmit = screen.getByTestId(
      "button-submit"
    ) as HTMLButtonElement;
    const inputs = screen.getAllByTestId("input");
    const inputEmail = inputs[0];
    const inputPassword = inputs[1];
    (login as jest.Mock).mockImplementation(async () => {
      return { json: jest.fn(async () => ({ token: "token" })) };
    });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    expect(inputEmail.getAttribute("value")).toEqual("");
    expect(inputPassword.getAttribute("value")).toEqual("");
    expect(buttonSubmit.disabled).toEqual(true);

    fireEvent.change(inputEmail, { target: { value: email } });
    fireEvent.change(inputPassword, { target: { value: paswword } });

    expect(inputEmail.getAttribute("value")).toEqual(email);
    expect(inputPassword.getAttribute("value")).toEqual(paswword);
    expect(buttonSubmit.disabled).toEqual(false);

    fireEvent.click(buttonSubmit);

    await Promise.resolve();
    await Promise.resolve();

    expect(navigate).toHaveBeenCalledWith("/invest");
  });

  it("should't navigate if there isnt token answer", async () => {
    render(<Login />);

    const buttonSubmit = screen.getByTestId(
      "button-submit"
    ) as HTMLButtonElement;
    const inputs = screen.getAllByTestId("input");
    const inputEmail = inputs[0];
    const inputPassword = inputs[1];
    (login as jest.Mock).mockImplementation(async () => {
      return { json: jest.fn(async () => ({})) };
    });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    fireEvent.change(inputEmail, { target: { value: email } });
    fireEvent.change(inputPassword, { target: { value: paswword } });
    fireEvent.click(buttonSubmit);

    await Promise.resolve();
    await Promise.resolve();

    expect(navigate).not.toHaveBeenCalledWith("/invest");
  });
});
