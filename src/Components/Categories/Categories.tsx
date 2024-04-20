import './Categories.scss';

export const Categories = () => {
  const imagePathPhone = process.env.PUBLIC_URL + 'img/category-phones.webp';
  // const imagePathTablet = process.env.PUBLIC_URL + 'img/category-tablets.png';
  const imagePathAccessories =
    process.env.PUBLIC_URL + 'img/category-accessories.png';

  return (
    <div className="categories-container">
      <h1 className="categories-title">Shop by category</h1>
      <div className="categoties-container-card">
        <div>
          <div className="categories-img-phone">
            <img src={imagePathPhone} alt="#" />
          </div>
          <div className="description">
            <h2>NameCategoria</h2>
            <p>length item</p>
          </div>
        </div>
        <div>
          <div className="categories-img-tablet">
            <img src="img/category-tablets.png" alt="#" />
          </div>
          <div className="description">
            <h2>NameCategoria</h2>
            <p>length item</p>
          </div>
        </div>
        <div>
          <div className="categories-img-accessories">
            <img src={imagePathAccessories} alt="#" />
          </div>
          <div className="description">
            <h2>NameCategoria</h2>
            <p>length item</p>
          </div>
        </div>
      </div>
    </div>
  );
};
