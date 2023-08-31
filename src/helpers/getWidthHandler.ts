export const getWidthHandler = (
  ref: React.RefObject<HTMLDivElement>,
  setWidth: React.Dispatch<number>,
) => {
  return () => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  };
};
