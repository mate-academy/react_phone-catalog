import classNames from 'classnames';

export const themeClass = (light: boolean) => {
  return (classnames: string) => {
    return classNames(classnames, { 'is-light': light, 'is-dark': !light });
  };
};
