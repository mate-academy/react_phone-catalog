type ThemeSwitcherContextType = {

};

export const ThemeSwitcherContext = React.createContext<ThemeSwitcherContextType>({

});

type Props = {
  children: React.ReactNode;
};

export const ThemeSwitcherProvieder: React.FC<Props> = ({ children }) => {

  return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );

};
