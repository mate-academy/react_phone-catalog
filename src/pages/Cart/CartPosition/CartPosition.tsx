import './CartPosition.scss';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { PageContext } from '../../../utils/GlobalContext';
import { Loader } from '../../../components/Loader';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

type Props = {
  product: Product,
};

export const CartPosition: React.FC<Props> = ({
  product: {
    image,
    name,
    price,
    id,
    phoneId,
  },
}) => {
  const {
    cardList,
    setCardList,
    totalCount,
    setTotalCount,
  } = useContext(PageContext);
  const [positionCount, setPositionCount] = useLocalStorage(id, 1);
  const [isLoading, setIsLoading] = useState(false);

  const deletePosition = () => {
    setIsLoading(true);

    setCardList(cardList.filter(el => el !== id));
    setPositionCount(1);

    setIsLoading(false);
  };

  const handlePlusCount = () => {
    setIsLoading(true);

    setPositionCount(positionCount + 1);

    const newTotalCount = totalCount.map(el => {
      const newCount = el.count + 1;

      if (el.id === id) {
        return { ...el, count: newCount };
      }

      return el;
    });

    setTotalCount(newTotalCount);

    setIsLoading(false);
  };

  const handleMinusCount = () => {
    setIsLoading(true);

    setPositionCount(positionCount - 1);

    setTotalCount(totalCount.map(el => {
      const newCount = el.count - 1;

      if (el.id === id) {
        return { ...el, count: newCount };
      }

      return el;
    }));

    setIsLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="cart-position">
      {isLoading
        ? (<Loader />)
        : (
          <>
            <button
              type="button"
              aria-label="delete button"
              className="cart-position__delete-button"
              onClick={deletePosition}
              data-cy="cartDeleteButton"
            />

            <div className="cart-position__photo-container">
              <img
                className="cart-position__photo"
                src={`./new/${image}`}
                alt={`${name}`}
              />
            </div>

            <Link
              className="cart-position__name"
              to={`/phones/${phoneId}`}
              onClick={scrollToTop}
            >
              {name}
            </Link>

            <div className="cart-position__count">
              <button
                type="button"
                aria-label="minus count"
                className={classNames('cart-position__count-button',
                  'cart-position__count-button--minus',
                  {
                    'cart-position__count-button--disabled':
                      positionCount === 1,
                  })}
                onClick={handleMinusCount}
                disabled={positionCount === 1}
              />

              <p
                className="cart-position__count-number"
                data-cy="productQauntity"
              >
                {positionCount}
              </p>

              <button
                type="button"
                aria-label="plus count"
                className="cart-position__count-button
                cart-position__count-button--plus"
                onClick={handlePlusCount}
              />
            </div>

            <p className="cart-position__price">{`$${price}`}</p>
          </>
        )}
    </div>
  );
};
