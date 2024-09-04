import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersQuery } from "../state/ordersApi";
import { toggleDisplayAll, setDisplaySize } from "../state/orderSlice";

export default function OrderList() {
  // RTK Query
  const {
    data: orders,
    isLoading: ordersLoading,
    isFetching: ordersRefreshing,
  } = useGetOrdersQuery();

  // Use the correct path to select the slice of state
  const displayAllOrders = useSelector(
    (state) => state.orderState.displayAllOrders
  );
  const displayOrderSize = useSelector((state) => state.orderState.displaySize);
  const dispatch = useDispatch();

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders
          ?.filter((order) => {
            return displayAllOrders || order.size === displayOrderSize;
          })
          .map((order, idx) => {
            return (
              <li key={idx}>
                {order.toppings ? (
                  <div>{`${order.customer} ordered a size ${order.size} with ${order.toppings.length} toppings`}</div>
                ) : (
                  <div>{`${order.customer} ordered a size ${order.size} with no toppings`}</div>
                )}
              </li>
            );
          })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className =
            size === "All" && displayAllOrders
              ? "button-filter active"
              : size === displayOrderSize
              ? "button-filter active"
              : "button-filter";

          const handleClick = () => {
            if (size === "All") {
              dispatch(toggleDisplayAll());
              // dispatch("");
            } else {
              dispatch(setDisplaySize(size));
            }
          };

          return (
            <button
              onClick={handleClick}
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
