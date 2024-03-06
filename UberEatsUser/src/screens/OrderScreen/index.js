//import liraries
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../context/OrderContext";
import { useOrderStore } from "../../store/orderStore";
import { useAuthStore } from "../../store/authStore";
// import orders from "../../../assets/data/orders.json";

const OrderScreen = () => {
  // const { orders } = useOrderContext();
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const orders = useOrderStore((state) => state.orders);
  const loadOrderHistory = useOrderStore((state) => state.loadOrderHistory);
  const dbUser = useAuthStore((state) => state.dbUser);
  useEffect(() => {
    fetchOrders(dbUser);
  }, []);
  if (loadOrderHistory) {
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
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderScreen;
