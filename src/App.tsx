import { Suspense } from 'react';
import { useThemeStore } from './store/themeStore';
import { AppRoutes } from './router/AppRoutes';

export const App = () => {
  const { theme } = useThemeStore();

  return (
    <div className={`app theme-${theme}`}>
      <h1 hidden>Product Catalog</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </div>
  );
};
