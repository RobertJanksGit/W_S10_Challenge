import { createSlice } from "@reduxjs/toolkit";

const initialState = { displayAllOrders: true, displaySize: "" };

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    toggleDisplayAll(state) {
      state.displayAllOrders = true;
      state.displaySize = "";
    },
    setDisplaySize(state, action) {
      state.displayAllOrders = false;
      state.displaySize = action.payload;
    },
  },
});

export const { toggleDisplayAll, setDisplaySize } = orderSlice.actions;

export default orderSlice.reducer;
