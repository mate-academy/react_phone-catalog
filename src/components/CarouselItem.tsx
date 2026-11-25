const CarouselItem = () => {
  return (
    <div className="header__item">
      <img
        className="header__image"
        src={`${import.meta.env.VITE_PUBLIC_URL}/img/banner-1.png`}
        alt="phone banner"
      />
    </div>
  );
};

export default CarouselItem;
