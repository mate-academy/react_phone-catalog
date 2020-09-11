import React, {useState} from 'react';
import classNames from 'classnames';
import ReactResizeDetector from "react-resize-detector";
import './MiniSlider.scss'
import GadgetCard from "../GadgetCard/GadgetCard";

type Props = {
  gadgets: Gadget[];
  name: string;
}

const MiniSlider: React.FC<Props> = ({gadgets, name}) => {
  const [gadgetIndex, setGadgetIndex] = useState(0);
  const [gadgetOnPage, setGadgetOnPage] = useState(4);

  const handleSwitchToPrev = () => {
    if (gadgetIndex !== 0) {
      setGadgetIndex(gadgetIndex - 1)
    }
  };

  const handleSwitchToNext = () => {
    if (gadgetIndex !== gadgets.length - 4) {
      setGadgetIndex(gadgetIndex + 1)
    }
  };

  const handleResize = (width: number) => {
    if (width > 1100) {
      setGadgetOnPage(4);
    } else if (width >= 600) {
      setGadgetOnPage(2);
    } else if (width < 600) {
      setGadgetOnPage(1);
    }
  };

  return (
    <div className="gadgetsSlider">
      <ReactResizeDetector handleWidth onResize={handleResize} />

      <div className="gadgetsSlider__header">
        <h2 className="gadgetsSlider__article">
          {name}
        </h2>

        <div className="gadgetsSlider__buttons">
          <button
            id="prevGadget"
            type="button"
            className={classNames('gadgetsSlider__button', { disabled: gadgetIndex === 0 })}
            onClick={handleSwitchToPrev}
          >
            {gadgetIndex === 0
              ? <img src="./img/phones/arrowLeft.svg" alt="arrow" className="pagination__arrow" />
              : <img src="./img/phones/arrowLeftActive.svg" alt="arrow" className="pagination__arrow" />}
          </button>

          <button
            id="nextGadget"
            type="button"
            className={
              classNames(
                'gadgetsSlider__button',
                { disabled: gadgetIndex === gadgets.length - gadgetOnPage },
              )
            }
            onClick={handleSwitchToNext}
          >
            {gadgetIndex === gadgets.length - gadgetOnPage
              ? <img src="./img/phones/arrowRight.svg" alt="next" />
              : <img src="./img/phones/arrowRightActive.svg" alt="next" />}
          </button>
        </div>
      </div>

      <div className="gadgetsSlider__cards">
        <div
          className="carousel"
          style={{ width: `${gadgetOnPage * 288}px` }}
        >
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(-${gadgetIndex * 288}px)`,
              transition: `transform ${800}ms`,
            }}
          >
            {gadgets.map((gadget: Gadget) => (
              <li key={gadget.id}>
                <GadgetCard gadget={gadget} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default MiniSlider;
