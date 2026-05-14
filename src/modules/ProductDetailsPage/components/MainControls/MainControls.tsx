import classNames from 'classnames';
import s from './MainControls.module.scss';
import { PrimaryButton } from '../../../shared/PrimaryButton';
import { AddToFovouritesButton } from '../../../shared/AddToFovouritesButton';
import { TechSpecsList } from '../TechSpecsList';
import type { ProductFull } from '../../../../types/ProductFull';
import { colors } from '../../../../utils/colors';
import { Line } from '../../../shared/Line';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../../CartContext';
import { FavouritesContext } from '../../../../FavouritesContext';
import type { Product } from '../../../../types/Product';

type Props = {
  product: ProductFull;
  searchProduct: (
    namespaceId: string,
    color: string,
    capacity: string,
  ) => string | undefined;
  catalogProduct: Product | undefined;
};

export const MainControls = ({
  product,
  searchProduct,
  catalogProduct,
}: Props) => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const {
    namespaceId,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
  } = product;

  if (catalogProduct === undefined) {
    return;
  }

  const isInCart = (id: string) => {
    return !!cart.find(item => item.id === id);
  };

  const isFavourites = (id: string) => {
    return !!favourites.find(item => item.itemId === id);
  };

  return (
    <div className={s.controls}>
      <div className={s.controls__colorsBlock}>
        <p className={s.controls__title}>Available colors</p>
        <div className={s.controls__colors}>
          {colorsAvailable.map(col => (
            <div
              key={col}
              className={classNames([
                s.controls__colorButton,
                {
                  [s['controls__colorButton--active']]: color === col,
                },
              ])}
              onClick={() => {
                const productId = searchProduct(namespaceId, col, capacity);

                if (productId) {
                  navigate(`/product/${productId}`, { replace: true });
                }
              }}
            >
              <div
                style={{
                  backgroundColor: colors[col.split(' ').join('')],
                }}
                className={s.controls__color}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <Line />

      <div className={s.controls__capacitiesBlock}>
        <p className={s.controls__title}>Select capacity</p>
        <div className={s.controls__capacities}>
          {capacityAvailable.map(cap => (
            <div
              key={cap}
              className={classNames([
                s.controls__capacity,
                {
                  [s['controls__capacity--active']]: cap === capacity,
                },
              ])}
              onClick={() => {
                const productId = searchProduct(namespaceId, color, cap);

                if (productId) {
                  navigate(`/product/${productId}`, { replace: true });
                }
              }}
            >
              {cap}
            </div>
          ))}
        </div>
      </div>

      <Line />

      <div className={s.controls__prises}>
        <div className={s.controls__priceDiscount}>${priceDiscount}</div>
        <div className={s.controls__priceRegular}>${priceRegular}</div>
      </div>
      <div className={s.controls__buttons}>
        {isInCart(catalogProduct.itemId) ? (
          <PrimaryButton selected>Added to cart</PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={() =>
              setCart(prev => [
                ...prev,
                {
                  id: catalogProduct.itemId,
                  quantity: 1,
                  product: catalogProduct,
                },
              ])
            }
          >
            Add to cart
          </PrimaryButton>
        )}
        <AddToFovouritesButton
          selected={isFavourites(catalogProduct.itemId)}
          onClick={() =>
            setFavourites(prev =>
              isFavourites(catalogProduct.itemId)
                ? prev.filter(item => item.itemId !== catalogProduct.itemId)
                : [...prev, catalogProduct],
            )
          }
        />
      </div>
      <div>
        <TechSpecsList specs={{ screen, resolution, processor, ram }} />
      </div>
    </div>
  );
};
