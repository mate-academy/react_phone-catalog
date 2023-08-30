export const getWidthHandler = (
  ref: React.RefObject<HTMLDivElement>,
  setWidth: React.Dispatch<number>,
  setTransition: (transition: string) => void,
) => {
  return () => {
    setTransition('');

    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }

    setTimeout(() => {
      setTransition('transform 1s ease');
    }, 600);
  };
};
