import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { generateClient } from "aws-amplify/api";
import { getOrder, getCourier } from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
const client = generateClient();

const OrderLiveUpdates = () => {
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);
  const route = useRoute();
  const id = route.params?.id;
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const fetchOrder = async () => {
    try {
      const order = await client.graphql({
        query: getOrder,
        variables: { id: id },
      });
      setOrder(order.data.getOrder);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const fetchCourier = async (id) => {
    try {
      const Courier = await client.graphql({
        query: getCourier,
        variables: { id: id },
      });
      setCourier(Courier.data.getCourier);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = client
      .graphql({
        query: subscriptions.onUpdateOrder,
        variables: {
          filter: {
            id: { eq: order?.id },
          },
        },
      })
      .subscribe({
        next: ({ data }) => setOrder(data.onUpdateOrder),
        error: (error) => console.log(error),
      });

    return () => subscription.unsubscribe();
  }, [order]);

  useEffect(() => {
    if (!order) {
      return;
    }
    fetchCourier(order.orderCourierId);
  }, [order?.orderCourierId]);

  useEffect(() => {
    if (courier?.lng && courier?.lat) {
      mapRef.current.animateToRegion({
        latitude: courier.lat,
        longitude: courier.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });
    }
  }, [courier?.lng, courier?.lat]);

  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscription = client
      .graphql({
        query: subscriptions.onUpdateCourier,
        variables: {
          filter: {
            id: { eq: order?.orderCourierId },
          },
        },
      })
      .subscribe({
        next: ({ data }) => setCourier(data.onUpdateCourier),
        error: (error) => console.log(error),
      });

    return () => subscription.unsubscribe();
  }, [courier]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.status}>
        <View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: 8,
                letterSpacing: 0.7,
              }}
            >
              ORDER FROM
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: 12,

                letterSpacing: 0.8,
              }}
            >
              {order?.Restaurant.name}
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              letterSpacing: 0.7,
              fontWeight: "600",
              textTransform: "lowercase",
              textAlign: "center",
            }}
          >
            Order is {order?.status}✌
          </Text>
        </View>
      </View>
      <MapView style={styles.map} ref={mapRef} provider={PROVIDER_GOOGLE}>
        {courier?.lat && (
          <Marker
            coordinate={{ latitude: courier.lat, longitude: courier.lng }}
          >
            <View
              style={{
                padding: 5,
                backgroundColor: "#2c9f45",
                borderRadius: 40,
              }}
            >
              <FontAwesome5 name="motorcycle" size={24} color="white" />
            </View>
          </Marker>
        )}
      </MapView>
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={40}
        color={"black"}
        style={{ top: 40, left: 15, position: "absolute" }}
      />
      <View
        style={{
          backgroundColor: "whitesmoke",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/delivery-boy.png")}
            style={{ width: 50, height: 50, margin: 10 }}
          />
          <View style={{ paddingLeft: 5 }}>
            {order?.Courier ? (
              <Text
                style={{
                  color: "grey",
                  fontSize: 14,
                  letterSpacing: 0.5,
                  fontWeight: "500",
                }}
              >
                Your delivery partner is {order?.Courier?.name}
              </Text>
            ) : (
              <Text
                style={{
                  color: "grey",
                  fontSize: 14,
                  letterSpacing: 0.4,
                  fontWeight: "500",
                }}
              >
                Your delivery partner is not assigned
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "65%",
  },
  status: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c9f45",
  },
});

export default OrderLiveUpdates;
