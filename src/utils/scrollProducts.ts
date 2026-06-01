export const scrollProducts = (
  direction: 'left' | 'right',
  cardContainerRef: React.RefObject<HTMLDivElement>,
  cardRef: React.RefObject<HTMLDivElement>,
) => {
  if (!cardContainerRef.current || !cardRef.current) {
    return;
  }

  const cardWidth = cardRef.current?.offsetWidth ?? 0;
  const gap = parseFloat(
    window.getComputedStyle(cardContainerRef.current).columnGap,
  );

  const step = cardWidth + gap;

  cardContainerRef.current.scrollBy({
    left: direction === 'right' ? step : -step,
    behavior: 'smooth',
  });
};
