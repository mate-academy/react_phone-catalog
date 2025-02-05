import classNames from 'classnames';
import { NavLinkRenderProps } from 'react-router-dom';

interface Props {
  isActive: NavLinkRenderProps;
  element: string;
  styles: CSSModuleClasses;
}

export const getActiveLink = ({ isActive, element, styles }: Props): string => {
  return classNames(styles[element], {
    [styles[`${element}--active`]]: isActive,
  });
};
