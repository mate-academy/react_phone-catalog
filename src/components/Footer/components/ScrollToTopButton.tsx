import { useTranslation } from 'react-i18next';
import { ChevronUp } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';
import { scrollToTop } from '../helpers/scrollToTop';
import { FooterTranslationKey } from '../constants/footerConstants';

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = ({ className }: ScrollToTopButtonProps) => {
  const { t } = useTranslation();

  const handleScrollToTop = () => scrollToTop();

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={cn(
        'group flex items-center gap-4 cursor-pointer shrink-0 border-none bg-transparent p-0',
        className,
      )}
      aria-label={t(FooterTranslationKey.BackToTop)}
    >
      <span
        className={cn(
          TYPOGRAPHY.small,
          'leading-none whitespace-nowrap text-input group-hover:text-popover transition-colors',
        )}
      >
        {t(FooterTranslationKey.BackToTop)}
      </span>
      <ChevronUp className="h-4 w-4 text-input group-hover:text-popover transition-colors" />
    </button>
  );
};
