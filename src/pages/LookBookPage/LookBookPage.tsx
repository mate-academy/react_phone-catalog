import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import * as previewsActions from '../../store/reducers/previewsSlice';

import { makeAlt } from '../../helpers/makeAlt';

import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import './LookBookPage.scss';

export const LookBookPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const {
    previews,
    isLoaded,
    hasError,
  } = useAppSelector(state => state.previews);

  const [updatedAt, setUpdatedAt] = useState(new Date());

  const reload = () => {
    setUpdatedAt(new Date());
  };

  useEffect(() => {
    dispatch(previewsActions.init());
  }, [updatedAt]);

  return (
    <main className="lookBook">
      <div className="container grid">
        {hasError && (
          <ErrorMessage
            rootClassName="lookBook__items"
            reload={reload}
          />
        )}

        {isLoaded && !hasError && (
          <Loader />
        )}

        {previews.length > 0 && (
          <section className="lookBook__section">
            <ul className="lookBook__section-list">
              {previews.map(preview => {
                const { link, id } = preview;

                return (
                  <li
                    key={id}
                    className="lookBook_section-list-item"
                  >
                    <img
                      className="lookBook__section-list-item-image"
                      src={link}
                      alt={makeAlt(link)}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
});
