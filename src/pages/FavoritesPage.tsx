import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import { PageProducts } from '../components/PageProducts/PageProducts';
import { ICONS } from '../icons';
import { inlineStyles } from '../utils/inlineStyles';
import { Product } from '../types/Product';

export const FavoritesPage = () => {
  const { localStore } = useContext(GlobalContext);
  const itemsInFav = localStore.filter(item => item.inFavourite);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLocaleLowerCase() || '';

  const getSortedFav = () => {
    let updatedState: Product[] = [...itemsInFav];

    if (query) {
      updatedState = updatedState
        .filter(item => item.name.toLocaleLowerCase()
          .includes(query));
    }

    return updatedState;
  };

  const sortedProducts = getSortedFav();

  return (
    <div className="page-favoutites">
      <div className="page-navigation">
        <div className="page-navigation_address">
          <a href="#/" className="page-navigation_link">
            <img src={ICONS.iconHome} alt="Icon home" />
          </a>
          <img src={ICONS.arrowRight} alt="Arrow right" />
          <p
            className="small-text-style"
            style={{ color: inlineStyles.colors.secondaryColor }}
          >
            Favourites
          </p>
        </div>
        <div className="phones-page_top" style={{ marginBottom: '40px' }}>
          <h1 className="phones-page_title page-title-style">Favourites</h1>
          <p
            className="body-text-style"
            style={{ color: inlineStyles.colors.secondaryColor }}
          >
            {`${sortedProducts.length} models`}
          </p>
        </div>
        {sortedProducts.length > 0 ? (
          <div className="products-wrapp">
            <PageProducts items={sortedProducts} />
          </div>
        ) : (
          <div className="phones-page_no-result">
            <h1 className="empty-pages_title page-title-styles">
              {' '}
              Unfortunately, we couldn&apos;t find any items
              <br />
              that match your request.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
