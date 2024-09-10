import { Link, useLocation } from 'react-router-dom';

import { toggleMenu } from '../../features/sideBar/sideBarSlice';

import { useAppDispatch } from '../../hooks';

import styles from './SecondaryNavLink.module.scss';
const {
  secondaryNavLink,
  secondaryNavLink__isActive,
  secondaryNavLink__iconWrapper,
  secondaryNavLink__iconWrapper__hasAmount,
  secondaryNavLink__iconImg,
  secondaryNavLink__amount,
  secondaryNavLink__amount__hasAmount,
} = styles;

type SideBarLinkProps = {
  image: string;
  url: string;
  name: 'favourites' | 'cart';
  amount?: number;
};

export const SecondaryNavLink = ({
  image,
  url,
  name,
  amount,
}: SideBarLinkProps) => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  // #region conditions
  const img = amount ? `/icons/${name}-counter.svg` : image;
  const locatedInCategory = pathname.includes(name);
  // #endregion

  return (
    <Link
      to={url}
      className={`
        ${secondaryNavLink} 
        ${locatedInCategory && secondaryNavLink__isActive}
      `}
      onClick={handleClick}
      state={{ from: 'page', previousPath: pathname }}
    >
      <div
        className={`
        ${secondaryNavLink__iconWrapper} 
        ${amount && secondaryNavLink__iconWrapper__hasAmount}
      `}
      >
        <img
          src={img}
          alt={`${name} icon link`}
          className={secondaryNavLink__iconImg}
        />

        {!!amount && (
          <p
            className={`
            ${secondaryNavLink__amount} 
            ${amount > 9 && secondaryNavLink__amount__hasAmount}
          `}
          >
            {amount}
          </p>
        )}
      </div>
    </Link>
  );
};
