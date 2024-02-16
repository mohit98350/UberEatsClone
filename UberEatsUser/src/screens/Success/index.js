//import liraries
import React, { Component, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Orders", {
        screen: "Order",
        params: { id: id },
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/checked.png")}
        style={{ width: 150, height: 150 }}
      />
      <View style={{ marginVertical: 30 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 0.7,
            textAlign: "center",
          }}
        >
          order placed succesfully
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

//make this component available to the app
export default Success;
