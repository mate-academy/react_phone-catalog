import { useContext, useEffect, useState } from 'react';
import './AccessoriesCard.scss';
import { getGoodes } from '../../services/phones';
import { ProductContext } from '../shared/Context/Context';
import { Good } from '../../types/Good';
import { GoodCard } from '../shared/GoodCard';
import { Breadcrumps } from '../shared/Breadcrupmps/Breadcrumps';
import { Back } from '../shared/Back/Back';
import { Loader } from '../shared/Loader';

export const AccessoriesCard = () => {
  const [good, setGood] = useState<Good | null>(null);
  const { path } = useContext(ProductContext);
  const pathArr = path.split('/');
  const itemId = pathArr[2];
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getGoodes('accessories.json')
      .then(response => {
        const phone = response.find((item: Good) => item.id === itemId);

        setGood(phone);
      })
      .catch(() => setErrorMessage('Product was not found'))
      .finally(() => setIsLoading(false));
  }, [itemId]);

  if (!good) {
    return;
  }

  return (
    <main className="main">
      <div className="accessories-card">
        <div className="container">
          <Breadcrumps />
          <Back />
          {isLoading && !errorMessage && <Loader />}
          {!isLoading && !errorMessage && (
            <GoodCard good={good} category="accessories" />
          )}
          {!isLoading && errorMessage && (
            <h4 className="error-title">{errorMessage}</h4>
          )}
        </div>
      </div>
    </main>
  );
};
