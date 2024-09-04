import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import { ordersApi } from "./ordersApi";

export const store = configureStore({
  reducer: {
    orderState: orderReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(ordersApi.middleware),
});
