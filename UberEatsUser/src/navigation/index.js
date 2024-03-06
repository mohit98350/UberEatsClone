import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailsScreen from "../screens/RestaurentDetailsScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import OrderScreen from "../screens/OrderScreen";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Basket from "../screens/Basket";
import OrderDetails from "../screens/OrderDetails";
import Profile from "../screens/ProfileScreen";
import { ActivityIndicator } from "react-native";

import { useAuthContext } from "../context/AuthContext";
import OrderLiveUpdates from "../screens/OrderLiveUpdates";
import Success from "../screens/Success";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // const { loading } = useAuthContext();
  const loading = useAuthStore((state) => state.loading);
  const currentAuthenticatedUser = useAuthStore(
    (state) => state.currentAuthenticatedUser
  );
  const fetchUserBySub = useAuthStore((state) => state.fetchUserBySub);
  const dbUser = useAuthStore((state) => state.dbUser);
  const authUser = useAuthStore((state) => state.authUser);

  useEffect(() => {
    if (authUser) {
      fetchUserBySub(authUser);
    }
  }, [authUser]);

  useEffect(() => {
    currentAuthenticatedUser();
  }, []);

  if (loading) {
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
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Profile" component={Profile} />
      )}
      <Stack.Screen name="success" component={Success} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      barStyle={{ color: "#694fad" }}
      activeColor={"black"}
      inactiveColor={"grey"}
      tabBarColor={" black"}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen} />
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};

const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <HomeStack.Screen name="Orders" component={OrderScreen} />
      <HomeStack.Screen
        name="Order"
        component={OrderDetails}
        screenOptions={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="OrderTracker"
        component={OrderLiveUpdates}
        options={{ headerShown: false }}
      />
    </OrderStack.Navigator>
  );
};

export default RootNavigator;
