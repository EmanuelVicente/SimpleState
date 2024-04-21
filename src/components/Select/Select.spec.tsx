import { fireEvent, render, screen } from "@testing-library/react";
import { Select } from "./";

const options = [
  { key: "opt1", value: "opt1", label: "option1" },
  { key: "opt2", value: "opt2", label: "option2" },
];
const label = "label test";
const extraText = "extra text";
const onChange = jest.fn();

describe("Select", () => {
  beforeEach(() => {
    //jest.clearAllMocks();
  });
  it("should render Select with its options", () => {
    render(
      <Select options={options} label={label} onChange={() => {}} value="" />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(options[0].label)).toBeInTheDocument();
    expect(screen.getByText(options[1].label)).toBeInTheDocument();
  });

  it("should call onChange function", () => {
    render(
      <Select options={options} label={label} onChange={onChange} value="" />
    );
    const selectElement = screen.getByTestId("select-component");
    fireEvent.change(selectElement, { target: { value: "option2" } });

    expect(onChange).toBeCalled();
  });

  it("should render extraText", () => {
    render(
      <Select
        options={options}
        label={label}
        onChange={onChange}
        value=""
        extraText={extraText}
      />
    );

    expect(screen.getByText(extraText)).toBeInTheDocument();
  });

  it("should't render extraText", () => {
    render(
      <Select options={options} label={label} onChange={onChange} value="" />
    );

    expect(screen.queryByText(extraText)).not.toBeInTheDocument();
  });
});
