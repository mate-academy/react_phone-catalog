import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import { Navigation } from '../Navigation/Navigation';
import './Phones.scss';
import { LangContext } from '../../context/LangContext';
import { Catalog } from '../Catalog/Catalog';
import { setPhonesAsync } from '../../features/phonesSlice';

export const Phones = () => {
  const { phones } = useAppSelector(state => state.phones);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!phones.length) {
      dispatch(setPhonesAsync());
    }
  }, [dispatch, phones.length]);

  return (
    <div className="phones">
      <div className="phones__container">
        <Navigation />
        <h1 className="phones__title">
          {translate('categories.phones', lang)}
        </h1>
        <p className="phones__text">{`${phones.length} ${translate('categories.models', lang)}`}</p>
        <Catalog items={phones} />
      </div>
    </div>
  );
};
