/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Product } from '../../helpers/types/Product';
import { TechSpecs } from '../../helpers/types/TechSpecs';
import { CartedProduct } from '../CartContext';

type Props = {
  product: Product | undefined;
  characteristicsArr: TechSpecs[];
  detailsOrder: ('price' | 'characteristics' | 'buttons')[];
  priceClassName?: string;
  buttonsClassName?: string;
  characteristicsClassName?: string;
};

export const MainProductDetails: React.FC<Props> = ({
  product,
  characteristicsArr,
  detailsOrder,
  priceClassName = '',
  buttonsClassName = '',
  characteristicsClassName = '',
}) => {
  const { cartedProducts, setCartedProducts } = useContext(CartedProduct);
  const { favProducts, setFavProducts } = useContext(CartedProduct);
  const [isSelectedCart, setSelectedCart] = useState(
    cartedProducts.some(
      (pr: Product) => pr.itemId === product?.itemId,
    ),
  );
  const [isSelectedFav, setSelectedFav] = useState(
    favProducts.some(
      (pr: Product) => pr.itemId === product?.itemId,
    ),
  );

  const toggleProduct = (
    key: string,
    productArr: Product[] | [],
    setNewArr: (value: React.SetStateAction<Product[] | []>) => void,
    isSelected: boolean,
    setNewStatus: (value: React.SetStateAction<boolean>) => void,
  ) => {
    if (!isSelected && product) {
      window.localStorage.setItem(key, JSON.stringify(
        [...productArr, { ...product, count: 1 }],
      ));

      setNewArr([...productArr, { ...product, count: 1 }]);
    } else {
      const arr = productArr.filter(
        (pr: Product) => pr.itemId !== product?.itemId,
      );

      window.localStorage.setItem(
        key, JSON.stringify(arr),
      );
      setNewArr(arr);
    }

    setNewStatus(!isSelected);
  };

  const toggleCartedProduct = () => {
    toggleProduct(
      'cartedProducts',
      cartedProducts,
      setCartedProducts,
      isSelectedCart,
      setSelectedCart,
    );
  };

  const toggleFavProduct = () => {
    toggleProduct(
      'favProducts',
      favProducts,
      setFavProducts,
      isSelectedFav,
      setSelectedFav,
    );
  };

  return (
    <div className="product-card__info main-product-details">
      <p
        className={`main-product-details__price ${priceClassName}`}
        style={{
          order: `${detailsOrder.indexOf('price') + 1}`,
        }}
      >
        ${product?.price}
        <span className="main-product-details__sale">
          ${product?.fullPrice}
        </span>
      </p>

      <ul
        className={
          `main-product-details__characteristics-container
          ${characteristicsClassName}`
        }
        style={{
          order: `${detailsOrder.indexOf('characteristics') + 1}`,
        }}
      >
        {characteristicsArr.map(item => (
          <li key={item.name} className="main-product-details__characteristic">
            {item.name}
            <span className="main-product-details__characteristic-value">
              {item.value}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={`main-product-details__buttons ${buttonsClassName}`}
        style={{
          order: `${detailsOrder.indexOf('buttons') + 1}`,
        }}
      >
        <button
          type="button"
          className={classNames(
            'main-product-details__add-to-cart',
            'icon-button',
            { 'main-product-details--is-selected-cart': isSelectedCart },
          )}
          onClick={toggleCartedProduct}
        >
          {isSelectedCart ? 'Selected' : 'Add to cart'}
        </button>
        <button
          type="button"
          aria-label="Mute volume"
          data-cy="addToFavorite"
          className={classNames(
            'main-product-details__add-to-favorites',
            'icon-button',
            { 'main-product-details--is-selected-fav': isSelectedFav },
          )}
          onClick={toggleFavProduct}
        />
      </div>
    </div>
  );
};
