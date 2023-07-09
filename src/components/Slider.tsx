import { useEffect, useState } from 'react';
import { ArrowButton } from './ArrowButton';
import { useDiviceSize } from '../utils/useDeviceSize/useDiviceSize';
import { defaultImages } from '../utils/listsNames';

export const Slider: React.FC = () => {
  const { main, buttonWidth } = useDiviceSize();
  const { size, gap } = main;
  const numOfImages = 3;
  const step = size - (buttonWidth * 2) - (gap);
  const [fotoForSlider, setFotoForSlider] = useState(defaultImages);
  const [shift, setShift] = useState(-step);
  const [cssTransition, setCssTransition] = useState('all 1s ease');
  const [delay, setDelay] = useState(false);

  useEffect(() => setShift(-step), [step]);

  const onChangePosition = (num: number) => {
    setDelay(true);
    setCssTransition('all 1s ease');
    setShift(prev => prev + num);
    setFotoForSlider(defaultImages);

    setTimeout(() => {
      if (shift === -step && num > 0) {
        setShift(-step * numOfImages);
        setCssTransition('none');
      }

      if (shift === -step * numOfImages && num < 0) {
        setShift(-step);
        setCssTransition('none');
      }

      setDelay(false);
    }, 1000);
  };

  const createRangeList = () => {
    const list = [];

    for (let i = 1; i < fotoForSlider.length - 1; i += 1) {
      list.push(<li
        key={fotoForSlider[i]}
        className={`slider__range--item ${-i === shift / step && 'is-active'}`}
      />);
    }

    return list;
  };

  const rangeList = createRangeList();

  return (
    <div>
      <section className="slider">
        <ArrowButton
          type="left"
          stop={delay}
          onChangePosition={() => onChangePosition(step)}
        />
        <ul
          className="slider__list"
          style={{ marginLeft: shift, transition: cssTransition }}
        >

          {fotoForSlider.map((item, i) => (

            <li
              key={item + item[i - 1]}
              className="slider__item"
              style={{ backgroundImage: `url("img/banner-${item}.png")` }}
            />

          ))}
        </ul>

        <ArrowButton
          type="right"
          stop={delay}
          onChangePosition={() => onChangePosition(-step)}
        />
      </section>

      <ul className="slider__range">
        {rangeList}
      </ul>

    </div>
  );
};
