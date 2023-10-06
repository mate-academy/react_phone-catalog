import './Back.scss';

const Back = () => {
  const onClickHandle = () => {
    window.history.back();
  };

  return (
    <button
      className="back"
      onClick={onClickHandle}
      type="button"
    >
      <div className="back__icon-block">
        <img className="back__icon" src="./icons/left.svg" alt="icon" />
      </div>

      <span className="back__name">
        Back
      </span>
    </button>
  );
};

export default Back;
