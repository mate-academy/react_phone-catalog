import './NoResults.scss';

export const NoResults: React.FC<{ category: string }> = ({ category }) => {
  if (category === 'cart') {
    return (
      <div className="results-not-found">Your cart is empty</div>
    );
  }

  return (
    <div className="results-not-found">
      {category}
      {' '}
      not found
    </div>
  );
};
