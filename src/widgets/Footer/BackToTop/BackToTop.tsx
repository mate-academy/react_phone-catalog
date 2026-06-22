'use client';

import { ChevronUpIcon } from '@/shared/ui/Icons';

export const BackToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="group flex items-center gap-4 transition-transform duration-300 hover:scale-110 cursor-pointer"
    >
      <div className="border border-brand-secondary p-2 aspect-square cursor-pointer bg-brand-surface-2">
        <ChevronUpIcon className="text-brand-white w-6 h-6" />
      </div>
    </button>
  );
};
