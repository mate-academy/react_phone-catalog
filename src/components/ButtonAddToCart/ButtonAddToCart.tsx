import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  setCartId as setCartIdStore,
  setPriceToAmount as setPriceToAmountStore,
  setQuantityToTotal as setQuantityToTotalStore,
} from '../../store/ActionCreators';

interface Props {
  id: string;
  price: number;
}

interface StateProps {
  phonesCart: {};
}

interface DispatchProps {
  setCartId: (value: PhoneCartInfo) => void;
  setPriceToAmount: (value: number) => void;
  setQuantityToTotal: (value: number) => void;
}

type ComponentProps = Props & StateProps & DispatchProps;

export const ButtonAddToCartTemplate: FC<ComponentProps> = ({
  id,
  price,
  phonesCart,
  setCartId,
  setPriceToAmount,
  setQuantityToTotal,
}) => (
  <>
    {!Object.keys(phonesCart).includes(id)
      ? (
        <button
          type="button"
          className="card__button-cart"
          onClick={() => {
            const phone = {
              id,
              quantity: 1,
            };

            setCartId(phone);
            setPriceToAmount(price);
            setQuantityToTotal(1);
          }}
        >
          Add to cart
        </button>
      )
      : (
        <button
          type="button"
          className="card__button-cart button-cart--added"
          disabled
        >
          Added to cart
        </button>
      )}
  </>
);

const mapStateToProps = (state: State) => ({
  phonesCart: state.phonesCart,
});

const mapDispatchToProps = {
  setCartId: setCartIdStore,
  setPriceToAmount: setPriceToAmountStore,
  setQuantityToTotal: setQuantityToTotalStore,
};

export const ButtonAddToCart = connect<StateProps, DispatchProps, Props, State>(
  mapStateToProps, mapDispatchToProps,
)(ButtonAddToCartTemplate);
