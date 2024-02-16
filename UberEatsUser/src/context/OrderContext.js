import { createContext, useState, useEffect, useContext } from "react";
import { generateClient } from "aws-amplify/api";
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
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const client = generateClient();
const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { basketRestaurent, totalPrices, basketDishes, basket, setBasket } =
    useBasketContext();

  const [orders, setOrders] = useState();

  const fetchOrders = async () => {
    const myOrder = await client.graphql({
      query: ordersByUserID,
      variables: { userID: dbUser?.id },
    });
    setOrders(myOrder.data.ordersByUserID.items);
  };

  useEffect(() => {
    fetchOrders();
  }, [dbUser]);

  const createOrders = async () => {
    // create order
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

    // add basketdish to order
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
    setBasket(null);
    setOrders([...orders, newOrder.data.createOrder]);
    return newOrder.data.createOrder;
  };

  const getOrders = async (id) => {
    const order = await client.graphql({
      query: getOrder,
      variables: { id: id },
    });

    const orderDish = await client.graphql({
      query: orderDishesByOrderID,
      variables: { orderID: id },
    });

    return {
      order: order.data.getOrder,
      dishes: orderDish.data.orderDishesByOrderID.items,
    };
  };

  return (
    <OrderContext.Provider value={{ createOrders, orders, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
