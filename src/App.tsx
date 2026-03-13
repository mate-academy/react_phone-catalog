import { Suspense } from 'react';
import { useThemeStore } from './store/themeStore';
import { AppRoutes } from './router/AppRoutes';

export const App = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`app theme-${theme}`}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </div>
  );
};
