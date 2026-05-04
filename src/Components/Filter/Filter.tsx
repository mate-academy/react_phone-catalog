import './Filter.scss';
import Arrow from '../../images/icons/arrow-down.svg';

export const Filter = () => {
  return (
    <div className="filter">
      <div className="filter__newest">
        <div className="filter__newest-title">Sort by</div>
        <button type="button" className="filter__newest-checkbox">
          <div className="filter__newest-option">
            <span className="filter__newest-option-text">Newest</span>
            <img
              src={Arrow}
              alt="Arrow"
              className="filter__newest-option-arrow"
            />
          </div>
        </button>
      </div>

      <div className="filter__newest">
        <div className="filter__newest-title">Items on page</div>
        <button type="button" className="filter__newest-checkbox">
          <div className="filter__newest-option">
            <span className="filter__newest-option-text">16</span>
            <img
              src={Arrow}
              alt="Arrow"
              className="filter__newest-option-arrow"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
