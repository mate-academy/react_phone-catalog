import { useSaveFilterInParams } from './saveFilterInParams';

export const useMoveButtons = () => {
  const { saveFilterInParams } = useSaveFilterInParams();

  const moveButtons = (
    direction: 'left' | 'right',
    ditermineDirection: (dir: string, currentButton: number) => number,
    actualButton: number,
    navigationContainer: React.RefObject<HTMLUListElement>,
  ) => {
    const container = navigationContainer.current;

    if (!container) {
      return;
    }

    const scrollAmount = 32;
    const offset = direction === 'right' ? scrollAmount : -scrollAmount;

    container.scrollBy({
      left: offset,
      behavior: 'smooth',
    });

    saveFilterInParams(
      'actual-list',
      ditermineDirection(direction, actualButton),
    );
  };

  return { moveButtons };
};
