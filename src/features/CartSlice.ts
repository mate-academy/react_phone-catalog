import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";

type CartItem = Product & { quantity: number }

interface CartState {
  cartItems: CartItem[];
  loading: boolean;


}
const initialState: CartState = {
  cartItems: [],
  loading: false,

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const findItem = state.cartItems.find(item => item.id === action.payload.id)
      if (!findItem) {
        state.cartItems.push({ ...action.payload,quantity:1 })
      } else { findItem.quantity+=1}
    },
    clearOneItem: (state, action:PayloadAction<string>) => {
      state.cartItems= state.cartItems.filter(item=>item.id !==action.payload)
    },
    incrementQuantity: (state, action:PayloadAction<string>) => {
       const findItem = state.cartItems.find(item => item.id === action.payload)
      if (findItem ) {
        findItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action:PayloadAction<string>) => {
      const findItem = state.cartItems.find(item => item.id === action.payload)
      if(findItem && findItem.quantity>1){findItem.quantity-=1}
    },
    clearAllCartItem: (state) => {
      state.cartItems = [];
    }
  }
})

export const { addToCart, clearAllCartItem , clearOneItem, decrementQuantity, incrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;
