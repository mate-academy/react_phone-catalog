import { NavLink, useLocation } from 'react-router-dom';
import style from './ProductConfigurator.module.scss';
import { Button } from '../../../../shared/ui/Button';
import { IconId, IconStyles } from '../../../../types/icons';
import { ProductSpecs, Spec } from '../../../../shared/components/ProductSpecs';
import { ProductDetails } from '../../../../types/Product';
import { useCart } from '../../../../store/CartContext';
import { useFavourites } from '../../../../store/FavouritesContext';
import {
  adaptedProductCard,
  adaptedProductConfig,
} from '../../../../utils/adapters';
import { ButtonAdd } from '../../../../shared/ui/ButtonAdd';
import { getNavLinkClass } from '../../../../utils/helpers/getNavLinkClass';

type Props = {
  productDetails: ProductDetails;
  productSpec: Spec[];
};

export const ProductConfigurator: React.FC<Props> = ({
  productDetails,
  productSpec,
}) => {
  const cart = useCart();
  const fav = useFavourites();
  const adaptedProduct = adaptedProductConfig(productDetails, productSpec);
  const adaptedFav = adaptedProductCard(productDetails);

  const liked = fav.state.favourite.some(prod => prod.id === adaptedFav.id);
  const icon = liked ? IconId.HeartFilled : IconId.Heart;

  const colorMap: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#DC1921',
    green: '#34C759',
    gold: '#FCDBC1',
    blue: '#007AFF',
    purple: '#8E7CC3',
    yellow: '#FFCC00',
    midnight: '#011635',
    coral: '#F97171',
    pink: '#FFC0CB',
    rosegold: '#B76E79',
    sierrablue: '#A7C1D9',
    graphite: '#41424C',
    spaceblack: '#505150',
    spacegray: '#4A4A4A',
    midnightgreen: '#004953',
  };

  const names = ['Screen', 'Resolution', 'Processor', 'Ram'];

  const filteredSpecs = productSpec.filter(a => names.includes(a.name));

  const location = useLocation();
  const pathname = location.pathname;
  const lastDashIndex = pathname.lastIndexOf('-');
  const parts = pathname.split('-');

  return (
    <div className={style.mainControls}>
      <div className={style.colorsGroup}>
        <div className={style.colors}>
          <p className={style.groupTitle}>Available colors</p>
          <ul className={style.list}>
            {productDetails.colorsAvailable.map((color, index) => {
              const newId = pathname.substring(0, lastDashIndex + 1) + color;
              const backgroundColor = colorMap[color.toLowerCase()] || '#ccc';

              return (
                <NavLink
                  to={newId}
                  className={({ isActive }) =>
                    getNavLinkClass(
                      isActive,
                      style.colorActive,
                      style.colorItem,
                    )
                  }
                  key={index}
                >
                  <span className={style.colorLink} style={{ backgroundColor }}>
                    {color}
                  </span>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <p className={style.productId}>ID: 802390</p>
      </div>
      <div className={style.capacity}>
        <p className={style.groupTitle}>Select capacity</p>
        <div className={style.list}>
          {productDetails.capacityAvailable.map((capacity, index) => {
            parts[parts.length - 2] = capacity;
            const newPath = parts.join('-').toLowerCase();

            return (
              <NavLink
                to={newPath}
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    style.capacityActive,
                    style.capacityLink,
                  )
                }
                key={index}
              >
                {capacity}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className={style.cardButtons}>
        {productDetails.priceDiscount ? (
          <div className={style.priceWrapper}>
            <p className={style.priceDiscount}>
              ${productDetails.priceDiscount}
            </p>
            <p className={style.priceRegularSmall}>
              ${productDetails.priceRegular}
            </p>
          </div>
        ) : (
          <p className={style.priceRegular}>${productDetails.priceRegular}</p>
        )}
        <div className={style.buttonsWrapper}>
          <ButtonAdd
            title="Add to cart"
            onClick={() => cart.addToCard(adaptedProduct)}
          />
          <Button
            onClick={() => fav.toggleFav(adaptedFav)}
            iconId={icon}
            filled={liked ? IconStyles.Filled : undefined}
            type="like"
          />
        </div>
      </div>

      <ProductSpecs specs={filteredSpecs} />
    </div>
  );
};
