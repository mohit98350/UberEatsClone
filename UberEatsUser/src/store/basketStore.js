import { generateClient } from "aws-amplify/api";
import { listBaskets, basketDishesByBasketID } from "../graphql/queries";
import { createBasket, createBasketDish } from "../graphql/mutations";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

const client = generateClient();

export const useBasketStore = create((set) => ({
  basket: {},
  loading: false,
  basketRestaurent: {},
  basketDishes: [],
  totalPrices: 0.0,
  dbUser: useAuthStore.getState().dbUser,

  addBasketRestaurant: async (restaurant) => {
    try {
      set({ basketRestaurent: restaurant });
    } catch (error) {
      console.log("error", error.message);
    }
  },
  fetchAvailableBasket: async (dbUser, basketRestaurent) => {
    try {
      const existingBaskets = await client.graphql({
        query: listBaskets,
        variables: {
          filter: {
            and: [
              { restaurantID: { eq: basketRestaurent.id } },
              { userID: { eq: dbUser.id } },
            ],
          },
        },
      });

      set({ basket: existingBaskets.data.listBaskets.items[0] });
    } catch (err) {
      console.log(err);
    }
  },
  fetchBasketDishes: async (basket) => {
    try {
      const oneBasketDish = await client.graphql({
        query: basketDishesByBasketID,
        variables: { basketID: basket?.id },
      });

      set({ basketDishes: oneBasketDish.data.basketDishesByBasketID.items });
    } catch (error) {
      console.log("error", error.message);
    }
  },
  addDishToBasket: async (payload) => {
    try {
      const { dish, quantity, basket } = payload;
      let theBasket =
        basket || (await useBasketStore.getState().createNewBasket());

      // create a BasketDish item and save it

      if (quantity && dish.id && theBasket.id) {
        const newDish = await client.graphql({
          query: createBasketDish,
          variables: {
            input: {
              quantity: quantity,
              basketDishDishId: dish?.id,
              basketID: theBasket?.id,
            },
          },
        });
        set((state) => ({
          basketDishes: [...state.basketDishes, newDish.data.createBasketDish],
        }));
      }
    } catch (error) {
      console.log("error", error.message);
    }
  },
  createNewBasket: async () => {
    const dbUser = useAuthStore.getState().dbUser;
    const basketRestaurent = useBasketStore.getState().basketRestaurent;
    const newBasket = await client.graphql({
      query: createBasket,
      variables: {
        input: {
          userID: dbUser?.id,
          restaurantID: basketRestaurent?.id,
        },
      },
    });

    set({ basket: newBasket.data.createBasket });
    return newBasket.data.createBasket;
  },
  fetchTotalPrice: async () => {
    try {
      set((state) => ({
        totalPrices: state.basketDishes.reduce(
          (sum, basketDish) =>
            sum + basketDish.quantity * basketDish.Dish.price,
          state.basketRestaurent.deliveryFee
        ),
      }));
    } catch (error) {}
  },
}));
