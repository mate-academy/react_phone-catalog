/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import './BuyButtons.scss';

type Props = {
  containerHeight?: number
  classNames?: string;
};

export const BuyButtons: React.FC<Props> = ({
  classNames,
  containerHeight = 40,
}) => {
  return (
    <div
      className={cn(
        'card-buttons',
        classNames,
      )}
      style={{
        height: containerHeight,
      }}
    >
      <button
        type="button"
        className="card-buttons__add"
      >
        Add to card
      </button>

      <button
        type="button"
        className="card-buttons__like"
        style={{
          width: containerHeight,
        }}
      />
    </div>
  );
};
