import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateClient } from "aws-amplify/api";
import {
  getRestaurant,
  dishesByRestaurantID,
  getDish,
  listRestaurants,
} from "../graphql/queries";
import { Alert } from "react-native";
const client = generateClient();

export const useRestaurantStore = create(
  persist(
    (set) => ({
      restaurants: [],
      restaurant: {},
      Dishes: [],
      Dish: {},
      isStoredRestaurants: false,
      loadRestaurant: false,
      loadDish: false,

      fetchRestaurants: async () => {
        try {
          const allRestaurants = await client.graphql({
            query: listRestaurants,
          });
          set({ restaurants: allRestaurants.data.listRestaurants.items });
          set({ isStoredRestaurants: true });
        } catch (err) {
          Alert.alert("Error", err.message);
        }
      },
      getRestaurantById: async (id) => {
        try {
          set({ loadRestaurant: true });

          const oneRestaurant = await client.graphql({
            query: getRestaurant,
            variables: { id: id },
          });
          set({ restaurant: oneRestaurant.data.getRestaurant });
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      },
      getRestaurantDish: async (id) => {
        try {
          const allDishs = await client.graphql({
            query: dishesByRestaurantID,
            variables: {
              restaurantID: id,
            },
          });

          set({ Dishes: allDishs.data.dishesByRestaurantID.items });
          set({ loadRestaurant: false });
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      },
      getDishById: async (id) => {
        try {
          set({ loadDish: true });
          const oneDish = await client.graphql({
            query: getDish,
            variables: { id: id },
          });

          set({ Dish: oneDish.data.getDish });
          set({ loadDish: false });
        } catch (error) {}
      },
    }),
    {
      name: "restaurant",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
