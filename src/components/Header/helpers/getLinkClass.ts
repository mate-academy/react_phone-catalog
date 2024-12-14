import classNames from 'classnames';

type IsActive = {
  isActive: boolean;
};

type GetLinkClass = (
  baseClass: string,
  activeClass: string,
) => (params: IsActive) => string;

// eslint-disable-next-line prettier/prettier
export const getLinkClass: GetLinkClass = (baseClass, activeClass) =>
  ({ isActive }) =>
    classNames(baseClass, {
      [activeClass]: isActive,
    });
