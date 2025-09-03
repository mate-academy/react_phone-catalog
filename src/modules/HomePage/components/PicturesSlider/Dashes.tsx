import scss from './Dashes.module.scss';

interface Props {
  activeSlide: number;
  count: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}

export const Dashes: React.FC<Props> = ({
  activeSlide,
  count,
  setActiveSlide,
}) => {
  return (
    <div role="group" aria-label="Slides" className={scss.dashes__container}>
      {Array.from({ length: count }).map((_, i) => {
        return (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSlide(i)}
            aria-label={`Got o slide ${i + 1}`}
            aria-current={i === activeSlide ? 'page' : undefined}
          >
            <svg aria-hidden focusable="false" className={scss.dashes__icon}>
              <use
                href={`/icons/icons.svg#${activeSlide === i ? 'black-dash-icon' : 'gray-dash-icon'}`}
              ></use>
            </svg>
          </button>
        );
      })}
    </div>
  );
};
