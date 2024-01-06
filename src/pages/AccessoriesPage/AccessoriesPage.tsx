import { useEffect, useState } from 'react';
import { client } from '../../helpers/utils/fetchData';
import { Categories } from '../../Types/Categories';
import { Tablet } from '../../Types/Tablet';
import { Card } from '../../components/Card/Card';
import { Loader } from '../../components/Loader/Loader';
import homeImage from '../../images/home.svg';
import arrowRight from '../../images/arrow-right-secondary-color.svg';
import { useProducts } from '../../helpers/CatalogContext/CatalogContext';
import { SearchResult } from '../../components/SearchResult/SearchResult';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Tablet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchProducts();

        setAccessories(data);

        setAccessories(prev => (
          prev.filter(i => i.category === Categories.Accessories)
        ));
        setIsLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setAccessories]);

  const { appliedQuery } = useProducts();
  const [searchingPhones, setSearchingPhones] = useState(accessories);

  useEffect(() => {
    const lowerQuery = appliedQuery.toLowerCase();

    const searching = accessories.filter(
      i => i.name.toLowerCase().includes(lowerQuery),
    );

    setSearchingPhones(searching);
  }, [appliedQuery, accessories]);

  return (
    <div className="tablets">
      <div className="path">
        <img src={homeImage} alt="home_icon" />
        <img src={arrowRight} alt="arrow_right" />
        <h3>Accessories</h3>
      </div>
      <>
        {appliedQuery ? (
          <SearchResult results={searchingPhones} />
        ) : (
          <>
            <h1 className="tablets__header">Accessories</h1>
            <div>
              {isLoading ? (
                <Loader />
              ) : (
                <div className="phones-container">
                  {accessories.map(accessory => (
                    <Card card={accessory} discount key={accessory.id} />
                  ))}
                </div>
              )}
            </div>
            {!isLoading && accessories.length === 0 && (
              <div>
                <h1>There are no accessories yet</h1>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};
