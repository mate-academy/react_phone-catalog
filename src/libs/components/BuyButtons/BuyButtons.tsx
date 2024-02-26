/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import { Icon } from '../Icon';

import './BuyButtons.scss';

type Props = {
  containerHeight?: number;
  classNames?: string;
  add: () => void;
  isAddButtonSelected?: boolean;
  like: () => void;
  isFavoriteButtonSelected?: boolean;
};

export const BuyButtons: React.FC<Props> = ({
  classNames,
  containerHeight = 40,
  add,
  isAddButtonSelected = false,
  like,
  isFavoriteButtonSelected = false,
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
        className={cn(
          'card-buttons__add',
          {
            'card-buttons__add--selected': isAddButtonSelected,
          },
        )}
        onClick={add}
      >
        Add to cart
      </button>

      <button
        type="button"
        className="card-buttons__like"
        style={{
          width: containerHeight,
        }}
        onClick={like}
      >
        <Icon
          iconName={
            isFavoriteButtonSelected
              ? 'favouritesCounter'
              : 'favourites'
          }
          classNames="card-buttons__like-icon"
        />
      </button>
    </div>
  );
};
