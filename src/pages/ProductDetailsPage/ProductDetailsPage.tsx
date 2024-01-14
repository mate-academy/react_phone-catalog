/* eslint-disable react/self-closing-comp */
import { BackButton } from '../../components/BackButton';
import { PathBlock } from '../../components/PathBlock';

export const ProductDetailsPage = () => {
  return (
    <div className="product-details__page">
      <PathBlock
        currentPage="Phones"
        item="Apple iPhone 11 Pro Max 64GB Gold"
      />
      <BackButton />
      <section className="product-details__wrapper">
        <h1 className="product-details__title">
          Apple iPhone 11 Pro Max 64GB Gold
        </h1>
        <div className="images__selector">
          <div className="selected__image"></div>
          <div className="images__list"></div>
        </div>
        <div className="colors__selector">
          <div className="selector__title">Available colors</div>
        </div>
        <div className="capacity__selector"></div>
        <div className="prices">
          <p className="new__price"></p>
          <p className="full__price"></p>
        </div>
        <div className="product-details__actions"></div>
      </section>
    </div>
  );
};
