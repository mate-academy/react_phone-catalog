import React, { useContext } from 'react';
import { UpdatedProduct } from '../../Types/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

interface Props {
  cardId?: string;
  item: UpdatedProduct;
  discount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ cardId, item, discount }) => {
  const imageUrl = `https://denlysiak.github.io/react_phone-catalog/${item.image}`;
  const { isDark } = useContext(DarkModeContext);

  const details = {
    Screen: item.screen,
    Capacity: item.capacity,
    RAM: item.ram,
  };

  const updatedItem = {
    ...item,
    quantity: 1,
    discount: discount ? true : false,
  };

  return (
    <div
      id={`card_${!cardId ? 'list' : cardId}`}
      className={classNames('card carousel__card', {
        'card--is-Dark': isDark,
      })}
    >
      <div
        className={classNames('card__top', {
          'card__top--is-Dark': isDark,
        })}
      >
        <div
          className="card__img"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />

        <Link
          to={`/${item.category}/${item.itemId}`}
          className={classNames('card__title', {
            'card__title--is-Dark': isDark,
          })}
        >
          {item.name}
        </Link>

        <div className="card__price-container">
          {discount && <p className="card__price">{`$${item.price}`}</p>}

          <p
            className={classNames('card__price', {
              'card__price--discount': discount,
              'card__price--is-Dark': isDark,
            })}
          >{`$${item.fullPrice}`}</p>
        </div>
      </div>

      <div className="card__bottom">
        <div className="card__details">
          {Object.entries(details).map(detail => (
            <div key={detail[0]} className="card__detail">
              <p className="card__text">{detail[0]}</p>

              <p
                className={classNames('card__text card__text--property', {
                  'card__text--is-Dark': isDark,
                })}
              >
                {detail[1]}
              </p>
            </div>
          ))}
        </div>

        <ActionButtons item={updatedItem} />
      </div>
    </div>
  );
};
