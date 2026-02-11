import classNames from 'classnames';

export const getButtonClass = {
  secondary(darkTheme: boolean) {
    return classNames(`button button--secondary`, {
      'button--secondary-darkTheme': darkTheme,
    });
  },
  main(darkTheme: boolean) {
    return classNames(`button button--main`, {
      'button--main-darkTheme': darkTheme,
    });
  },
};
