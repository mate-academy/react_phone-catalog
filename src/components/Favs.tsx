import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs';
import Title from './Title';
import {
  RootState, getFavs, getAllPhones, loadPhones,
} from '../store';
import ProductCard from './ProductCard';
import { Phones } from '../interfaces/interfaces';

type Props = {
  favs: any;
  phonesLoad: () => void;
  allPhones: Phones[];
};

const Favs: FC<Props> = ({ favs, phonesLoad, allPhones }) => {
  useEffect(() => {
    phonesLoad();
  }, [phonesLoad]);

  return (
    <div className="favs">
      <Breadcrumbs title="Favorites" />
      <Title title="Favorites" />
      {
        favs.length
          ? (
            <>
              <p className="favs__quantity">
                {favs.length}
                &nbsp;items
              </p>
              <div className="favs__grid">
                {allPhones
                  .filter(phone => favs.find((fav: string) => phone.phoneId === fav))
                  .map(phone => (
                    <div key={phone.id}>
                      <ProductCard phone={phone} />
                    </div>
                  ))}
              </div>
            </>
          )
          : (
            <h3 className="favs__oops">
              Products that you like will be displayed here
              <span role="img" aria-label="Grinny">👍</span>
            </h3>
          )
      }
    </div>
  );
};

const mapState = (state: RootState) => ({
  favs: getFavs(state),
  allPhones: getAllPhones(state),
});

const mapDispatch = {
  phonesLoad: loadPhones,
};

export default connect(mapState, mapDispatch)(Favs);
