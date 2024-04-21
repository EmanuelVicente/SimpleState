import { Auth } from "./";
import { render, screen } from "@testing-library/react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { Login } from "../../screens/Login";

jest.mock("../../utils/auth", () => {
  return {
    isAuthenticated: jest.fn(() => {}),
  };
});

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    Navigate: jest.fn(() => {}),
  };
});

jest.mock("../../screens/Login", () => {
  return {
    __esModule: true,
    A: true,
    Login: jest.fn(() => {}),
  };
});

describe("Auth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render child if it is Auth", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);
    render(
      <Auth>
        <span>{"auth"}</span>
      </Auth>
    );
    expect(screen.getByText(`auth`)).toBeInTheDocument();
  });

  it("should render login if it is not Auth but is islogin flag true", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(false);
    (Login as jest.Mock).mockReturnValue(<div data-testid="login" />);
    render(
      <Auth isLogin>
        <span>{"auth"}</span>
      </Auth>
    );
    expect(screen.getByTestId(`login`)).toBeInTheDocument();
  });
  it("should render navigate if it is not Auth and is islogin flag false", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(false);
    (Navigate as jest.Mock).mockReturnValue(<div data-testid="navigate" />);

    render(
      <Auth>
        <span>{"auth"}</span>
      </Auth>
    );
    expect(screen.getByTestId(`navigate`)).toBeInTheDocument();
  });
});
