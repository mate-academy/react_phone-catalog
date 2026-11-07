import type React from 'react';
import { NavigationList } from '../../molecules/Navigation/NavigationList';
import { ScrollToTopButton } from '../../atoms/ScrollTopButton/ScrollTopButton';
import { useCallback } from 'react';
import { FooterLogo } from '../../atoms/Logos/FooterLogo';

export const Footer: React.FC = () => {
  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <footer className="bottom-0 w-full bg-white py-8 border-t border-elements  dark:bg-primary">
        <div className="max-w-[1200px] mx-auto px-4 md:px-[32px] flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0 w-[89px] h-[32px] ">
            <FooterLogo />
          </div>
          <div className="mb-8 md:mb-0">
            <NavigationList />
          </div>
          <div className="w-full flex justify-between items-center md:w-auto md:justify-start gap-[16px]">
            <ScrollToTopButton onClick={handleScrollTop} />
          </div>
        </div>
      </footer>
    </>
  );
};
