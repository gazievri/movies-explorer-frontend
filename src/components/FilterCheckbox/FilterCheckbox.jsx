import "./FilterCheckbox.css";

const FilterCheckbox = ({ isCheckBoxActive, handleCheckBoxClick }) => {
  const handleOnClick = () => {
    handleCheckBoxClick();
  };

  return (
    <div className="filtercheckbox">
      <div className="filtercheckbox__handler" onClick={handleOnClick}>
        <div
          className={`filtercheckbox__handler-circle ${
            isCheckBoxActive ? "filtercheckbox__handler-circle_active" : ""
          }`}
        ></div>
      </div>
      <p className="filtercheckbox__title">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
