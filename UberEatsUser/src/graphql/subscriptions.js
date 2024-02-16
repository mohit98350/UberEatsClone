/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCourier = /* GraphQL */ `
  subscription OnCreateCourier($filter: ModelSubscriptionCourierFilterInput) {
    onCreateCourier(filter: $filter) {
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
export const onUpdateCourier = /* GraphQL */ `
  subscription OnUpdateCourier($filter: ModelSubscriptionCourierFilterInput) {
    onUpdateCourier(filter: $filter) {
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
export const onDeleteCourier = /* GraphQL */ `
  subscription OnDeleteCourier($filter: ModelSubscriptionCourierFilterInput) {
    onDeleteCourier(filter: $filter) {
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
export const onCreateOrderDish = /* GraphQL */ `
  subscription OnCreateOrderDish(
    $filter: ModelSubscriptionOrderDishFilterInput
  ) {
    onCreateOrderDish(filter: $filter) {
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
export const onUpdateOrderDish = /* GraphQL */ `
  subscription OnUpdateOrderDish(
    $filter: ModelSubscriptionOrderDishFilterInput
  ) {
    onUpdateOrderDish(filter: $filter) {
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
export const onDeleteOrderDish = /* GraphQL */ `
  subscription OnDeleteOrderDish(
    $filter: ModelSubscriptionOrderDishFilterInput
  ) {
    onDeleteOrderDish(filter: $filter) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
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
export const onCreateBasketDish = /* GraphQL */ `
  subscription OnCreateBasketDish(
    $filter: ModelSubscriptionBasketDishFilterInput
  ) {
    onCreateBasketDish(filter: $filter) {
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
export const onUpdateBasketDish = /* GraphQL */ `
  subscription OnUpdateBasketDish(
    $filter: ModelSubscriptionBasketDishFilterInput
  ) {
    onUpdateBasketDish(filter: $filter) {
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
export const onDeleteBasketDish = /* GraphQL */ `
  subscription OnDeleteBasketDish(
    $filter: ModelSubscriptionBasketDishFilterInput
  ) {
    onDeleteBasketDish(filter: $filter) {
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
export const onCreateBasket = /* GraphQL */ `
  subscription OnCreateBasket($filter: ModelSubscriptionBasketFilterInput) {
    onCreateBasket(filter: $filter) {
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
export const onUpdateBasket = /* GraphQL */ `
  subscription OnUpdateBasket($filter: ModelSubscriptionBasketFilterInput) {
    onUpdateBasket(filter: $filter) {
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
export const onDeleteBasket = /* GraphQL */ `
  subscription OnDeleteBasket($filter: ModelSubscriptionBasketFilterInput) {
    onDeleteBasket(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateDish = /* GraphQL */ `
  subscription OnCreateDish($filter: ModelSubscriptionDishFilterInput) {
    onCreateDish(filter: $filter) {
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
export const onUpdateDish = /* GraphQL */ `
  subscription OnUpdateDish($filter: ModelSubscriptionDishFilterInput) {
    onUpdateDish(filter: $filter) {
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
export const onDeleteDish = /* GraphQL */ `
  subscription OnDeleteDish($filter: ModelSubscriptionDishFilterInput) {
    onDeleteDish(filter: $filter) {
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
export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onCreateRestaurant(filter: $filter) {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onUpdateRestaurant(filter: $filter) {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onDeleteRestaurant(filter: $filter) {
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
