import classNames from 'classnames';

type Styles = {
  link: string;
  isActive: string;
};

type IsActiveProps = {
  isActive: boolean;
};

export const getActiveLinkClass = (styles: Styles) => {
  return ({ isActive }: IsActiveProps) => {
    return classNames(styles.link, {
      [styles.isActive]: isActive,
    });
  };
};
