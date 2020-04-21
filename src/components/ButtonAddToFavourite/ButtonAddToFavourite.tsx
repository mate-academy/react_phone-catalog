import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  setFavouriteId as setFavouriteIdStore,
  deleteFavouriteId as deleteFavouriteIdStore,
} from '../../store/ActionCreators';

interface Props {
  id: string;
}

interface StateProps {
  phonesFavourite: string[];
}

interface DispatchProps {
  setFavouriteId: (value: string) => void;
  deleteFavouriteId: (value: string) => void;
}

type ComponentProps = Props & StateProps & DispatchProps;

export const ButtonAddToFavouriteTemplate: FC<ComponentProps> = ({
  id,
  phonesFavourite,
  setFavouriteId,
  deleteFavouriteId,
}) => (
  <>
    {!phonesFavourite.includes(id)
      ? (
        <button
          type="button"
          className="card__button-favourite"
          onClick={() => setFavouriteId(id)}
        >
          {/* eslint-disable-next-line max-len */}
          <svg className="icon-card" width="18" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path fillRule="evenodd" clipRule="evenodd" d="M100 34.976c0 8.434-3.635 16.019-9.423 21.274h0.048l-31.25 31.25c-3.125 3.125-6.25 6.25-9.375 6.25s-6.25-3.125-9.375-6.25l-31.202-31.25c-5.788-5.255-9.423-12.84-9.423-21.274 0-15.865 12.861-28.726 28.726-28.726 8.434 0 16.019 3.635 21.274 9.423 5.255-5.788 12.84-9.423 21.274-9.423 15.865 0 28.726 12.861 28.726 28.726z" fill="#fff" stroke="#2060f6" strokeWidth="6" />
          </svg>
        </button>
      )
      : (
        <button
          type="button"
          className="card__button-favourite"
          onClick={() => deleteFavouriteId(id)}
        >
          {/* eslint-disable-next-line max-len */}
          <svg className="icon-card" width="18" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path fillRule="evenodd" clipRule="evenodd" d="M100 34.976c0 8.434-3.635 16.019-9.423 21.274h0.048l-31.25 31.25c-3.125 3.125-6.25 6.25-9.375 6.25s-6.25-3.125-9.375-6.25l-31.202-31.25c-5.788-5.255-9.423-12.84-9.423-21.274 0-15.865 12.861-28.726 28.726-28.726 8.434 0 16.019 3.635 21.274 9.423 5.255-5.788 12.84-9.423 21.274-9.423 15.865 0 28.726 12.861 28.726 28.726z" fill="#2060f6" stroke="#2060f6" strokeWidth="6" />
          </svg>
        </button>
      )}
  </>
);

const mapStateToProps = (state: State) => ({
  phonesFavourite: state.phonesFavourite,
});

const mapDispatchToProps = {
  setFavouriteId: setFavouriteIdStore,
  deleteFavouriteId: deleteFavouriteIdStore,
};

export const ButtonAddToFavourite = connect<
  StateProps,
  DispatchProps,
  Props,
  State
>(mapStateToProps, mapDispatchToProps)(ButtonAddToFavouriteTemplate);
