import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/apis";
import { Input } from "../../components/Input";
import "./Login.css";

type Form = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({ email: "", password: "" });

  const isValidated = useMemo(
    () => !!form.email && !!form.password,
    [form.email, form.password]
  );

  const onSubmit = async () => {
    const resp = await login(form);
    const data = await resp.json();
    if (!!data.token) {
      localStorage.setItem("token", data.token);
      navigate("/invest");
    }
  };

  return (
    <div className="login-container">
      <img
        className="simple-state-logo"
        width="100"
        height="200"
        alt={"Simple State"}
        src={require("../../assets/simpleState.png")}
      />
      <span className="login-title">Iniciar sesión</span>
      <div className="login-form">
        <Input
          label="Correo electronico"
          classname="login-email-input"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          value={form.email}
        />
        <Input
          label="Contraseña"
          classname="login-password-input"
          isPassword
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          value={form.password}
        />
        <span className="login-forget-password">¿Olvidaste tu contraseña?</span>
        <button
          className={`button-primary login-button ${
            isValidated ? "button-primary-validated" : ""
          }`}
          onClick={onSubmit}
          disabled={!isValidated}
          data-testid="button-submit"
        >
          Ingresar
        </button>
      </div>
      <span className="login-already-register">
        ¿Ya tienes cuenta? <span>inicia sesión</span>
      </span>
    </div>
  );
};
