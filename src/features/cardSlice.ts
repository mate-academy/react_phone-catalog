/* eslint no-param-reassign: "error" */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductPhone } from '../Type/phone';

type CardState = {
  cardPhones: ProductPhone[]
};

const initialState: CardState = {
  cardPhones: [
    // {
    //   id: 3,
    //   category: 'phones',
    //   phoneId: 'apple-iphone-8-64gb-gold',
    //   itemId: 'apple-iphone-8-64gb-gold',
    //   name: 'Apple iPhone 8 64GB Gold',
    //   fullPrice: 600,
    //   price: 550,
    //   screen: '4.7 IPS',
    //   capacity: '64GB',
    //   color: '"gold"',
    //   ram: '2GB',
    //   year: 2017,
    //   image: 'img/phones/apple-iphone-8/gold/00.jpg',
    // },
  ],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (card, action: PayloadAction<ProductPhone>) => {
      card.cardPhones.push({ ...action.payload, amount: 1 });
    },
    removeCard: (card, action: PayloadAction<ProductPhone>) => {
      card.cardPhones = card.cardPhones
        .filter(phone => phone.phoneId !== action.payload.phoneId);
    },

    clearCard: (card) => {
      card.cardPhones = [];
    },
    addAmount: (card, action: PayloadAction<ProductPhone>) => {
      card.cardPhones = card.cardPhones.map((phoneAmount) => {
        if (phoneAmount.phoneId === action.payload.phoneId) {
          return {
            ...action.payload,
            amount: action.payload.amount
              ? action.payload.amount + 1
              : 1,
          };
        }

        return phoneAmount;
      });
    },
    removeAmount: (card, action: PayloadAction<ProductPhone>) => {
      card.cardPhones = card.cardPhones.map((phoneAmount) => {
        if (phoneAmount.phoneId === action.payload.phoneId) {
          return {
            ...action.payload,
            amount: action.payload.amount
              ? action.payload.amount - 1
              : 1,
          };
        }

        return phoneAmount;
      });
    },
  },
});

export const {
  addCard, removeCard, clearCard, addAmount, removeAmount,

} = cardSlice.actions;
export default cardSlice.reducer;
