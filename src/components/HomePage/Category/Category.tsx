import './Category.scss';

export const Category = () => {
  return (
    <div className="category">
      <div className="category__title">Shop by category</div>
      <div className="classes">
        <div className="category__class">
          <div className="category__class--image">
            <img
              src="../../../../public/img/mobilephones.png"
              alt="phones"
              className="category__class--image-img"
            />
          </div>
          <div className="category__class--name">Mobile phones</div>
          <div className="category__class--quantity">95 models</div>
        </div>
        <div className="category__class">
          <div className="category__class--image">
            <img
              src="../../../../public/img/tablets.png"
              alt="phones"
              className="category__class--image-img"
            />
          </div>
          <div className="category__class--name">Tablets</div>
          <div className="category__class--quantity">24 models</div>
        </div>
        <div className="category__class">
          <div className="category__class--image">
            <img
              src="../../../../public/img/accessories.png"
              alt="phones"
              className="category__class--image-img"
            />
          </div>
          <div className="category__class--name">Accessories</div>
          <div className="category__class--quantity">100 models</div>
        </div>
      </div>
    </div>
  );
};
