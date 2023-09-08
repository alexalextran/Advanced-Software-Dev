const ProfileFields = (props) => {
  return (
    <div className="profileFormElement">
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

// Keep adding to the list for components that you want to export
export { ProfileFields };
