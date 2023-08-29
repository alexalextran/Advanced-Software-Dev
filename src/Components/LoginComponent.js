import "react-icons";
import { IconContext } from "react-icons";

const LoginField = (props) => {
  return (
    <div className="inputFieldWithIcon">
      <IconContext.Provider
        value={{ size: "1.5em", className: "loginIconStyle" }}
      >
        {props.icon}
      </IconContext.Provider>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
};

export default LoginField;
