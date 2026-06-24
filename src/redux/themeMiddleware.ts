// eslint-disable-next-line import/no-extraneous-dependencies
import { Middleware } from 'redux';
import { loadComponentStyles, setTheme } from './themeSlice';

const componentsWithThemeStyles = ['Navbar', 'Home'];

export const themeMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (setTheme.match(action)) {
    const theme = action.payload;

    componentsWithThemeStyles.forEach(componentName => {
      store.dispatch(loadComponentStyles({ componentName, theme }));
    });
  }

  return result;
};
