export const getEventPageX = (
  event: React.MouseEvent | React.TouchEvent,
): number => {
  if ('touches' in event) {
    return (event as React.TouchEvent).touches[0].pageX;
  }

  return (event as React.MouseEvent).pageX;
};
