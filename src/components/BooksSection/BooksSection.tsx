import type { Book } from '@/types/Book';
import { TYPOGRAPHY } from '@/constants/typography';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/ProductCard';
import { ScrollButton } from '@/components/BooksSection/ScrollButtons';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  books: Book[];
}

const BooksCarouselButtons = () => {
  const { api } = useCarousel();

  const handlePrev = () => {
    api?.scrollTo(api.selectedScrollSnap() - 1);
  };

  const handleNext = () => {
    api?.scrollTo(api.selectedScrollSnap() + 1);
  };

  return (
    <div className="flex gap-[16px]">
      <ScrollButton
        direction="left"
        onScroll={handlePrev}
      />
      <ScrollButton
        direction="right"
        onScroll={handleNext}
      />
    </div>
  );
};

export const BooksSection = ({ title, books = [] }: Props) => {
  return (
    <>
      <section
        className="
        relative
        flex flex-col
        mt-[56px] pl-[16px] gap-[24px]
        md:mt-[56px] md:pl-[24px]
        lg:mt-[80px] lg:w-[1136px] lg:mx-auto lg:pl-0
      "
      >
        <Carousel
          opts={{
            align: 'start',
            loop: false,
            containScroll: 'keepSnaps',
            dragFree: true,
            slidesToScroll: 1,
            breakpoints: {
              '(min-width: 1200px)': {
                align: 'center',
                containScroll: 'trimSnaps',
              },
            },
          }}
        >
          <div
            className="
            flex flex-row justify-between items-center w-full max-w-[1136px]
            pr-[16px] md:pr-[24px] lg:pr-0
          "
          >
            <h2
              className={cn(
                TYPOGRAPHY.h2,
                'text-foreground md:text-[32px] md:leading-[41px]',
              )}
            >
              {title}
            </h2>

            <BooksCarouselButtons />
          </div>

          <CarouselContent className="flex mt-[24px] -ml-[16px]">
            {books.map((book, index) => (
              <CarouselItem
                key={`${book.id}-${index}`}
                className="pl-[16px] basis-auto lg:basis-[25%]"
              >
                <div className="h-[400px] md:h-[506px] lg:h-[571px]">
                  <ProductCard book={book} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
};
