export const getEventPageCoordinates = (
  event: React.MouseEvent | React.TouchEvent,
): { x: number; y: number } => {
  if ('touches' in event && event.touches.length > 0) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY,
    };
  }

  return {
    x: (event as React.MouseEvent).pageX,
    y: (event as React.MouseEvent).pageY,
  };
};
