import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { updateOrder } from "../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getOrder, getUser, listOrderDishes } from "../graphql/queries";
const client = generateClient();
const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const { dbCourier } = useAuthContext();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState();
  const [dishes, setDishes] = useState();

  const fetchOrder = async (id) => {
    if (!id) {
      setOrder(null);
      return;
    }

    const fetchedOrder = await client.graphql({
      query: getOrder,
      variables: { id: id },
    });
    setOrder(fetchedOrder.data.getOrder);

    const userData = await client.graphql({
      query: getUser,
      variables: { id: fetchedOrder.data.getOrder.userID },
    });
    setUser(userData.data.getUser);

    const dishData = await client.graphql({
      query: listOrderDishes,
      variables: {
        filter: {
          orderID: {
            eq: id,
          },
        },
      },
    });
    setDishes(dishData.data.listOrderDishes.items);

    // console.log("-----------fetchedOrder------------", fetchedOrder.user.name);
    // console.log("-----------fetchedOrder------------", fetchedOrder.dishes); ->array
    // console.log("--------------", fetchedOrder.data.getOrder.status);
  };

  const acceptOrder = async () => {
    // update order  status and assign the courier
    try {
      const updatedOrder = await client.graphql({
        query: updateOrder,
        variables: {
          input: {
            id: order.id,
            status: "ACCEPTED",
            orderCourierId: dbCourier?.id,
          },
        },
      });
      setOrder(updatedOrder.data.updateOrder);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const pickUpOrder = async () => {
    try {
      const updatedOrder = await client.graphql({
        query: updateOrder,
        variables: {
          input: {
            id: order.id,
            status: "PICKED_UP",
          },
        },
      });
      setOrder(updatedOrder.data.updateOrder);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const completeOrder = async () => {
    try {
      const updatedOrder = await client.graphql({
        query: updateOrder,
        variables: {
          input: {
            id: order.id,
            status: "COMPLETED",
          },
        },
      });
      setOrder(updatedOrder.data.updateOrder);
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  return (
    <OrderContext.Provider
      value={{
        acceptOrder,
        user,
        dishes,
        fetchOrder,
        completeOrder,
        pickUpOrder,
        order,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
