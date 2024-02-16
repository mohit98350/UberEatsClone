import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../screen/OrderScreen";
import OrderDelivery from "../screen/OrderDelivery";
import Profile from "../screen/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { dbCourier } = useAuthContext();

  if (!dbCourier) {
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbCourier ? (
        <>
          <Stack.Screen
            name="orderScreen"
            component={OrderScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="orderDeliveryScreen"
            component={OrderDelivery}
          ></Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
