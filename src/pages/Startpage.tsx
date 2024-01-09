import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from '../components/Carousel';
import { CategoryBox } from '../components/CategoryBox';
import { storeGadgets } from '../store/store';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const imagesPath = [
  'new/img/banner-accessories.png',
  'new/img/banner-phones.png',
  'new/img/banner-tablets.png',
];

const carouselMain = {
  className: 'w-[1040px] h-[400px] mx-auto',
  slideStyle: 'slick-image-1040',
  prevStyle: 'slick-arrow-1040 slick-prev-1040',
  nextStyle: 'slick-arrow-1040 slick-next-1040',
  autoplay: true,
  autoplaySpeed: 3000,
  swipeToSlide: true,
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  data: imagesPath,
  customPaging: () => <div className="bullet" />,
};

export const Startpage: React.FC = () => {
  const { list } = storeGadgets();
  const memoizedProducts = useMemo(() => list, [list]);
  const hotPriceGadgets = memoizedProducts.filter((item) => item.discount > 0);
  const gadgetsNotDiscounted = memoizedProducts
    .filter((item) => item.discount === 0);
  const quantityGadgets = (arg: string) => memoizedProducts
    .reduce((acc, item) => {
      if (item.type === arg) {
        return acc + 1;
      }

      return acc;
    }, 0);
  const hotPrises = {
    className: 'hotprices-slider',
    slideStyle: 'h-[507px] max-w-[272px]',
    prevStyle: 'slick-arrow-square slick-arrow-square-prev',
    nextStyle: 'slick-arrow-square slick-arrow-square-next',
    autoplay: true,
    swipeToSlide: false,
    touchMove: false,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    data: hotPriceGadgets,
  };

  const notDiscounted = {
    className: 'hotprices-slider',
    slideStyle: 'h-[507px] max-w-[272px]',
    prevStyle: 'slick-arrow-square slick-arrow-square-prev',
    nextStyle: 'slick-arrow-square slick-arrow-square-next',
    autoplay: true,
    swipeToSlide: false,
    touchMove: false,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    data: gadgetsNotDiscounted,
  };

  return (
    <section className="max-w-[1136px] min-h-[calc(100vh-64px)] mx-auto mt-10">
      <Carousel {...carouselMain} />

      <h2 className="h2 max-w-[1136px] mx-auto mt-[72px] mb-6">Hot prices</h2>
      <div className="flex flex-wrap">
        <Carousel {...hotPrises} />
      </div>
      <h2 className="h2 max-w-[1136px] mx-auto mt-[72px] mb-6">
        Shop by category
      </h2>
      <div className="max-w-[1136px] mx-auto flex gap-4">
        <Link to="/phones" onClick={scrollToTop}>
          <CategoryBox
            styleName="category-images--phone"
            name="Mobile phones"
            quantity={`${quantityGadgets('phone')} models`}
          />
        </Link>
        <Link to="/tablets" onClick={scrollToTop}>
          <CategoryBox
            styleName="category-images--tablet"
            name="Tablets"
            quantity={`${quantityGadgets('tablet')} models`}
          />
        </Link>
        <Link to="/accessories" onClick={scrollToTop}>
          <CategoryBox
            styleName="category-images--accessories"
            name="Accessories"
            quantity={`${quantityGadgets('Accessories')} models`}
          />
        </Link>
      </div>

      <h2
        className="h2 max-w-[1136px] mx-auto mt-[72px] mb-6"
      >
        Brand new models
      </h2>
      <div className="flex flex-wrap">
        <Carousel {...notDiscounted} />
      </div>
    </section>
  );
};
