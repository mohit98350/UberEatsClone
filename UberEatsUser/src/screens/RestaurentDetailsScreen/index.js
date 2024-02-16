import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";

import DishListItem from "../../components/DishListItem";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getRestaurant, dishesByRestaurantID } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useBasketContext } from "../../context/BasketContext";
const client = generateClient();

const RestaurentDetailsPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params?.id;

  const { setBasketRestaurent, basket, basketDishes } = useBasketContext();
  const getRestaurantById = async () => {
    const oneRestaurant = await client.graphql({
      query: getRestaurant,
      variables: { id: id },
    });
    setRestaurant(oneRestaurant.data.getRestaurant);
  };

  const getRestaurantDish = async () => {
    const allDishs = await client.graphql({
      query: dishesByRestaurantID,
      variables: {
        restaurantID: id,
      },
    });

    setDishes(allDishs.data.dishesByRestaurantID.items);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    setBasketRestaurent(null);
    getRestaurantById();
    getRestaurantDish();
  }, [id]);

  useEffect(() => {
    setBasketRestaurent(restaurant);
  }, [restaurant]);

  if (!restaurant) {
    return (
      <ActivityIndicator
        size={"large"}
        color={"black"}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurent={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />

      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
      <View style={styles.container}>
        {basket && (
          <Pressable
            onPress={() => navigation.navigate("Basket")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Open basket ({basketDishes?.length})
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default RestaurentDetailsPage;
