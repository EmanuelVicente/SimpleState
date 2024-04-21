import "./Header.css";

export const Header = () => {
  return (
    <div className="header-container">
      <img
        className="simple-state-logo"
        width="200"
        height="30"
        alt={"Simple State"}
        src={require("../../assets/simpleState.png")}
      />
    </div>
  );
};
