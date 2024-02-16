/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCourier = /* GraphQL */ `
  query GetCourier($id: ID!) {
    getCourier(id: $id) {
      id
      name
      sub
      lat
      lng
      transportationMode
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCouriers = /* GraphQL */ `
  query ListCouriers(
    $filter: ModelCourierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouriers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        sub
        lat
        lng
        transportationMode
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrderDish = /* GraphQL */ `
  query GetOrderDish($id: ID!) {
    getOrderDish(id: $id) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        price
        restaurantID
        createdAt
        updatedAt
        __typename
      }
      orderID
      createdAt
      updatedAt
      orderDishDishId
      __typename
    }
  }
`;
export const listOrderDishes = /* GraphQL */ `
  query ListOrderDishes(
    $filter: ModelOrderDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        quantity
        Dish {
          id
          name
          image
          description
          price
          restaurantID
          createdAt
          updatedAt
          __typename
        }
        orderID
        createdAt
        updatedAt
        orderDishDishId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const orderDishesByOrderID = /* GraphQL */ `
  query OrderDishesByOrderID(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderDishesByOrderID(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        quantity
        Dish {
          id
          name
          image
          description
          price
          restaurantID
          createdAt
          updatedAt
          __typename
        }
        orderID
        createdAt
        updatedAt
        orderDishDishId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      userID
      Restaurant {
        id
        name
        image
        deliveryFee
        minDeliveryTime
        maxDeliveryTime
        rating
        address
        lng
        lat
        Dishes {
          items {
            id
            name
            image
            description
            price
            restaurantID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        Baskets {
          items {
            id
            BasketDishes {
              nextToken
              __typename
            }
            userID
            restaurantID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        adminSub
        createdAt
        updatedAt
        __typename
      }
      total
      status
      OrderDishes {
        items {
          id
          quantity
          Dish {
            id
            name
            image
            description
            price
            restaurantID
            createdAt
            updatedAt
            __typename
          }
          orderID
          createdAt
          updatedAt
          orderDishDishId
          __typename
        }
        nextToken
        __typename
      }
      Courier {
        id
        name
        sub
        lat
        lng
        transportationMode
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      orderRestaurantId
      orderCourierId
      __typename
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        Restaurant {
          id
          name
          image
          deliveryFee
          minDeliveryTime
          maxDeliveryTime
          rating
          address
          lng
          lat
          Dishes {
            items {
              id
              name
              image
              description
              price
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            nextToken
            __typename
          }
          Baskets {
            items {
              id
              userID
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            nextToken
            __typename
          }
          adminSub
          createdAt
          updatedAt
          __typename
        }
        total
        status
        OrderDishes {
          items {
            id
            quantity
            Dish {
              id
              name
              image
              description
              price
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            orderID
            createdAt
            updatedAt
            orderDishDishId
            __typename
          }
          nextToken
          __typename
        }
        Courier {
          id
          name
          sub
          lat
          lng
          transportationMode
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        orderRestaurantId
        orderCourierId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByUserID = /* GraphQL */ `
  query OrdersByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        Restaurant {
          id
          name
          image
          deliveryFee
          minDeliveryTime
          maxDeliveryTime
          rating
          address
          lng
          lat
          Dishes {
            items {
              id
              name
              image
              description
              price
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            nextToken
            __typename
          }
          Baskets {
            items {
              id
              userID
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            nextToken
            __typename
          }
          adminSub
          createdAt
          updatedAt
          __typename
        }
        total
        status
        OrderDishes {
          items {
            id
            quantity
            Dish {
              id
              name
              image
              description
              price
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            orderID
            createdAt
            updatedAt
            orderDishDishId
            __typename
          }
          nextToken
          __typename
        }
        Courier {
          id
          name
          sub
          lat
          lng
          transportationMode
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        orderRestaurantId
        orderCourierId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBasketDish = /* GraphQL */ `
  query GetBasketDish($id: ID!) {
    getBasketDish(id: $id) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        price
        restaurantID
        createdAt
        updatedAt
        __typename
      }
      basketID
      createdAt
      updatedAt
      basketDishDishId
      __typename
    }
  }
`;
export const listBasketDishes = /* GraphQL */ `
  query ListBasketDishes(
    $filter: ModelBasketDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBasketDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        quantity
        Dish {
          id
          name
          image
          description
          price
          restaurantID
          createdAt
          updatedAt
          __typename
        }
        basketID
        createdAt
        updatedAt
        basketDishDishId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const basketDishesByBasketID = /* GraphQL */ `
  query BasketDishesByBasketID(
    $basketID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBasketDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    basketDishesByBasketID(
      basketID: $basketID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        quantity
        Dish {
          id
          name
          image
          description
          price
          restaurantID
          createdAt
          updatedAt
          __typename
        }
        basketID
        createdAt
        updatedAt
        basketDishDishId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBasket = /* GraphQL */ `
  query GetBasket($id: ID!) {
    getBasket(id: $id) {
      id
      BasketDishes {
        items {
          id
          quantity
          Dish {
            id
            name
            image
            description
            price
            restaurantID
            createdAt
            updatedAt
            __typename
          }
          basketID
          createdAt
          updatedAt
          basketDishDishId
          __typename
        }
        nextToken
        __typename
      }
      userID
      restaurantID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBaskets = /* GraphQL */ `
  query ListBaskets(
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBaskets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        BasketDishes {
          items {
            id
            quantity
            Dish {
              id
              name
              image
              description
              price
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            basketID
            createdAt
            updatedAt
            basketDishDishId
            __typename
          }
          nextToken
          __typename
        }
        userID
        restaurantID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const basketsByUserID = /* GraphQL */ `
  query BasketsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    basketsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        BasketDishes {
          items {
            id
            quantity
            Dish {
              id
              name
              image
              description
              price
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            basketID
            createdAt
            updatedAt
            basketDishDishId
            __typename
          }
          nextToken
          __typename
        }
        userID
        restaurantID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const basketsByRestaurantID = /* GraphQL */ `
  query BasketsByRestaurantID(
    $restaurantID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    basketsByRestaurantID(
      restaurantID: $restaurantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        BasketDishes {
          items {
            id
            quantity
            Dish {
              id
              name
              image
              description
              price
              restaurantID
              createdAt
              updatedAt
              __typename
            }
            basketID
            createdAt
            updatedAt
            basketDishDishId
            __typename
          }
          nextToken
          __typename
        }
        userID
        restaurantID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      address
      lat
      lng
      Orders {
        items {
          id
          userID
          Restaurant {
            id
            name
            image
            deliveryFee
            minDeliveryTime
            maxDeliveryTime
            rating
            address
            lng
            lat
            Dishes {
              nextToken
              __typename
            }
            Baskets {
              nextToken
              __typename
            }
            adminSub
            createdAt
            updatedAt
            __typename
          }
          total
          status
          OrderDishes {
            items {
              id
              quantity
              orderID
              createdAt
              updatedAt
              orderDishDishId
              __typename
            }
            nextToken
            __typename
          }
          Courier {
            id
            name
            sub
            lat
            lng
            transportationMode
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          orderRestaurantId
          orderCourierId
          __typename
        }
        nextToken
        __typename
      }
      Baskets {
        items {
          id
          BasketDishes {
            items {
              id
              quantity
              basketID
              createdAt
              updatedAt
              basketDishDishId
              __typename
            }
            nextToken
            __typename
          }
          userID
          restaurantID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      sub
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        lat
        lng
        Orders {
          items {
            id
            userID
            Restaurant {
              id
              name
              image
              deliveryFee
              minDeliveryTime
              maxDeliveryTime
              rating
              address
              lng
              lat
              adminSub
              createdAt
              updatedAt
              __typename
            }
            total
            status
            OrderDishes {
              nextToken
              __typename
            }
            Courier {
              id
              name
              sub
              lat
              lng
              transportationMode
              createdAt
              updatedAt
              __typename
            }
            createdAt
            updatedAt
            orderRestaurantId
            orderCourierId
            __typename
          }
          nextToken
          __typename
        }
        Baskets {
          items {
            id
            BasketDishes {
              nextToken
              __typename
            }
            userID
            restaurantID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        sub
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDish = /* GraphQL */ `
  query GetDish($id: ID!) {
    getDish(id: $id) {
      id
      name
      image
      description
      price
      restaurantID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDishes = /* GraphQL */ `
  query ListDishes(
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        description
        price
        restaurantID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const dishesByRestaurantID = /* GraphQL */ `
  query DishesByRestaurantID(
    $restaurantID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dishesByRestaurantID(
      restaurantID: $restaurantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        image
        description
        price
        restaurantID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      image
      deliveryFee
      minDeliveryTime
      maxDeliveryTime
      rating
      address
      lng
      lat
      Dishes {
        items {
          id
          name
          image
          description
          price
          restaurantID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Baskets {
        items {
          id
          BasketDishes {
            items {
              id
              quantity
              basketID
              createdAt
              updatedAt
              basketDishDishId
              __typename
            }
            nextToken
            __typename
          }
          userID
          restaurantID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      adminSub
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        deliveryFee
        minDeliveryTime
        maxDeliveryTime
        rating
        address
        lng
        lat
        Dishes {
          items {
            id
            name
            image
            description
            price
            restaurantID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        Baskets {
          items {
            id
            BasketDishes {
              nextToken
              __typename
            }
            userID
            restaurantID
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        adminSub
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
