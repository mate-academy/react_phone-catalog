import { Link } from 'react-router-dom';
import { newPhonews } from '../../../../constants/common';
import './Slider.scss';

export const Slider = () => {
  const phone = newPhonews[0];
  return (
    <section className="home-page__new-models new-models">
      <h2 className="new-models__title">Brand new models</h2>
      <div className="new-models__container">
        <div className="new-models__product-cards">

        <article className="product-card">
          <div className="product-card__content">
            <Link to="#" className="product-card__link">
              <div className="product-card__photo">
                <img
                  src={phone.image}
                  alt="Product Image"
                  className="product-card__image"
                />
              </div>

              <h3 className="product-card__title">{phone.name}</h3>

              <p className="product-card__price">${phone.price}</p>
            </Link>

            <div className="product-card__info">
              <div className="product-card__info-item">
                <p className="product-card__info-label">Screen</p>
                <p className="product-card__info-value">{phone.screen}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">Capacity</p>
                <p className="product-card__info-value">{phone.capacity}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">RAM</p>
                <p className="product-card__info-value">{phone.ram}</p>
              </div>
            </div>

            <div className="product-card__actions">
              <button className="product-card__add-to-cart">Add to cart</button>
              <button className="product-card__favorite">
                <img src="public/img/icons/add-to-fovourites.svg" alt="" />
              </button>
            </div>
          </div>
        </article>
        <article className="product-card">
          <div className="product-card__content">
            <Link to="#" className="product-card__link">
              <div className="product-card__photo">
                <img
                  src={phone.image}
                  alt="Product Image"
                  className="product-card__image"
                />
              </div>

              <h3 className="product-card__title">{phone.name}</h3>

              <p className="product-card__price">${phone.price}</p>
            </Link>

            <div className="product-card__info">
              <div className="product-card__info-item">
                <p className="product-card__info-label">Screen</p>
                <p className="product-card__info-value">{phone.screen}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">Capacity</p>
                <p className="product-card__info-value">{phone.capacity}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">RAM</p>
                <p className="product-card__info-value">{phone.ram}</p>
              </div>
            </div>

            <div className="product-card__actions">
              <button className="product-card__add-to-cart">Add to cart</button>
              <button className="product-card__favorite">
                <img src="public/img/icons/add-to-fovourites.svg" alt="" />
              </button>
            </div>
          </div>
        </article>
        <article className="product-card">
          <div className="product-card__content">
            <Link to="#" className="product-card__link">
              <div className="product-card__photo">
                <img
                  src={phone.image}
                  alt="Product Image"
                  className="product-card__image"
                />
              </div>

              <h3 className="product-card__title">{phone.name}</h3>

              <p className="product-card__price">${phone.price}</p>
            </Link>

            <div className="product-card__info">
              <div className="product-card__info-item">
                <p className="product-card__info-label">Screen</p>
                <p className="product-card__info-value">{phone.screen}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">Capacity</p>
                <p className="product-card__info-value">{phone.capacity}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">RAM</p>
                <p className="product-card__info-value">{phone.ram}</p>
              </div>
            </div>

            <div className="product-card__actions">
              <button className="product-card__add-to-cart">Add to cart</button>
              <button className="product-card__favorite">
                <img src="public/img/icons/add-to-fovourites.svg" alt="" />
              </button>
            </div>
          </div>
        </article>
        <article className="product-card">
          <div className="product-card__content">
            <Link to="#" className="product-card__link">
              <div className="product-card__photo">
                <img
                  src={phone.image}
                  alt="Product Image"
                  className="product-card__image"
                />
              </div>

              <h3 className="product-card__title">{phone.name}</h3>

              <p className="product-card__price">${phone.price}</p>
            </Link>

            <div className="product-card__info">
              <div className="product-card__info-item">
                <p className="product-card__info-label">Screen</p>
                <p className="product-card__info-value">{phone.screen}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">Capacity</p>
                <p className="product-card__info-value">{phone.capacity}</p>
              </div>
              <div className="product-card__info-item">
                <p className="product-card__info-label">RAM</p>
                <p className="product-card__info-value">{phone.ram}</p>
              </div>
            </div>

            <div className="product-card__actions">
              <button className="product-card__add-to-cart">Add to cart</button>
              <button className="product-card__favorite">
                <img src="public/img/icons/add-to-fovourites.svg" alt="" />
              </button>
            </div>
          </div>
        </article>
        </div>
      
      </div>
    </section>
  );
};
