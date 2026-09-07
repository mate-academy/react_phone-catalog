import React, { useContext } from 'react';
import './Modale.scss';
import { CatalogContext } from '../../../../context/CatalogContext';
import { ModaleButton } from '../../../../types';

export const Modale = () => {
  const { setCheckoutIsClicked, setCart } = useContext(CatalogContext);

  return (
    <section className="modale">
      <article className="modale__window">
        <h4 className="modale__window--title">
          Checkout is not implemented yet. Do you want to clear the Cart ?
        </h4>

        <div className="modale__buttons">
          <button
            className="body-text modale__buttons--cencel"
            onClick={() => setCheckoutIsClicked(false)}
          >
            {ModaleButton.Cencel}
          </button>

          <button
            className="body-text modale__buttons--confirm"
            onClick={() => {
              setCart([]);
              setCheckoutIsClicked(false);
            }}
          >
            {ModaleButton.Confirm}
          </button>
        </div>
      </article>
    </section>
  );
};
