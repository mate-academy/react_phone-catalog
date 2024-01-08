import Slider from 'react-slick';

type Props = {
  nextStyle?: string;
  sliderRef: React.RefObject<Slider | null>;
  limit: number;
  number: number,
  infinite: boolean;
  setNumber: (arg: number) => void;
};

export const NextArrow: React.FC<Props> = ({
  nextStyle, sliderRef, number, limit, setNumber, infinite,
}) => {
  const isDisabled = number === (limit - 1);

  return (
    <button
      className={infinite ? nextStyle : `${nextStyle} ${isDisabled && 'opacity-arrow'}`}
      disabled={isDisabled && !infinite}
      type="button"
      onClick={() => {
        if (sliderRef.current && !infinite) {
          sliderRef.current.slickNext();
          setNumber(number + 1);
        }

        if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
      }}
    >
      <img src="img/svg/arrow-right.svg" alt="arrow" />
    </button>
  );
};
