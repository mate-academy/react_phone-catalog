import React, { FC } from 'react';
import './_FavouritesMain.scss';
import { connect } from 'react-redux';
import { PhoneInterface, State } from '../../constants/types';
import { getFavourites } from '../../store/rootReducer';
import { Catalog } from '../Catalog/Catalog';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

interface Props {
  favourites: PhoneInterface[];
}

export const FavouritesTemplate: FC<Props> = (props) => {
  const { favourites } = props;

  return (
    <section className="favourites">
      <div className="favourites__container wrapper">
        <Breadcrumbs phonesArray={favourites} directory="Favourites" />
        <Catalog phonesArray={favourites} />
      </div>
    </section>
  );
};

const mapStateToProps = (state: State) => ({
  favourites: getFavourites(state),
});

export const FavouritesMain = connect(mapStateToProps)(FavouritesTemplate);
