import { useSlContext } from '@widgets/Slider/model/context/sliderContext';
import { Mode } from '@widgets/Slider/types/types';

type Params = {
  length: number;
  onClick: (pos: number) => void;
  className: string;
  getIndex: (arg?: number) => number;
};

export const SliderPagination = ({
  length,
  onClick,
  className,
  getIndex,
}: Params) => {
  const { mode } = useSlContext();

  const disabled = (val: number) => {
    const currentIndex = getIndex();

    return mode === Mode.INFINITE
      ? currentIndex - 1 === val
      : currentIndex === val;
  };

  const listLength = Mode.INFINITE ? length - 2 : length;

  const amount = Array.from({ length: listLength }, (_, i) => i);

  return (
    <nav aria-label="Slider pagination" className={className}>
      {amount.map(dg => (
        <button
          onClick={() => onClick(mode === Mode.INFINITE ? dg + 1 : dg)}
          disabled={disabled(dg)}
          key={dg}
          aria-label={`Go to slide # ${dg}`}
        >
          <div />
        </button>
      ))}
    </nav>
  );
};
