import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/helperToolkit';
import { setGlobalLoading } from '../slices/uiSlice';

type ContextType = {
  startTransition: (path: string) => void;
  isTransitioning: boolean;
  targetPageName: string;
};

const PageTransitionContext = createContext<ContextType | null>(null);

export const usePageTransition = () => {
  const ctx = useContext(PageTransitionContext);

  if (!ctx) {
    throw new Error(
      'usePageTransition must be used inside PageTransitionProvider',
    );
  }

  return ctx;
};

export const PageTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPageName, setTargetPageName] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.ui.isLoading);

  const formatPageName = (name: string): string => {
    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => {
        if (word.toLowerCase() === 'iphone') {
          return 'iPhone';
        } else if (word.toLowerCase() === 'ipad') {
          return 'iPad';
        }

        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

  const startTransition = (path: string) => {
    const parts = path.split('/');
    const pageName =
      parts.length > 1 && parts[1]
        ? formatPageName(parts[parts.length - 1])
        : 'Home';

    setTargetPageName(pageName);
    setIsTransitioning(true);
    dispatch(setGlobalLoading(true));

    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
    }, 600);
  };

  useEffect(() => {
    if (!isLoading && isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, isTransitioning]);

  return (
    <PageTransitionContext.Provider
      value={{ startTransition, isTransitioning, targetPageName }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
