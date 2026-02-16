import classNames from 'classnames';

type GetLinkClass = (
  base: string,
  active: string,
) => ({ isActive }: { isActive: boolean }) => string;

export const getLinkClass: GetLinkClass = (base, active) => {
  return ({ isActive }) => {
    return classNames(base, { [active]: isActive });
  };
};
