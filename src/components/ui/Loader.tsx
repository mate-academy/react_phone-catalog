import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import bookLoader from '@/assets/book-loader.json';

interface LoaderProps {
  isLoading: boolean;
  minDuration?: number;
  children: React.ReactNode;
}

export const Loader = ({
  isLoading,
  minDuration = 2000,
  children,
}: LoaderProps) => {
  const [minPassed, setMinPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinPassed(true), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  if (isLoading || !minPassed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Lottie
          animationData={bookLoader}
          loop
          className="w-120 h-120"
        />
      </div>
    );
  }

  return <>{children}</>;
};
