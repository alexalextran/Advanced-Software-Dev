const AnalyticsField = (props) => {
  return (
    <div className="AnalyticsElement">
      <label>{props.label}</label>
      <input 
        type={props.type}
        name={props.name}
        placeholder={props.placeholder} 
        disabled={props.disabled}
      />
    </div>
  );
};

export default AnalyticsField;