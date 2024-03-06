import { create } from "zustand";
import {
  createOrder,
  createOrderDish,
  deleteBasket,
} from "../graphql/mutations";
import {
  ordersByUserID,
  getOrder,
  orderDishesByOrderID,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useBasketStore } from "./basketStore";
const client = generateClient();

export const useOrderStore = create((set, get) => ({
  orders: [],
  order: {},
  loadOrders: false,
  loadOrderHistory: false,

  fetchOrders: async (dbUser) => {
    try {
      set({ loadOrderHistory: true });
      const myOrder = await client.graphql({
        query: ordersByUserID,
        variables: { userID: dbUser?.id },
      });
      set({ orders: myOrder.data.ordersByUserID.items });
      set({ loadOrderHistory: false });
    } catch (error) {}
  },
  getOrders: async (id) => {
    try {
      set({ loadOrders: true });
      const order = await client.graphql({
        query: getOrder,
        variables: { id: id },
      });

      const orderDish = await client.graphql({
        query: orderDishesByOrderID,
        variables: { orderID: id },
      });

      set({
        order: {
          order: order.data.getOrder,
          dishes: orderDish.data.orderDishesByOrderID.items,
        },
      });
      set({ loadOrders: false });
    } catch (error) {}
  },
  createOrders: async (paylaod) => {
    const { basketRestaurent, totalPrices, dbUser, basketDishes, basket } =
      paylaod;

    try {
      const newOrder = await client.graphql({
        query: createOrder,
        variables: {
          input: {
            userID: dbUser?.id,
            orderRestaurantId: basketRestaurent?.id,
            total: totalPrices,
            status: "NEW",
          },
        },
      });
      await Promise.all(
        basketDishes.map((basketDish) =>
          client.graphql({
            query: createOrderDish,
            variables: {
              input: {
                quantity: basketDish?.quantity,
                orderDishDishId: basketDish?.Dish?.id,
                orderID: newOrder?.data?.createOrder?.id,
              },
            },
          })
        )
      );
      // delete basket
      await client.graphql({
        query: deleteBasket,
        variables: {
          input: {
            id: basket?.id,
          },
        },
      });
      useBasketStore.setState({ basket: {} });
      set((state) => ({
        orders: [...state.orders, newOrder.data.createOrder],
      }));

      return newOrder.data.createOrder;
    } catch (error) {
      console.log("error", error.message);
    }
  },
}));
