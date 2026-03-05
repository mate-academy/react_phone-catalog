interface SliderPaginationProps {
  totalSlides: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export const SliderPagination = ({
  totalSlides,
  activeIndex,
  onDotClick,
}: SliderPaginationProps) => (
  <div className="flex gap-[8px] mt-[12px]">
    {Array.from({ length: totalSlides }, (_, index) => {
      const isActive = index === activeIndex;

      return (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`w-[40px] h-[2px] relative z-50 pointer-events-auto before:content-[''] before:absolute before:-inset-y-4 before:inset-x-0 transition-all duration-300 ${
            isActive ? 'bg-foreground' : 'bg-border'
          }`}
        />
      );
    })}
  </div>
);
