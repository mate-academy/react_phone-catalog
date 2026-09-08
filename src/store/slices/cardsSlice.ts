/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

export type CardType = {
  card: Product;
  cardTotalCost: number;
  cardNumber: number;
};

type CardsState = {
  cards: CardType[];
  cardsLength: number;
  totalCost: number;
  loading: boolean;
  error: string | null;
};

export const loadCard = createAsyncThunk('cards/loadCard', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const storedCard = localStorage.getItem('cards');

  return storedCard ? JSON.parse(storedCard) : [];
});

const initialState: CardsState = {
  cards: [],
  cardsLength: 0,
  totalCost: 0,
  loading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addToCard: (state, action: PayloadAction<Product>) => {
      const isAlreadyAdded = state.cards.some(
        item => item.card.itemId === action.payload.itemId,
      );

      if (!isAlreadyAdded) {
        const newCard: CardType = {
          card: action.payload,
          cardTotalCost: action.payload.price,
          cardNumber: 1,
        };

        state.cards.unshift(newCard);
        state.cardsLength += 1;
        state.totalCost += newCard.cardTotalCost;
        localStorage.setItem('cards', JSON.stringify(state.cards));
      }
    },

    removeFromCard: (state, action: PayloadAction<string>) => {
      const removedItem = state.cards.find(
        item => item.card.itemId === action.payload,
      );

      if (removedItem) {
        state.cards = state.cards.filter(
          item => item.card.itemId !== action.payload,
        );
        state.cardsLength -= 1;
        state.totalCost -= removedItem.cardTotalCost;
        localStorage.setItem('cards', JSON.stringify(state.cards));
      }
    },

    increaseCard: (state, action: PayloadAction<string>) => {
      let costDifference = 0;

      state.cards = state.cards.map(card => {
        if (card.card.itemId === action.payload) {
          costDifference = card.card.price;

          return {
            ...card,
            cardNumber: card.cardNumber + 1,
            cardTotalCost: card.cardTotalCost + card.card.price,
          };
        }

        return card;
      });

      state.totalCost += costDifference;
      localStorage.setItem('cards', JSON.stringify(state.cards));
    },

    decreaseCard: (state, action: PayloadAction<string>) => {
      let costDifference = 0;

      state.cards = state.cards.map(card => {
        if (card.card.itemId === action.payload && card.cardNumber > 1) {
          costDifference = card.card.price;

          return {
            ...card,
            cardNumber: card.cardNumber - 1,
            cardTotalCost: card.cardTotalCost - card.card.price,
          };
        }

        return card;
      });

      state.totalCost -= costDifference;
      localStorage.setItem('cards', JSON.stringify(state.cards));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCard.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.cardsLength = action.payload.length;
        state.totalCost =
          action.payload
            .map((item: CardType) => item.cardTotalCost)
            .reduce((a: number, b: number) => a + b, 0) || 0;
        state.loading = false;
      })
      .addCase(loadCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load cards';
      });
  },
});

export const { addToCard, removeFromCard, increaseCard, decreaseCard } =
  cardsSlice.actions;
export default cardsSlice.reducer;
