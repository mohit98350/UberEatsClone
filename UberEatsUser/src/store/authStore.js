import { create } from "zustand";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listUsers } from "../graphql/queries";
import { createUser, updateUser } from "../graphql/mutations";
const client = generateClient();

export const useAuthStore = create((set) => ({
  authUser: "",
  dbUser: {},
  loading: false,
  currentAuthenticatedUser: async () => {
    try {
      set({ loading: true });
      const { userId } = await getCurrentUser();
      set({ authUser: userId });
    } catch (err) {
      console.log(err);
    }
  },

  fetchUserBySub: async (sub) => {
    try {
      if (sub) {
        const allUsers = await client.graphql({
          query: listUsers,
          variables: {
            filter: {
              sub: {
                eq: sub,
              },
            },
          },
        });

        set({ dbUser: allUsers.data.listUsers.items[0] });
        set({ loading: false });
      }
    } catch (error) {
      console.log("error", error.message);
    }
  },
  updateUser: async (paylaod) => {
    try {
      const { dbUser, name, address, lat, lng } = paylaod;
      const updatedUser = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: dbUser?.id,
            name: name,
            address: address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          },
        },
      });

      set({ dbUser: updatedUser });
    } catch (error) {}
  },
  createUser: async (payload) => {
    try {
      const { name, address, lat, lng, sub } = payload;
      const user = await client.graphql({
        query: createUser,
        variables: {
          input: {
            name: name,
            address: address,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            sub: sub,
          },
        },
      });

      set({ dbUser: user.data.createUser });
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  },
}));
