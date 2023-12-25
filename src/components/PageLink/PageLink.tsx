import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'classnames';
import { PageLinkType } from '../../types/PageLinkType';

import './PageLink.scss';

type Props = NavLinkProps & {
  linkType: PageLinkType
  quantity?: number
};
export const PageLink: React.FC<Props> = ({
  linkType,
  quantity,
  children,
  ...props
}) => (
  <NavLink
    {...props}
    className={({ isActive }) => cn(
      'PageLink',
      {
        PageLink_text: linkType === PageLinkType.TEXT,
      },
      {
        PageLink_heart: linkType === PageLinkType.HEART,
      },
      {
        PageLink_cart: linkType === PageLinkType.CART,
      },
      {
        PageLink_active: isActive,
      },
    )}
  >
    {quantity && quantity > 0 && (
      <span className="PageLink-Quantity">
        {quantity}
      </span>
    )}
    {children}
  </NavLink>
);
