/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import { Icon } from '../Icon';
import './BuyButtons.scss';

type Props = {
  containerHeight?: number
  classNames?: string;
};

export const BuyButtons: React.FC<Props> = ({
  classNames,
  containerHeight = 40,
}) => {
  const isFavorite = true;

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
            'card-buttons__add--selected': false,
          },
        )}
      >
        Add to card
      </button>

      <button
        type="button"
        className="card-buttons__like"
        style={{
          width: containerHeight,
        }}
      >
        <Icon
          iconName={isFavorite ? 'favourites' : 'favouritesCounter'}
          classNames="card-buttons__like-icon"
        />
      </button>
    </div>
  );
};
