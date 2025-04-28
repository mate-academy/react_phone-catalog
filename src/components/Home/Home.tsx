import { useEffect } from 'react';
import { loadComponentStyles } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Home: React.FC = () => {
  const { currentTheme, loadedStyles } = useSelector((state: RootState) =>
    state.theme);
  const componentName = 'Home';
  const styleKey = `${componentName}_${currentTheme}`;
  const dispatch = useDispatch();

/*   useEffect(() => {
    // Завантажуємо стилі, якщо вони ще не завантажені
    if (!loadedStyles[styleKey]) {
      dispatch(loadComponentStyles({ componentName, theme: currentTheme }));
    }
  }, []); */

  return (
    <div className="main">
      <h1>Home PAGE</h1>
    </div>
  );
};
