import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/pizza/" }),
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => "history",
      providesTags: ["Orders"],
    }),
    createOrder: build.mutation({
      query: ({ name, size, toppings }) => ({
        url: "order",
        method: "POST",
        body: { fullName: name, size, toppings },
      }),
    }),
  }),
});

export const { useGetOrders, useCreateOrder } = ordersApi;
