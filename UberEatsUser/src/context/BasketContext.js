import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "../context/AuthContext";
import { generateClient } from "aws-amplify/api";
import { listBaskets, basketDishesByBasketID } from "../graphql/queries";
import { createBasket, createBasketDish } from "../graphql/mutations";

const client = generateClient();

const BasketContext = createContext();

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const [basket, setBasket] = useState(null);
  const [basketRestaurent, setBasketRestaurent] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);
  const totalPrices = basketDishes?.reduce(
    (sum, basketDish) => sum + basketDish?.quantity * basketDish?.Dish?.price,
    basketRestaurent?.deliveryFee
  );

  // const totalPrices = 12;
  const fetchAvailableBasket = async () => {
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

    setBasket(existingBaskets.data.listBaskets.items[0]);
  };

  const fetchBasketDishes = async () => {
    const oneBasketDish = await client.graphql({
      query: basketDishesByBasketID,
      variables: { basketID: basket?.id },
    });

    setBasketDishes(oneBasketDish.data.basketDishesByBasketID.items);
  };

  useEffect(() => {
    fetchAvailableBasket();
  }, [dbUser, basketRestaurent]);

  useEffect(() => {
    if (basket) {
      fetchBasketDishes();
    }
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
    // get the existing basket or create a new one
    let theBasket = basket || (await createNewBasket());

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

      setBasketDishes([...basketDishes, newDish.data.createBasketDish]);
    }
  };

  const createNewBasket = async () => {
    const newBasket = await client.graphql({
      query: createBasket,
      variables: {
        input: {
          userID: dbUser?.id,
          restaurantID: basketRestaurent?.id,
        },
      },
    });

    setBasket(newBasket.data.createBasket);
    return newBasket.data.createBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        setBasketRestaurent,
        basket,
        basketRestaurent,
        basketDishes,
        totalPrices,
        setBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
