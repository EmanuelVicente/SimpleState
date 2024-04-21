import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Input } from "./";

describe("Input", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render Input with the correct label and value", () => {
    render(<Input label="test label" onChange={() => {}} value="test value" />);
    expect(screen.getByText("test label")).toBeInTheDocument();
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input.value).toBe("test value");
  });
  it("should render Input and onChange works", async () => {
    const onChange = jest.fn();
    render(<Input label="test label" onChange={onChange} value="test value" />);
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input.value).toBe("test value");

    fireEvent.change(input, { target: { value: "new value" } });

    await waitFor(() => {
      expect(onChange).toBeCalled();
    });
  });
  it("should render Input with type password and Icon", async () => {
    const onChange = jest.fn();
    render(
      <Input
        label="test label"
        onChange={onChange}
        value="test value"
        isPassword
      />
    );
    const iconClose = screen.queryByTestId("input-icon-eye-close");
    const iconOpen = screen.getByTestId("input-icon-eye-open");
    const input = screen.getByTestId("input") as HTMLInputElement;

    expect(iconClose).not.toBeInTheDocument();
    expect(iconOpen).toBeInTheDocument();
    expect(input.type).toBe("password");

    fireEvent.click(iconOpen);

    const iconCloseNew = screen.getByTestId("input-icon-eye-close");

    await waitFor(() => {
      expect(iconCloseNew).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(iconOpen).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(input.type).toBe("text");
    });

    fireEvent.click(iconCloseNew);

    const iconOpenNew = screen.getByTestId("input-icon-eye-open");

    await waitFor(() => {
      expect(iconCloseNew).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(iconOpenNew).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(input.type).toBe("password");
    });
  });
});
