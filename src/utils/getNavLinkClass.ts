import cn from 'classnames';
import type { GetNavLinkClass } from 'types/getNavLinkClassTypes';

export const getNavLinkClass: GetNavLinkClass = (base, active, addition) => {
  return ({ isActive }) => cn(base, { [active]: isActive }, addition);
};
