import './Favourites.scss';
import { PathToPage } from '../../PartToPage/PathToPage';
import { CardList } from '../../ProductCard/CardList';
import { useFavourites } from '../../Context/FavouritesContext';
import { useTranslation } from 'react-i18next';

export const Favourites = () => {
  const { t } = useTranslation();
  const { favouriteList } = useFavourites();

  return (
    <div className="favourites">
      <div className="favourites__path-to-page">
        <PathToPage arrayPath={[t('favouritePage.0')]} />
      </div>
      {favouriteList && favouriteList.length === 0 ? (
        <>
          <h1 className="text--h1">{t('favouritePage.0')}</h1>
          <span className="favourites__items text--h3">
            {t('favouritePageNull.0')}
            <br />
            {t('favouritePageNull.1')}
            <br />
          </span>
          <div className="favourites__title favourites__title--no"></div>
        </>
      ) : (
        <>
          <div className="favourites__title">
            <h1 className="text--h1">{t('favouritePage.0')}</h1>
            <span className="favourites__items text--body">
              {favouriteList?.length} {t('favouritePage.1')}
            </span>
          </div>
          <div className="favourites__list">
            <CardList listProduct={favouriteList} />
          </div>
        </>
      )}
    </div>
  );
};
