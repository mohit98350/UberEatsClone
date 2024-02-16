//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../context/OrderContext";
// import orders from "../../../assets/data/orders.json";

const OrderScreen = () => {
  const { orders } = useOrderContext();

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
