// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cartIcon from '../../../../images/icons/icon-cart.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import favouritesIcon from '../../../../images/icons/icon-favourites.svg';

import './IconLinks.scss';

type Props = {
  type: 'favourites' | 'cart',
};

export const IconLinks: React.FC<Props> = ({ type }) => {
  const images = {
    favourites: favouritesIcon,
    cart: cartIcon,
  };

  return (
    <div className="IconLinks">
      <img
        src={images[type]}
        alt={type}
        className="IconLinks__image"
      />
    </div>
  );
};
