import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersQuery, useCreateOrderMutation } from "../state/ordersApi";
import { toggleDisplayAll, setDisplaySize } from "../state/orderSlice";

export default function OrderList() {
  //rtk query
  const {
    data: orders,
    isLoading: ordersLoading,
    isFetching: ordersRefreshing,
  } = useGetOrdersQuery();
  // const toggleDisplayOrders = useSelector(
  //   (st) => st.ordersState.toggleDisplayOrders
  // );
  // const setDisplayOrderSize = useSelector(
  //   (st) => st.ordersState.setDisplayOrderSize
  // );
  // const dispatch = useDispatch();

  // console.log(toggleDisplay);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders?.map((order, idx) => {
          return (
            <li key={idx}>
              <div>{`${order.customer} ordered a size ${order.size} with ${order.toppings.length} toppings`}</div>
            </li>
          );
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${size === "All" ? " active" : ""}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
