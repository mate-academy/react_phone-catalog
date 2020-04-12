import React, { FC } from 'react';
import './_FavouritesMain.scss';
import { connect } from 'react-redux';
import {
  FavouritesState,
  PhoneInterface,
  PhoneState,
} from '../../constants/types';
import { getFavourites } from '../../store/reducers/favouritesReducer';
import { Catalog } from '../Catalog/Catalog';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { getPhones } from '../../store/reducers/phoneReducer';

interface Props {
  favourites: string[];
  phones: PhoneInterface[];
}

export const FavouritesTemplate: FC<Props> = (props) => {
  const { favourites, phones } = props;

  const arr = favourites.map((phoneId: string) => {
    // eslint-disable-next-line max-len
    const phone = phones.find((item: PhoneInterface) => item.phoneId === phoneId) as PhoneInterface;

    return {
      ...phone,
    };
  });

  return (
    <section className="favourites">
      <div className="favourites__container wrapper">
        <Breadcrumbs phonesArray={arr} directory="Favourites" />
        <Catalog phonesArray={arr} />
      </div>
    </section>
  );
};

const mapStateToProps = (
  state: {
    favouritesReducer: FavouritesState;
    phoneReducer: PhoneState;
},
) => ({
  favourites: getFavourites(state.favouritesReducer),
  phones: getPhones(state.phoneReducer),
});

export const FavouritesMain = connect(mapStateToProps)(FavouritesTemplate);
