/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourier = /* GraphQL */ `
  mutation CreateCourier(
    $input: CreateCourierInput!
    $condition: ModelCourierConditionInput
  ) {
    createCourier(input: $input, condition: $condition) {
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
export const updateCourier = /* GraphQL */ `
  mutation UpdateCourier(
    $input: UpdateCourierInput!
    $condition: ModelCourierConditionInput
  ) {
    updateCourier(input: $input, condition: $condition) {
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
export const deleteCourier = /* GraphQL */ `
  mutation DeleteCourier(
    $input: DeleteCourierInput!
    $condition: ModelCourierConditionInput
  ) {
    deleteCourier(input: $input, condition: $condition) {
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
export const createOrderDish = /* GraphQL */ `
  mutation CreateOrderDish(
    $input: CreateOrderDishInput!
    $condition: ModelOrderDishConditionInput
  ) {
    createOrderDish(input: $input, condition: $condition) {
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
export const updateOrderDish = /* GraphQL */ `
  mutation UpdateOrderDish(
    $input: UpdateOrderDishInput!
    $condition: ModelOrderDishConditionInput
  ) {
    updateOrderDish(input: $input, condition: $condition) {
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
export const deleteOrderDish = /* GraphQL */ `
  mutation DeleteOrderDish(
    $input: DeleteOrderDishInput!
    $condition: ModelOrderDishConditionInput
  ) {
    deleteOrderDish(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createBasketDish = /* GraphQL */ `
  mutation CreateBasketDish(
    $input: CreateBasketDishInput!
    $condition: ModelBasketDishConditionInput
  ) {
    createBasketDish(input: $input, condition: $condition) {
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
export const updateBasketDish = /* GraphQL */ `
  mutation UpdateBasketDish(
    $input: UpdateBasketDishInput!
    $condition: ModelBasketDishConditionInput
  ) {
    updateBasketDish(input: $input, condition: $condition) {
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
export const deleteBasketDish = /* GraphQL */ `
  mutation DeleteBasketDish(
    $input: DeleteBasketDishInput!
    $condition: ModelBasketDishConditionInput
  ) {
    deleteBasketDish(input: $input, condition: $condition) {
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
export const createBasket = /* GraphQL */ `
  mutation CreateBasket(
    $input: CreateBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    createBasket(input: $input, condition: $condition) {
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
export const updateBasket = /* GraphQL */ `
  mutation UpdateBasket(
    $input: UpdateBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    updateBasket(input: $input, condition: $condition) {
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
export const deleteBasket = /* GraphQL */ `
  mutation DeleteBasket(
    $input: DeleteBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    deleteBasket(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
  }
`;
export const createDish = /* GraphQL */ `
  mutation CreateDish(
    $input: CreateDishInput!
    $condition: ModelDishConditionInput
  ) {
    createDish(input: $input, condition: $condition) {
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
export const updateDish = /* GraphQL */ `
  mutation UpdateDish(
    $input: UpdateDishInput!
    $condition: ModelDishConditionInput
  ) {
    updateDish(input: $input, condition: $condition) {
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
export const deleteDish = /* GraphQL */ `
  mutation DeleteDish(
    $input: DeleteDishInput!
    $condition: ModelDishConditionInput
  ) {
    deleteDish(input: $input, condition: $condition) {
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
export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
