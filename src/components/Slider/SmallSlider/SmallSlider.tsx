import s from './SmallSlider.module.scss';
import { useEffect, useRef, useState } from 'react';
import debounce from '../../../utils/debounce';

type Props = {
  slides: string[];
};

export const SmallSlider = ({ slides }: Props) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const containerEl = containerRef.current;
    const el = rootRef.current;

    containerEl?.addEventListener(
      'scroll',
      debounce(() => {
        const newIndex = Math.round(
          containerEl.scrollLeft / (el?.clientWidth ?? 0),
        );

        setActiveSlide(newIndex);
      }, 200),
    );
  }, []);

  const goToSlide = (index: number) => {
    const containerEl = containerRef.current;
    const el = rootRef.current;

    setActiveSlide(index);

    containerEl?.scrollTo({
      left: (el?.clientWidth ?? 0) * index,
      behavior: 'smooth',
    });
  };

  const handleClick = (index: number) => () => goToSlide(index);
  //const handleClickNext = (index: number) => () => goToSlide(index + 1);
  //const handleClickBack = (index: number) => () => goToSlide(index - 1);

  const cn = (...args: string[]) => args.filter(Boolean).join(' ');

  return (
    <>
      <div ref={rootRef} className={s.carousel}>
        <div className={s.scroller__arrows}>
          <button
            className={s.scroller__arrows__l}
            //         className={disableArrows('left')}
            //           onClick={() => handlePhonesScrolling('left')}
          >
            <img src="../../../public/img/icons/left.svg" />
          </button>
        </div>
        <div className={s.wrapper}>
          <div ref={containerRef} className={s.container}>
            {slides.map(slide => (
              <div key={slide} className={s.slide}>
                <img src={slide} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className={s.scroller__arrows}>
          <button
            className={s.scroller__arrows__r}
            //          className={disableArrows('right')}
            //          onClick={() => handlePhonesScrolling('right')}
          >
            <img src="../../../public/img/icons/right.svg" />
          </button>
        </div>

        <div className={s.pagination}>
          {slides.map((slide, index) => (
            <button
              key={slide}
              type="button"
              className={cn(s.dot, activeSlide === index ? s.active : '')}
              onClick={handleClick(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
