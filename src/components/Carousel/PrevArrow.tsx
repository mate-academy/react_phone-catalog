import Slider from 'react-slick';

type Props = {
  prevStyle?: string;
  sliderRef: React.RefObject<Slider | null>;
  number: number;
  infinite: boolean;
  setNumber: (arg: number) => void;
};

export const PrevArrow: React.FC<Props> = ({
  prevStyle, sliderRef, number, setNumber, infinite,
}) => {
  return (
    <button
      className={infinite ? prevStyle : `${prevStyle} ${number <= 4 && 'opacity-arrow'}`}
      type="button"
      disabled={number <= 4 && !infinite}
      onClick={() => {
        if (sliderRef.current && !infinite) {
          sliderRef.current.slickPrev();
          setNumber(number - 1);
        }

        if (sliderRef.current) {
          sliderRef.current.slickPrev();
        }
      }}
    >
      <img src="img/svg/arrow-left.svg" alt="arrow" />
    </button>
  );
};
