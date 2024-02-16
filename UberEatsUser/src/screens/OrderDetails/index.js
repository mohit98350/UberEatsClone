import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import orders from "../../../assets/data/orders.json";
import restaurants from "../../../assets/data/restaurants.json";
import styles from "./style";
import BasketDishItem from "../../components/BasketDishItem";
import { useOrderContext } from "../../context/OrderContext";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const OrderDetailsHeader = ({ order }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.Restaurant.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.subtitle}>
                {order.status} &#8226; 2 days ago
              </Text>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate("OrderTracker", { id: order.id })
              }
              style={{ marginHorizontal: 10 }}
            >
              <Image
                source={require("../../../assets/placeholder.png")}
                style={{ width: 44, height: 44 }}
              />
            </Pressable>
          </View>

          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = () => {
  const [order, setOrder] = useState();

  const { getOrders } = useOrderContext();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    getOrders(id).then(setOrder);
  }, []);

  if (!order) {
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
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order.order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};

export default OrderDetails;
