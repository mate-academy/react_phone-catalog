/* eslint-disable max-len */
type ThemeSwitcherContextType = {
  mainColor: string;
  secondaryColor: string;
  setMainCol
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
