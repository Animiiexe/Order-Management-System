import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/api';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (params, thunkAPI) => {
  const res = await API.get('/orders', { params });
  return res.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {
    addOrder(state, action) { state.list.unshift(action.payload); },
    updateOrder(state, action) {
      const idx = state.list.findIndex(o => o._id === action.payload._id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    removeOrder(state, action) {
      state.list = state.list.filter(o => o._id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => { state.status = 'loading'; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addOrder, updateOrder, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
