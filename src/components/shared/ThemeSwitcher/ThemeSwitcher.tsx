import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { MaterialUISwitch } from '../sunSwitch/switchDesign';

export const ThemeSwitcher = () => {
  const { isSunSelected, setIsSunSelected } = useContext(GlobalContext);

  const handleChange = () => {
    setIsSunSelected(prev => !prev);
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
