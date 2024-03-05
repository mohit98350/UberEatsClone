import { create } from "zustand";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listUsers } from "../graphql/queries";

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
        // console.log("dbuser", dbUser);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  },
}));
