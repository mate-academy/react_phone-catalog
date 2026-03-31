export const getCarouselStep = (containerRef: React.RefObject<HTMLDivElement>) => {
  if (containerRef.current) {
    const card = containerRef.current.querySelector('[class*="ProductCard"]') as HTMLElement 
                 || containerRef.current.firstElementChild as HTMLElement;

    if (card) {
      const style = window.getComputedStyle(containerRef.current);
      const gap = parseInt(style.columnGap || style.gap || '16', 10);
      return card.offsetWidth + gap;
    }
  }
  
  const width = window.innerWidth;
  if (width < 640) return 228;
  if (width < 1200) return 253;
  return 288;
};