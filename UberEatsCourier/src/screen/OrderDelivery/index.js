import { useRef, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import styles from "./styles";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { useOrderContext } from "../../contexts/OrderContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { updateCourier } from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
const OrderDelivery = () => {
  const {
    user,
    dishes,
    order,
    acceptOrder,
    fetchOrder,
    completeOrder,
    pickUpOrder,
  } = useOrderContext();
  const { dbCourier } = useAuthContext();
  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);

  const [isDriverClose, setIsDriverClose] = useState(false);
  const bottomSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const mapRef = useRef(null);
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const client = generateClient();
  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  useEffect(() => {
    if (!driverLocation) return;

    const saveDriverLiveLocation = async () => {
      try {
        await client.graphql({
          query: updateCourier,
          variables: {
            input: {
              id: dbCourier?.id,
              lat: driverLocation.latitude,
              lng: driverLocation.longitude,
            },
          },
        });
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
    saveDriverLiveLocation();
  }, [driverLocation]);

  useEffect(() => {
    const getDeliveryLocations = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (!status === "granted") {
        console.log("nnoonon");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
    getDeliveryLocations();

    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 500,
      },
      (updatedLocation) => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
      }
    );
    // cleanUp fun ensures that this function is not running whole time it will stop after we leave the screen
    return () => {
      foregroundSubscription;
    };
  }, []);

  const onButtonPressed = async () => {
    if (order?.status === "READY_FOR_PICKUP") {
      bottomSheetRef.current?.collapse();
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      await acceptOrder();
    }
    if (order?.status === "ACCEPTED") {
      bottomSheetRef.current?.collapse();
      await pickUpOrder();
    }
    if (order?.status === "PICKED_UP") {
      await completeOrder();
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  const renderButtonTitle = () => {
    if (order?.status === "READY_FOR_PICKUP") {
      return "Accept Order";
    }
    if (order?.status === "ACCEPTED") {
      return "Pick-Up Order";
    }
    if (order?.status === "PICKED_UP") {
      return "Complete Delivery";
    }
  };

  const isButtonPressable = () => {
    if (order?.status === "READY_FOR_PICKUP") {
      return false;
    }
    if (order?.status === "ACCEPTED" && isDriverClose) {
      return false;
    }
    if (order?.status === "PICKED_UP" && isDriverClose) {
      return false;
    }
    return true;
  };

  const restaurantLocation = {
    latitude: order ? order.Restaurant.lat : 0.0,
    longitude: order ? order.Restaurant.lng : 0.0,
  };
  const deliveryLocation = {
    latitude: user ? user.lat : 0.0,
    longitude: user ? user.lng : 0.0,
  };
  if (!driverLocation || !user || !order) {
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
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{
          height,
          width,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={
            order?.status === "ACCEPTED" ? restaurantLocation : deliveryLocation
          }
          strokeWidth={8}
          waypoints={
            order?.status === "READY_FOR_PICKUP" ? [restaurantLocation] : []
          }
          strokeColor="#3FC060"
          apikey={"AIzaSyDFj0Pe5XlSP8ClLWaBXgD1G-AnPmMJ5Ec"}
          onReady={(result) => {
            setIsDriverClose(result.distance <= 0.1);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />

        <Marker
          coordinate={restaurantLocation}
          title={order?.Restaurant?.name}
          description={order?.Restaurant?.address}
        >
          <View
            style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
          >
            <Entypo name="shop" size={24} color="white" />
          </View>
        </Marker>
        <Marker
          coordinate={deliveryLocation}
          title={user?.name}
          description={user?.address}
        >
          <View
            style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
          >
            <MaterialIcons name="restaurant" size={24} color={"white"} />
          </View>
        </Marker>
      </MapView>

      {order?.status === "READY_FOR_PICKUP" && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={45}
          color={"black"}
          style={{ top: 40, left: 15, position: "absolute" }}
        />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.handleIndicatorContainer}>
          <Text style={styles.routeDetailsText}>
            {totalMinutes.toFixed(0)} min
          </Text>
          <FontAwesome5
            name="shopping-bag"
            size={30}
            color="#3FC060"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.routeDetailsText}>{totalKm.toFixed(0)} km</Text>
        </View>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.restaurantName}>{order?.Restaurant?.name}</Text>
          <View style={styles.adressContainer}>
            <Fontisto name="shopping-store" size={22} color={"grey"} />
            <Text style={styles.adressText}>{order?.Restaurant?.address}</Text>
          </View>
          <View style={styles.adressContainer}>
            <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
            <Text style={styles.adressText}>{user?.address}</Text>
          </View>

          <View style={styles.orderDetailsContainer}>
            <FlatList
              data={dishes}
              renderItem={({ item }) => (
                <Text style={styles.orderItemText} key={item.id}>
                  {item.Dish.name} x {item.quantity}
                </Text>
              )}
            />
          </View>
        </View>
        <Pressable
          onPress={onButtonPressed}
          disabled={isButtonPressable()}
          style={{
            ...styles.buttonContainer,
            backgroundColor: isButtonPressable() ? "grey" : "#3FC060",
          }}
        >
          <Text style={styles.buttonText}>{renderButtonTitle()}</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};
export default OrderDelivery;
