import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import BasketDishItem from "../../components/BasketDishItem";
import { useBasketContext } from "../../context/BasketContext";
import { useOrderContext } from "../../context/OrderContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Basket = () => {
  const [isdisabled, setIsdisabled] = useState(false);
  const {
    basketRestaurent: restaurant,
    basketDishes,
    totalPrices,
  } = useBasketContext();

  const navigation = useNavigation();
  const { createOrders } = useOrderContext();

  const onCreateOrders = async () => {
    setIsdisabled(true);
    const newOrder = await createOrders();
    setIsdisabled(false);
    navigation.navigate("success", { id: newOrder.id });
  };
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant?.name}</Text>

      <Text style={{ fontWeight: "bold", marginTop: 15, fontSize: 19 }}>
        Your items
      </Text>

      <FlatList
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />

      <View style={styles.separator} />

      {!isdisabled ? (
        <Pressable
          onPress={onCreateOrders}
          style={styles.button}
          disabled={isdisabled}
        >
          <Text style={styles.buttonText}>
            Create Order &#8226; ${totalPrices.toFixed(2)}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.button}>
          <ActivityIndicator color={"white"} size={"large"} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});
export default Basket;
