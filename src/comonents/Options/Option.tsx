import './Option.scss';

export const Option = () => {
  return (
    <div className="options">
      <div className="options__container">
        <p className="text text--small text--gray">
          Available colors
        </p>
        <div className="options__select-container">
          <p
            className="
                options__color-button options__color-button--selected"
          >
            <span className="options__color options__color--red" />
          </p>

          <p
            className="options__color-button"
          >
            <span
              className="options__color options__color--green"
            />
          </p>

          <p
            className="options__color-button"
          >
            <span className="options__color options__color--sec" />
          </p>
        </div>
      </div>

      <div className="options__container options__container--capacity">
        <p className="text text--small text--gray">
          Select capacity
        </p>
        <div className="options__select-container">
          <p className="
                        options__capacity options__capacity--selected"
          >
            64 gb
          </p>

          <p className="options__capacity">
            256 gb
          </p>

          <p className="options__capacity">
            512 gb
          </p>
        </div>
      </div>
    </div>
  );
};
