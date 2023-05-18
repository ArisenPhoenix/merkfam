import { VERIFY_VALUE } from "../../../../../Helpers/Verifications/verify";

const Input = (props) => {
  return (
    <input
      value={VERIFY_VALUE(props.value, "")}
      placeholder={VERIFY_VALUE(props.placeholder, "")}
      ref={props.ref}
      required={VERIFY_VALUE(props.required, null)}
      type={VERIFY_VALUE(props.type, "")}
      onChange={VERIFY_VALUE(props.onChange, () => {})}
      name={VERIFY_VALUE(props.name)}
      readOnly={VERIFY_VALUE(props.readOnly, false)}
      hidden={VERIFY_VALUE(props.hidden)}
      autoComplete={VERIFY_VALUE(props.autoComplete, null)}
      className={VERIFY_VALUE(props.className, null)}
      onClick={VERIFY_VALUE(props.onClick, null)}

      min={props.type == "number" ? props.min : null}
      max={props.type == "number" ? props.max : null}
    />
  );
};

export default Input;
