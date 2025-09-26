import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const { data } = await API.get("/orders");
  return data;
});

// Delete order
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id) => {
  await API.delete(`/orders/${id}`);
  return id;
});

// Update order
export const updateOrder = createAsyncThunk("orders/updateOrder", async ({ id, quantity }) => {
  const { data } = await API.put(`/orders/${id}`, { quantity });
  return data;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: { list: [], loading: false, error: null },
  reducers: {
 
    addOrder: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((o) => o._id !== action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

// ✅ export addOrder so AdminDashboard can use it
export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
