import camelToSentenceCase from "utils/camelToSentenceCase";

type Props = {
  errorText?: string;
  label: string;
  register: any;
  name: string;
};

export const Input = ({ label, errorText = "", register, name }: Props) => (
  <div className="form-group">
    <label htmlFor={label.toLowerCase()}>{camelToSentenceCase(label)}</label>
    <input
      name={name}
      ref={register}
      placeholder={`Enter ${camelToSentenceCase(label)}`}
      type="text"
      className="form-control parsley-validated parsley-error"
      data-required="true"
    />
    {errorText && (
      <ul className="parsley-error-list" style={{ display: "block" }}>
        <li className="required" style={{ display: "list-item" }}>
          This value is required.
        </li>
      </ul>
    )}
  </div>
);

export default Input;
