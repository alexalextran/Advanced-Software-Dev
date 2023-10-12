const AnalyticsField = (props) => {
  return (
    <div className="AnalyticsElement">
      <label for={props.name}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </div>
  );
};

export default AnalyticsField;
