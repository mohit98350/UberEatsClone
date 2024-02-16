import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listCouriers } from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
const client = generateClient();
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbCourier, setDbCourier] = useState(null);
  const sub = authUser;

  const currentAuthenticatedUser = async () => {
    try {
      const { userId } = await getCurrentUser();
      setAuthUser(userId);
    } catch (err) {
      console.log(err);
    }
  };

  // onUpdateCourier
  const fetchUserBySub = async () => {
    try {
      if (sub) {
        const allUsers = await client.graphql({
          query: listCouriers,
          variables: {
            filter: {
              sub: {
                eq: sub,
              },
            },
          },
        });

        setDbCourier(allUsers.data.listCouriers.items[0]);
      }
    } catch (e) {
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    fetchUserBySub();
  }, [sub]);

  useEffect(() => {
    currentAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (!dbCourier) {
      return;
    }
    const subscription = client
      .graphql({
        query: subscriptions.onUpdateCourier,
        variables: {
          filter: {
            id: { eq: dbCourier?.id },
          },
        },
      })
      .subscribe({
        next: ({ data }) => setDbCourier(data.onUpdateCourier),
        error: (error) => console.warn(error),
      });

    return () => subscription.unsubscribe();
  }, [dbCourier]);

  return (
    <AuthContext.Provider value={{ authUser, dbCourier, sub, setDbCourier }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
