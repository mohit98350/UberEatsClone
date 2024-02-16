import { useRef, useMemo, useState, useEffect } from "react";
import { View, Text, FlatList, useWindowDimensions, Alert } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
// import orders from "../../../assets/data/orders.json";
import OrderItem from "../../component/orderItem";
import { Entypo } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { generateClient } from "aws-amplify/api";
import { listOrders } from "../../graphql/queries";

const client = generateClient();
const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  const { width, height } = useWindowDimensions();

  const fetchOrders = async () => {
    try {
      const allOrders = await client.graphql({
        query: listOrders,
        variables: {
          filter: {
            status: {
              eq: "READY_FOR_PICKUP",
            },
          },
        },
      });

      setOrders(allOrders.data.listOrders.items);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ backgroundColor: "lightblue", flex: 1 }}>
      <MapView
        style={{
          height,
          width,
        }}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        showsUserLocation={true}
      >
        {orders.map((order, key) => (
          <Marker
            key={key}
            title={order.Restaurant?.name}
            description={order.Restaurant?.address}
            coordinate={{
              latitude: order.Restaurant?.lat,
              longitude: order.Restaurant?.lng,
            }}
          >
            <View
              style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
            >
              <Entypo name="shop" size={24} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              letterSpacing: 0.5,
              paddingBottom: 5,
            }}
          >
            You're Online
          </Text>
          <Text style={{ letterSpacing: 0.5, color: "grey" }}>
            Available Orders {orders.length}
          </Text>
        </View>
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
    </View>
  );
};

export default OrderScreen;
