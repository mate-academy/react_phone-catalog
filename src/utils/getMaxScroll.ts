export const getMaxScroll = (
  currentRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  if (!currentRef.current) {
    return 0;
  }

  const { scrollWidth, clientWidth } = currentRef.current;

  return scrollWidth - clientWidth;
};
