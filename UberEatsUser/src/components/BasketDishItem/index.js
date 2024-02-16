import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const BasketDishItem = ({ basketDish }) => {
  if (!basketDish) {
    return <ActivityIndicator color={"black"} size={"large"} />;
  }
  return (
    <View style={styles.page}>
      <View style={styles.row}>
        <View style={styles.quantityContainer}>
          <Text>{basketDish?.quantity}</Text>
        </View>
        <Text style={{ fontWeight: "600" }}>{basketDish?.Dish?.name}</Text>
        <Text style={{ marginLeft: "auto" }}>{basketDish?.Dish?.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    marginHorizontal: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});
export default BasketDishItem;
