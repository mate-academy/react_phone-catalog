import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import './PageNotFound.scss';
import { LangContext } from '../../context/LangContext';
import { setPhonesAsync } from '../../features/phonesSlice';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  const { tablets } = useAppSelector(state => state.tablets);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tablets.length) {
      dispatch(setPhonesAsync());
    }
  }, [dispatch, tablets.length]);

  return (
    <div className="not-found">
      <h1 className="not-found__title">{translate('not-found.title', lang)}</h1>
      <Link to={'/'} className="not-found__button button">
        {translate('not-found.button', lang)}
      </Link>
      <img
        src="img/page-not-found.png"
        alt="img page-not-found"
        className="not-found__img"
      />
    </div>
  );
};
