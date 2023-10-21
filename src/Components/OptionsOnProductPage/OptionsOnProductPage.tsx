import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addItem, removeItem } from '../../redux/slices/cartSlice';
import {
  addItemToFavorite,
  removeItemFromFavorite,
} from '../../redux/slices/favoriteSlice';
import { RootState } from '../../redux/store';
import { Colors } from '../../types/Colors';
import { DetailsOfProducts } from '../../types/DetailsOfProduct';
import { Product } from '../../types/Product';
import { beautyColors } from '../../variables/variables';
import './OptionsOnProductPage.scss';

type PropTypes = {
  selectedProduct: Product;
  product: DetailsOfProducts;
};

export const OptionsOnProductPage: React.FC<PropTypes> = ({
  product,
  selectedProduct,
}) => {
  const {
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    colorsAvailable,
    color = '',
    capacity = '',
    capacityAvailable,
    id: detailedId,
  } = product;

  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname;

  const itemsInFavorite
    = useSelector((state: RootState) => state.favorite.itemInFavorite);
  const items = useSelector((state: RootState) => state.cart.items);
  const isProductInCart = items.some(item => item.phoneId === detailedId);
  const isItemsInFavorite = itemsInFavorite
    .some(item => item.phoneId === detailedId);

  const {
    id,
    image,
    price,
    name,
    phoneId,
  } = selectedProduct;

  const handleClick
  = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    e.stopPropagation();

    const itemForCart = {
      phoneId,
      name,
      price,
      image,
      id,
      quantity: 1,
    };

    switch (type) {
      case 'cart':
        if (isProductInCart) {
          dispatch(removeItem(id));
        } else {
          dispatch(addItem(itemForCart));
        }

        break;

      case 'favorite':
        if (isItemsInFavorite) {
          dispatch(removeItemFromFavorite(id));
        } else {
          dispatch(addItemToFavorite(selectedProduct));
        }

        break;

      default:
        break;
    }
  };

  return (
    <div className="options__general-block">
      <div className="options__choose-settings">
        <p className="options__text options__colors-title">
          Available colors
        </p>
        <ul className="options__colors-list">
          {colorsAvailable?.map(colour => {
            const isSelectedColor = color === colour;
            const newPathColor = path.replace(color, colour);

            return (
              <Link
                to={{
                  pathname: `../${newPathColor}`,
                }}
                key={colour}
              >
                <li className={classNames(
                  'options__color-wrapper',
                  {
                    'options__color-wrapper--active': isSelectedColor,
                  },
                )}
                >
                  <div
                    className="options__color"
                    style={{ backgroundColor: `${beautyColors[colour as keyof Colors]}` }}
                  />
                </li>
              </Link>
            );
          })}
        </ul>
        <p className="options__text item__colors-title">
          Select capacity
        </p>
        <div className="options__buttons-box">
          {capacityAvailable?.map(parametr => {
            const isSelectedCapacity = capacity === parametr;
            const newPathRam = path
              .replace(capacity.toLowerCase(), parametr.toLowerCase());

            return (
              <Link
                to={{
                  pathname: `../${newPathRam}`,
                }}
                key={parametr}
              >
                <button
                  className={classNames(
                    'options__button',
                    {
                      'options__button--active': isSelectedCapacity,
                    },
                  )}
                  type="button"
                >
                  {parametr}
                </button>
              </Link>
            );
          })}
        </div>
        <div className="options__price-box">
          <h1 className="options__price">
            {`$${priceDiscount}`}
          </h1>
          <p className="options__price--old">
            {`$${priceRegular}`}
          </p>
        </div>
        <div className="options__buttons-add-box">
          <button
            className={classNames(
              'options__button-buy',
              {
                'options__button-buy--active': isProductInCart,
              },
            )}
            type="button"
            onClick={(e) => handleClick(e, 'cart')}
          >
            {isProductInCart ? 'Added to cart ' : 'Add to cart'}
          </button>
          <button
            className={classNames(
              'options__button-heart',
              {
                'options__button-heart--active': isItemsInFavorite,
              },
            )}
            type="button"
            onClick={(e) => handleClick(e, 'favorite')}
          >
            <div className={classNames(
              'options__button-img',
              {
                'options__button-img--active': isItemsInFavorite,
              },
            )}
            />
          </button>
        </div>
        <div className="options__desc">
          <div className="options__box-left">
            <p className="options__desc-title">Screen</p>
            <p className="options__desc-title">Resolution</p>
            <p className="options__desc-title">Processor</p>
            <p className="options__desc-title">RAM</p>
          </div>
          <div className="options__box-right">
            <p className="options__desc-char">{screen}</p>
            <p className="options__desc-char">{resolution}</p>
            <p className="options__desc-char">{processor}</p>
            <p className="options__desc-char">{ram}</p>
          </div>
        </div>
      </div>
      <div className="options__id-wrapper">
        <div className="options__id">
          ID: 802390
        </div>
      </div>
    </div>
  );
};
