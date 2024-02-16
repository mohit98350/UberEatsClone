import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getDish } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useBasketContext } from "../../context/BasketContext";

const client = generateClient();

const DishDetailsScreen = () => {
  const navigation = useNavigation();
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const route = useRoute();
  const id = route.params?.id;

  const { addDishToBasket } = useBasketContext();

  const onAddToBasket = () => {
    addDishToBasket(dish, quantity);
    navigation.goBack();
  };
  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotal = () => {
    return (dish.price * quantity).toFixed(2);
  };

  const fetchSingleDish = async () => {
    const oneDish = await client.graphql({
      query: getDish,
      variables: { id: id },
    });

    setDish(oneDish.data.getDish);
  };

  useEffect(() => {
    if (id) {
      fetchSingleDish();
    }
  }, [id]);

  if (!dish) {
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
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          color={"black"}
          onPress={onMinus}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={60}
          color={"black"}
          onPress={onPlus}
        />
      </View>
      <Pressable onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket &#8226; (${getTotal()})
        </Text>
      </Pressable>
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
    fontSize: 30,
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
    justifyContent: "center",
    marginTop: 50,
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
});
export default DishDetailsScreen;
