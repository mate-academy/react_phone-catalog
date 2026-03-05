import { FooterLogo } from './components/FooterLogo';
import { FooterNavigation } from './components/FooterNavigation';
import { ScrollToTopButton } from './components/ScrollToTopButton';

export const Footer = () => (
  <footer className="relative z-10 bg-secondary border-t border-border font-manrope">
    <div className="max-[639px]:hidden w-full">
      <div className="footer-container">
        <FooterLogo
          className="flex mr-4 transition-transform hover:scale-105"
          imageClassName="w-22.25 h-8"
        />

        <div className="footer-spacer-left" />

        <FooterNavigation className="shrink-0 flex items-center footer-nav-gap" />

        <div className="footer-spacer-right" />

        <ScrollToTopButton />
      </div>
    </div>

    <div className="hidden max-[639px]:flex flex-col px-4 py-8 gap-8">
      <FooterLogo
        className="shrink-0 self-start"
        imageClassName="w-22.25 h-8 transition-transform hover:scale-105"
      />

      <FooterNavigation className="shrink-0 flex flex-col items-start gap-4" />

      <ScrollToTopButton className="self-center" />
    </div>
  </footer>
);
