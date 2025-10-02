/* eslint-disable max-len */
type ThemeSwitcherContextType = {
  mainColor: string;
  secondaryColor: string;
  setMainColor: (color: string) => void;
};

export const ThemeSwitcherContext = React.createContext<ThemeSwitcherContextType>({
  mainColor: string;
  secondaryColor: string;
  setMainColor: (color: string) => void;
});

type Props = {
  children: React.ReactNode;
};

export const ThemeSwitcherProvider: React.FC<Props> = ({ children }) => {

  return (
    <ThemeSwitcherContext.Provider value={value}>{children}</ThemeSwitcherContext.Provider>
  );
};
