/* eslint-disable max-len */
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductsContext } from '../components/ProductsContext';

export const Bag: React.FC = () => {
  const { search } = useLocation();
  const {
    products, cartIds, increase, decrease, deleteId,
  } = useContext(ProductsContext);
  const bagProducts = products.filter(p => cartIds.map(arr => arr[0]).includes(p.id));

  const count = (id: string) => {
    const iterable = cartIds.find(arr => arr[0] === id);

    if (iterable) {
      return iterable[1];
    }

    return 0;
  };

  const totalCount = cartIds.map(arr => arr[1]).reduce((sum, cur) => sum + cur, 0);
  const total = cartIds.map(arr => arr[1] * (bagProducts.find(p => p.id === arr[0])?.price || 0)).reduce((sum, cur) => sum + cur);

  if (bagProducts.length <= 0) {
    return <h1>Nothing in your cart, why not add something? 🙂</h1>;
  }

  return (
    <div className="bag">
      <Link
        className="pathLine link bag__back"
        to={{ pathname: '..', search }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#313237" />
        </svg>
        Back
      </Link>

      <h1 className="item__title bag__title">
        Cart
      </h1>

      <div className="bag__cards">
        <div className="bag__list">
          {bagProducts.map(product => (
            <div key={product.id} className="bag__card">
              <button
                className="bag__card-delete"
                type="button"
                aria-label="delete"
                onClick={() => deleteId(product.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" fill="#B4BDC4" />
                </svg>
              </button>

              <Link
                className="link"
                to={{ pathname: `/${product.type}s/${product.id}`, search }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.imageUrl}
                  className="bag__card-img"
                />
              </Link>

              <Link
                className="bag__card-title link"
                to={{ pathname: `/${product.type}s/${product.id}`, search }}
              >
                {product.name}
              </Link>

              <div className="bag__counter">
                <button
                  className="pageSection__button bag__counter-btn"
                  type="button"
                  aria-label="decrease"
                  onClick={() => decrease(product.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" fill="#B4BDC4" />
                  </svg>
                </button>

                <span className="bag__counter-num">
                  {count(product.id)}
                </span>

                <button
                  className="pageSection__button bag__counter-btn"
                  type="button"
                  aria-label="increase"
                  onClick={() => increase(product.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z" fill="#313237" />
                  </svg>
                </button>
              </div>

              <div className="bag__card-price">{`$${product.price * count(product.id)}`}</div>

            </div>
          ))}

        </div>
        <div className="bag__checkout">
          <h1 className="bag__checkout-price">{`$${total}`}</h1>
          <p className="bag__checkout-subtext">
            {`Total for ${totalCount} items`}
          </p>
          <div className="card__line" />
          <button
            className="bag__checkout-button"
            type="button"
          >
            Checkout
          </button>

        </div>
      </div>
    </div>
  );
};
