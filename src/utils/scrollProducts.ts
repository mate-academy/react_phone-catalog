export const scrollProducts = (
  direction: 'left' | 'right',
  cardContainerRef: React.RefObject<HTMLDivElement>,
) => {
  const container = cardContainerRef.current;

  if (!container) {
    return;
  }

  const firstCard = container.firstChild as HTMLElement;

  if (!firstCard) {
    return;
  }

  const cardWidth = firstCard.offsetWidth ?? 0;
  const gap = parseFloat(window.getComputedStyle(container).columnGap) || 0;
  const step = cardWidth + gap;

  cardContainerRef.current.scrollBy({
    left: direction === 'right' ? step : -step,
    behavior: 'smooth',
  });
};
