import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
  auth: {
    isLoggedIn: true
  },
  productData: []
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
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
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount, addProduct, deleteProduct, sortProductByName, sortProductByPrice } = productSlice.actions;

export const selectCount = (state) => state.product.value;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default productSlice.reducer;
