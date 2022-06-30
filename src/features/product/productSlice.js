import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  auth: {
    isLoggedIn: true
  },
  productData: []
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productData.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter((ele, index) => index !== action.payload);
    },
    sortProductByName: (state, action) => {
      if (action.payload) {
        state.productData = state.productData.sort((a, b) => b.productName.localeCompare(a.productName));
      }
      else {
        state.productData = state.productData.sort((a, b) => a.productName.localeCompare(b.productName));
      }
    },
    sortProductByPrice: (state, action) => {
      if (action.payload) {
        state.productData = state.productData.sort((a, b) => b.price.localeCompare(a.price));
      }
      else {
        state.productData = state.productData.sort((a, b) => a.price.localeCompare(b.price));
      }
    },
  },
});

export const { addProduct, deleteProduct, sortProductByName, sortProductByPrice } = productSlice.actions;

export default productSlice.reducer;
