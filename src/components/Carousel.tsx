import CarouselItem from './CarouselItem';

interface CarouselProps {
  carouselItem: string;
  setCarouselItem: (value: string) => void;
}

const Carousel = ({ carouselItem, setCarouselItem }: CarouselProps) => {
  function moveNext() {
    if (carouselItem === 'item-1') {
      setCarouselItem('item-2');
    } else if (carouselItem === 'item-2') {
      setCarouselItem('item-3');
    } else {
      setCarouselItem('item-1');
    }
  }

  function movePrev() {
    if (carouselItem === 'item-1') {
      setCarouselItem('item-3');
    } else if (carouselItem === 'item-2') {
      setCarouselItem('item-1');
    } else {
      setCarouselItem('item-2');
    }
  }

  return (
    <>
      <div className="header__carousel">
        <div className="header__container">
          <button
            className="header__button"
            onClick={() => {
              movePrev();
            }}
          >
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}/img/left.svg`}
              alt="icon left chevron svg"
            />
          </button>
          <div className="header__space">
            <div
              className="header__capsule"
              style={{
                left:
                  carouselItem === 'item-1'
                    ? 0
                    : carouselItem === 'item-2'
                      ? '-100%'
                      : '-200%',
              }}
            >
              <CarouselItem />
              <CarouselItem />
              <CarouselItem />
            </div>
          </div>
          <button
            className="header__button"
            onClick={() => {
              moveNext();
            }}
          >
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}/img/right.svg`}
              alt="icon right chevron svg"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
