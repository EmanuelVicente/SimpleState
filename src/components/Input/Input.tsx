import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useMemo,
  useState,
} from "react";
import "./Input.css";
import { ReactComponent as EyeClose } from "../../assets/icons/eye-close.svg";
import { ReactComponent as EyeOpen } from "../../assets/icons/eye-open.svg";

type InputProps = {
  label: string;
  classname?: string;
  isPassword?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  type?: HTMLInputTypeAttribute;
};

export const Input = ({
  label,
  classname = "",
  isPassword = false,
  onChange,
  value,
  type = "text",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const iconPassword = useMemo(() => {
    if (isPassword) {
      return showPassword ? (
        <EyeClose
          className="input-icon"
          onClick={() => setShowPassword(false)}
          data-testid="input-icon-eye-close"
        />
      ) : (
        <EyeOpen
          className="input-icon"
          onClick={() => setShowPassword(true)}
          data-testid="input-icon-eye-open"
        />
      );
    }
    return null;
  }, [isPassword, showPassword]);

  const typeInput = useMemo<HTMLInputTypeAttribute>(() => {
    if (isPassword && !showPassword) {
      return "password";
    }
    return type;
  }, [isPassword, showPassword, type]);

  return (
    <div className={`input-container ${classname}`}>
      <label className="input-label">{label}</label>
      <div className={"input-content"}>
        <input
          className="input-component"
          type={typeInput}
          onChange={onChange}
          value={value}
          data-testid="input"
        />
        {iconPassword}
      </div>
    </div>
  );
};
