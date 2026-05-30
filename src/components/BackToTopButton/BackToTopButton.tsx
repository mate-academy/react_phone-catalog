import { useState, useEffect } from 'react';
import styles from './BackToTopButton.module.scss';
import { ArrowBackToTopIcon } from '../icons/ArrowBackToTopIcon';

interface BackToTopButtonProps {
  isMenuOpen: boolean;
}

export default function BackToTopButton({ isMenuOpen }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Mostra o botão quando o usuário rola para baixo mais de 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Rola a página para o topo suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const shouldBeVisible = isVisible && !isMenuOpen;

  return (
    <button
      type="button"
      className={`${styles.backToTopButton} ${shouldBeVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowBackToTopIcon className={styles.arrowIcon} />
    </button>
  );
}
