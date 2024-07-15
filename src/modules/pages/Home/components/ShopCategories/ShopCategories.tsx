import './ShopCategories.scss';

export const ShopCategories = () => {
  return (
    <div className="shopCateg-page">
      <h1 className="shopCateg-title">Shop by category</h1>
      <div className="shopCateg-cards">
        <div className="shopCateg-card">
          <a href="/" className="shopCateg-picture">
            <img
              src="./uploadedImg/phones.png"
              alt="phone picture"
              className="shopCateg-image"
            ></img>
          </a>
          <h2 className="shopCateg-name">Mobile Phones</h2>
          <p className="shopCateg-models">95 models</p>
        </div>

        <div className="shopCateg-card">
          <a href="/" className="shopCateg-picture">
            <img
              src="./uploadedImg/tablets.png"
              alt="phone picture"
              className="shopCateg-image"
            ></img>
          </a>
          <h2 className="shopCateg-name">Tablets</h2>
          <p className="shopCateg-models">67 models</p>
        </div>

        <div className="shopCateg-card">
          <a href="/" className="shopCateg-picture">
            <img
              src="./uploadedImg/acces.png"
              alt="phone picture"
              className="shopCateg-image"
            ></img>
          </a>
          <h2 className="shopCateg-name">Accessories</h2>
          <p className="shopCateg-models">44 models</p>
        </div>
      </div>
    </div>
  );
};
