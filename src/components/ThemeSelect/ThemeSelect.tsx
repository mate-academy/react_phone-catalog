import React from 'react';
import CustomSelect2, {
  CustomSelectOption,
} from '../CustomSelect2/CustomSelect2';
import useThemeStore, { Theme } from '../../stores/useThemeStore';
import styles from './ThemeSelect.module.scss';
import ThemeItem from './components/ThemeItem/ThemeItem';

const themeOptions: CustomSelectOption<Theme>[] = [
  {
    value: 'orange',
    label: 'Orange',
    render: () => <ThemeItem variant="light" color="orange" />,
  },
  {
    value: 'black',
    label: 'Black',
    render: () => <ThemeItem variant="light" color="black" />,
  },
  {
    value: 'blue',
    label: 'Blue',
    render: () => <ThemeItem variant="light" color="blue" />,
  },
  {
    value: 'purple',
    label: 'Purple',
    render: () => <ThemeItem variant="light" color="purple" />,
  },
  {
    value: 'dark',
    label: 'Dark',
    render: () => <ThemeItem variant="dark" color="dark" />,
  },
];

const ThemeSelect: React.FC = () => {
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <div className={styles.themeSelect__wrapper}>
      <CustomSelect2
        options={themeOptions}
        currentValue={currentTheme}
        onChange={setTheme}
      />
    </div>
  );
};

export default ThemeSelect;
