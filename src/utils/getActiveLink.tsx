import classNames from 'classnames';

interface Props {
  isActive: boolean;
  element: string;
  styles: CSSModuleClasses;
}

export const getActiveLink = ({ isActive, element, styles }: Props): string => {
  return classNames(styles[element], {
    [styles[`${element}--active`]]: isActive,
  });
};
