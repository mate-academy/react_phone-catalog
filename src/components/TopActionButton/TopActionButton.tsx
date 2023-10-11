import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from '../Context';
import { Icon } from '../Icon';
import { getUniqueItems } from '../../helpers/getUniqueItems';
import { TopActionButtonType } from '../../types/PageNavLink';
import { IconType } from '../../types/Icon';
import './TopActionButton.scss';

type Props = {
  type: TopActionButtonType;
};

export const TopActionButton: React.FC<Props> = ({ type }) => {
  const { favorite, cart } = useContext(Context);

  const countType = (type === 'favorite')
    ? favorite
    : cart;

  const countItems = getUniqueItems(countType, (item) => item.id);

  return (
    <div
      className={classNames(
        'top-actions__item',
        { 'top-actions__item--favorite': type === 'favorite' },
        { 'top-actions__item--cart': type === 'cart' },
      )}
    >
      <Link
        to={`/${type}`}
        className="top-actions__link"
      >
        {type === 'favorite'
          && (
            <Icon
              type={IconType.FAVORITE}
            />
          )}

        {type === 'cart'
          && (
            <Icon
              type={IconType.CART}
            />
          )}

        {countType
          && countType.length > 0
          && (
            <span className="top-actions__item-count">
              {countItems.length}
            </span>
          )}
      </Link>
    </div>
  );
};
