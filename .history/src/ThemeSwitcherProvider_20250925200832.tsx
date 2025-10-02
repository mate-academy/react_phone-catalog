/* eslint-disable max-len */
type ThemeSwitcherContextType = {
  ma
};

export const ThemeSwitcherContext = React.createContext<ThemeSwitcherContextType>({

});

type Props = {
  children: React.ReactNode;
};

export const ThemeSwitcherProvider: React.FC<Props> = ({ children }) => {

  return (
    <ThemeSwitcherContext.Provider value={value}>{children}</ThemeSwitcherContext.Provider>
  );
};
