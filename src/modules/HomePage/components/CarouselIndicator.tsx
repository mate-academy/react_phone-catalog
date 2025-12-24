type CarouselIndicatorProps = {
  activeIndex: number; // 0, 1 or 2
  numberOfSlides: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
};

export const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({
  activeIndex,
  numberOfSlides,
  setActiveIndex,
}) => {
  const ACTIVE = 'var(--text-main)';
  const INACTIVE = 'var(--border-color)';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="{numberOfSlides * 28}"
      height="24"
      viewBox={`0 0 ${numberOfSlides * 28} 24`}
      fill="none"
    >
      {numberOfSlides < 1
        ? null
        : Array.from({ length: numberOfSlides }).map((_, i) => (
            <rect
              key={i}
              x={5 + i * 28}
              y="10"
              width="14"
              height="4"
              fill={activeIndex === i ? ACTIVE : INACTIVE}
              onClick={() => {
                if (setActiveIndex) {
                  setActiveIndex(i);
                }
              }}
              style={{ cursor: setActiveIndex ? 'pointer' : 'default' }}
            />
          ))}
    </svg>
  );
};
