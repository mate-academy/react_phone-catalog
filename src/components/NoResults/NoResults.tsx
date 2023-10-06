import './NoResults.scss';

export const NoResults: React.FC<{ category: string }> = ({ category }) => {
  return (
    <div className="results-not-found bg-blue-500">
      {category === 'cart' ? (
        'Your cart is empty'
      ) : (
        `${category} not found`
      )}
    </div>
  );
};
