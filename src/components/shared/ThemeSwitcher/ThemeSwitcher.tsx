import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext'; // Шлях до вашого глобального контексту
import { MaterialUISwitch } from '../sunSwitch/switchDesign'; // Шлях до вашого компонента перемикача

export const ThemeSwitcher = () => {
  const { isSunSelected, setIsSunSelected } = useContext(GlobalContext);

  const handleChange = () => {
    setIsSunSelected(prev => !prev); // Змінюємо стан з використанням попереднього значення
  };

  return (
    <div>
      <MaterialUISwitch
        checked={isSunSelected}
        onChange={handleChange}
        name="themeSwitch"
      />
    </div>
  );
};
