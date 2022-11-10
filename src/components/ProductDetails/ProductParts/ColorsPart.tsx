import { buttonColors } from '../../../utils/buttonColors';

export const ColorsPart = () => (
  <>
    <p className="
      is-size-7
      has-text-grey
      has-text-weight-semibold
      mb-2
      "
    >
      Available colors
    </p>
    <div className="buttons">
      {buttonColors.map(color => (
        <button
          key={color}
          type="button"
          className="button is-responsive is-rounded p-1"
          aria-label="button"
        >
          <div
            style={{ background: color }}
            className="productDetails__button"
          />
        </button>
      ))}
    </div>
  </>
);
