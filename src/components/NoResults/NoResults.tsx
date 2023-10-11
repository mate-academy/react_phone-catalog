import './NoResults.scss';
import { useMemo, memo } from 'react';

type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = memo(({ category }) => {
  const product = useMemo(() => {
    return category[0].toUpperCase() + category.slice(1);
  }, [category]);

  return (
    <div className="NoResults">
      <h2>
        {`${product} not found`}
      </h2>
    </div>
  );
});
