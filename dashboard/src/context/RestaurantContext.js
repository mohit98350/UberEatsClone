import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listRestaurants } from "../graphql/queries";

const client = generateClient();
const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [restaurant, setRestaurant] = useState();

  const sub = user;
  console.log("sub from context", sub);
  const currentAuthenticatedUser = async () => {
    try {
      const { userId } = await getCurrentUser();

      setUser(userId);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRestaurentBySub = async () => {
    try {
      const allOrders = await client.graphql({
        query: listRestaurants,
        variables: {
          filter: {
            adminSub: {
              eq: sub,
            },
          },
        },
      });

      setRestaurant(allOrders.data.listRestaurants.items[0]);
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  useEffect(() => {
    currentAuthenticatedUser();
  }, []);

  useEffect(() => {
    // fetch restaurent anf fliter by sub
    if (!sub) {
      return;
    }
    fetchRestaurentBySub();
  }, [sub]);

  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant, sub }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);
