import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { getUser, listUsers } from "../graphql/queries";

const client = generateClient();
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentAuthenticatedUser = async () => {
    try {
      const { userId } = await getCurrentUser();

      setAuthUser(userId);
    } catch (err) {
      console.log(err);
    }
  };
  const sub = authUser;
  const fetchUserBySub = async () => {
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

        setDbUser(allUsers.data.listUsers.items[0]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchUserBySub();
  }, [sub]);

  useEffect(() => {
    currentAuthenticatedUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
