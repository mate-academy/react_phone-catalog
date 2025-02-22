import './Categories.scss';
import { useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);
  const { lang } = useContext(LangContext);

  return (
    <div className="categories">
      <div className="category">
        <Link
          to="/phones"
          className="categories__img--box categories__img-box--phones"
        >
          <img
            src="img/categories-phones-new.png"
            alt="category phones"
            className="categories__img"
          />
        </Link>
        <Link
          to="/phones"
          className="categories__img--box categories__title--box"
        >
          <h4 className="categories__title">
            {translate('categories.phones', lang)}
          </h4>
        </Link>
        <p className="categories__text">{`${phones.length} ${translate('categories.models', lang)}`}</p>
      </div>

      <div className="category">
        <Link
          to="/tablets"
          className="categories__img--box categories__img-box--tablets"
        >
          <img
            src="img/categories-tablets-new.png"
            alt="category tablets"
            className="categories__img"
          />
        </Link>
        <Link
          to="/tablets"
          className="categories__img--box categories__title--box"
        >
          <h4 className="categories__title">
            {translate('categories.tablets', lang)}
          </h4>
        </Link>
        <p className="categories__text">{`${tablets.length} ${translate('categories.models', lang)}`}</p>
      </div>

      <div className="category">
        <Link
          to="/accessories"
          onClick={() => window.scrollTo(0, 0)}
          className="categories__img--box categories__img-box--accessories"
        >
          <img
            src="img/categories-assessories-new.png"
            alt="category accessories"
            className="categories__img"
          />
        </Link>
        <Link
          to="/accessories"
          onClick={() => window.scrollTo(0, 0)}
          className="categories__img--box categories__title--box"
        >
          <h4 className="categories__title">
            {translate('categories.accessories', lang)}
          </h4>
        </Link>
        <p className="categories__text">{`${accessories.length} ${translate('categories.models', lang)}`}</p>
      </div>
    </div>
  );
};
