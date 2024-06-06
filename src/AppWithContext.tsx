import { Root } from './Root';
import { GlobalStateProvider } from './contexts/AppContext/AppContext';
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';

export const AppWithContext = () => {
  return (
    <ThemeProvider>
      <GlobalStateProvider>
        <Root />
      </GlobalStateProvider>
    </ThemeProvider>
  );
};
