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

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetchProducts();

        setTablets(data);

        setTablets(prev => prev.filter(i => i.category === Categories.Tablets));
        setIsLoading(false);
      } catch (error) {
        throw new Error();
      }
    };

    fetchData();
  }, [setTablets]);

  const { query } = useProducts();
  const [searchingPhones, setSearchingPhones] = useState(tablets);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    const searching = tablets.filter(
      i => i.name.toLowerCase().includes(lowerQuery),
    );

    setSearchingPhones(searching);
  }, [query, tablets]);

  return (
    <>
      {query ? (
        <SearchResult results={searchingPhones} />
      ) : (
        <div className="tablets">
          <div className="path">
            <img src={homeImage} alt="home_icon" />
            <img src={arrowRight} alt="arrow_right" />
            <h3>Tablets</h3>
          </div>
          <h1 className="tablets__header">Tablets</h1>

          <div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="phones-container">
                {tablets.map(tablet => (
                  <Card card={tablet} discount key={tablet.id} />
                ))}
              </div>
            )}
          </div>
          {!isLoading && tablets.length === 0 && (
            <div>
              <h1>There are no tablets yet</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};
