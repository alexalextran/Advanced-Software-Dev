const AnalyticsField = (props) => {
  return (
    <div className="AnalyticsElement">
      <label>{props.label}</label>
      <span style={{color: "red"}}>{props.placeholder}</span>
    </div>
  );
};

export default AnalyticsField;
