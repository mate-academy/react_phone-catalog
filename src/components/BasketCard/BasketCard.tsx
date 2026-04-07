import './BasketCard.scss';

type BasketCardProps = {
   basketProduct:
};



const BasketCard = ({basketProduct}) => {
  return (
    <>
      <div className="basket-card">
        <div className="basket-card__image"></div>
        <div className="basket-card__title"></div>
        <div className="basket-card__counter"></div>
        <div className="basket-card__price"></div>
      </div>
    </>
  );
};

export default BasketCard;
