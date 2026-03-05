import type { NavigationDirection } from '../types';

interface SliderNavigationButtonProps {
  direction: NavigationDirection;
  onClick: () => void;
}

const ARROW_ICON: Record<NavigationDirection, string> = {
  previous: '←',
  next: '→',
};

export const SliderNavigationButton = ({
  direction,
  onClick,
}: SliderNavigationButtonProps) => (
  <button
    onClick={onClick}
    aria-label={`${direction} slide`}
    className="hidden md:flex items-center justify-center w-8 shrink-0 hover:scale-125 transition-all text-[24px]"
  >
    {ARROW_ICON[direction]}
  </button>
);
