import { useState } from 'react';
import { PhonesCard } from '../phones/PhonesCard';
import './style.scss';
import { Phone } from '../../types/phone';

type Props = {
  phones: Phone[]
  title: string
  showOldPrice: boolean
};

export const HotPrice: React.FC<Props> = ({ phones, title, showOldPrice }) => {
  const [startIndex, setStartIndex] = useState(0);
  const phonesPerPage = 4;
  const phoneSlice = phones.slice(startIndex, startIndex + 4);

  const handleNextClick = () => {
    if (startIndex + phonesPerPage < phones.length) {
      setStartIndex(prevIndex => prevIndex + phonesPerPage);
    }
  };

  const handlePrevClick = () => {
    if (startIndex - phonesPerPage >= 0) {
      setStartIndex(prevIndex => prevIndex - phonesPerPage);
    }
  };

  return (
    <div>
      <div className="title">
        <h1 className="title__price">{title}</h1>
        <div className="title__buttons">
          <button
            type="button"
            className="card-button left"
            id="prevButton"
            onClick={handlePrevClick}
          >
            <img src="./img/icons/left.svg" alt="Previous" />
          </button>
          <button
            type="button"
            className="card-button right"
            id="nextButton"
            onClick={handleNextClick}
          >
            <img src="./img/icons/right.svg" alt="Next" />
          </button>
        </div>
      </div>
      <PhonesCard
        phones={phoneSlice}
        showOldPrice={showOldPrice}
      />
    </div>
  );
};

export default HotPrice;
