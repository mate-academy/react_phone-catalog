import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import { Navigation } from '../Navigation/Navigation';
import './Accessories.scss';
import { LangContext } from '../../context/LangContext';
import { Catalog } from '../Catalog/Catalog';
import { setPhonesAsync } from '../../features/phonesSlice';

export const Accessories = () => {
  const { accessories } = useAppSelector(state => state.accessories);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessories.length) {
      dispatch(setPhonesAsync());
    }
  }, [dispatch, accessories.length]);

  return (
    <div className="accessories">
      <div className="accessories__container">
        <Navigation />
        <h1 className="accessories__title">
          {translate('categories.accessories', lang)}
        </h1>
        <Catalog items={accessories} />
      </div>
    </div>
  );
};
