type CarouselIndicatorProps = {
  activeIndex: number; // 0, 1 or 2
};

export const CarouselIndicator = ({ activeIndex }: CarouselIndicatorProps) => {
  const ACTIVE = '#313237';
  const INACTIVE = '#E2E6E9';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="24"
      viewBox="0 0 80 24"
      fill="none"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="4"
        fill={activeIndex === 0 ? ACTIVE : INACTIVE}
      />
      <rect
        x="33"
        y="10"
        width="14"
        height="4"
        fill={activeIndex === 1 ? ACTIVE : INACTIVE}
      />
      <rect
        x="61"
        y="10"
        width="14"
        height="4"
        fill={activeIndex === 2 ? ACTIVE : INACTIVE}
      />
    </svg>
  );
};
