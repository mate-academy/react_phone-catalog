import { useSaveFilterInParams } from './saveFilterInParams';

export const useMoveButtons = () => {
  const { saveFilterInParams } = useSaveFilterInParams();

  const moveButtons = (
    direction: 'left' | 'right',
    ditermineDirection: (dir: string, currentButton: number) => number,
    actualButton: number,
    navigationContainer: React.RefObject<HTMLUListElement>,
  ) => {
    if (navigationContainer.current) {
      const scrollAmount = 35;

      if (direction === 'right') {
        navigationContainer.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });

        saveFilterInParams(
          'actual-list',
          ditermineDirection('right', actualButton),
        );
      } else if (direction === 'left') {
        saveFilterInParams(
          'actual-list',
          ditermineDirection('left', actualButton),
        );
        navigationContainer.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };


  return { moveButtons }
};
