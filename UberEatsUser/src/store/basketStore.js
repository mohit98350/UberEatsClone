import { generateClient } from "aws-amplify/api";
import { listBaskets, basketDishesByBasketID } from "../graphql/queries";
import { createBasket, createBasketDish } from "../graphql/mutations";
import { useAuthStore } from "./authStore";

const client = generateClient();

export const useBasketStore = create((set) => ({
  basket: {},
  loading: true,
  basketRestaurent: {},
  dbUser: useAuthStore.getState().dbUser,

  addBasketRestaurant: async (restaurant) => {
    try {
      set({ basketRestaurent: restaurant });
    } catch (error) {
      console.log("error", error.message);
    }
  },
  fetchAvailableBasket: async () => {
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
}));
