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
import { useEffect } from "react";
import { useBasketContext } from "../../context/BasketContext";
import { useRestaurantStore } from "../../store/restaurantStore";
import { useBasketStore } from "../../store/basketStore";
const RestaurentDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params?.id;
  const getRestaurantById = useRestaurantStore(
    (state) => state.getRestaurantById
  );
  const getRestaurantDish = useRestaurantStore(
    (state) => state.getRestaurantDish
  );

  const { setBasketRestaurent, basket, basketDishes } = useBasketContext();
  const restaurant = useRestaurantStore((state) => state.restaurant);
  const dishes = useRestaurantStore((state) => state.Dishes);
  const loadRestaurant = useRestaurantStore((state) => state.loadRestaurant);
  const addBasketRestaurant = useBasketStore(
    (state) => state.addBasketRestaurant
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    // setBasketRestaurent(null);
    getRestaurantById(id);
    getRestaurantDish(id);
  }, [id]);

  useEffect(() => {
    addBasketRestaurant(restaurant);
  }, [restaurant]);

  if (loadRestaurant) {
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
