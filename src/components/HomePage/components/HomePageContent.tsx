import { useTranslation } from 'react-i18next';
import { useBooks } from '@/context/BooksContext';
import { BooksSection } from '@/components/BooksSection';
import { MainSlider } from '@/components/MainSlider';
import { CategoriesSection } from '@/components/CategoriesSection/CategoriesSection';
import { useHomePageIntroAnimation } from '../hooks/useHomePageIntroAnimation';
import { HOME_PAGE_TRANSLATION_KEYS } from '../constants/translationKeys';

export const HomePageContent = () => {
  const { newBooks, suggestedBooks } = useBooks();
  const { t } = useTranslation();
  const {
    containerRef,
    sliderRef,
    newBooksRef,
    categoriesRef,
    suggestedBooksRef,
  } = useHomePageIntroAnimation();

  return (
    <main
      ref={containerRef}
      className="flex flex-col w-full gap-[56px] lg:gap-[80px] pb-[56px] lg:pb-[80px]"
    >
      <div ref={sliderRef}>
        <MainSlider />
      </div>
      <div ref={newBooksRef}>
        <BooksSection
          title={t(HOME_PAGE_TRANSLATION_KEYS.NEW_BOOKS)}
          books={newBooks}
        />
      </div>
      <div ref={categoriesRef}>
        <CategoriesSection />
      </div>
      <div ref={suggestedBooksRef}>
        <BooksSection
          title={t(HOME_PAGE_TRANSLATION_KEYS.YOU_MAY_LIKE)}
          books={suggestedBooks}
        />
      </div>
    </main>
  );
};
