import { ReturnHomeButton } from './ReturnHomeButton/ReturnHomeButton';

export const EmptyCategory: React.FC = () => {
  return (
    <div className="product-page">
      <div className="product-page__container--error">
        <h1 className="product-page__title product-page__title--error">
          The are no available products in this category now. Please, check it
          later.
        </h1>

        <ReturnHomeButton />
      </div>
    </div>
  );
};
