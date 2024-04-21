import { ChangeEventHandler } from "react";
import "./Select.css";

type Option = {
  key: string;
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  classname?: string;
  options: Option[];
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  extraText?: string;
};

export const Select = ({
  label,
  classname = "",
  options,
  value,
  onChange,
  extraText,
}: SelectProps) => {
  return (
    <div className={`select-container ${classname}`}>
      <label className="select-label">{label}</label>
      <div className={"select-content"}>
        <select
          className="select-component"
          data-testid="select-component"
          value={value}
          onChange={onChange}
        >
          {options.map((opt) => (
            <option className="select-option" key={opt.key} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {!!extraText && <span className="select-extra-text">{extraText}</span>}
      </div>
    </div>
  );
};
